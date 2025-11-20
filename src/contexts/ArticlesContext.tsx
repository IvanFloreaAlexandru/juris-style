import React, { createContext, useContext, useState } from "react";
import { getArticlesAPI, getArticleAPI, createArticleAPI, updateArticleAPI, deleteArticleAPI } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  author: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  fetchArticles: (filters?: {
    category?: string;
    tag?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  getArticle: (id: string) => Article | undefined;
  createArticle: (
    article: Omit<Article, "id" | "createdAt" | "updatedAt">
  ) => Promise<Article>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: 6,
    has_next: false,
    has_prev: false,
  });

  const fetchArticles = async (filters?: {
    category?: string;
    tag?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    try {
      const response = await getArticlesAPI(
        filters?.page || 1,
        filters?.limit || 6,
        filters?.search
      );

      let filteredArticles = response.data || [];

      // Apply additional filters
      if (filters?.status && filters.status !== "all") {
        filteredArticles = filteredArticles.filter(
          (article: any) => article.status === filters.status
        );
      }

      if (filters?.category && filters.category !== "all") {
        filteredArticles = filteredArticles.filter(
          (article: any) => article.category === filters.category
        );
      }

      if (filters?.tag) {
        filteredArticles = filteredArticles.filter((article: any) =>
          article.tags?.includes(filters.tag)
        );
      }

      setArticles(filteredArticles);
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const getArticle = (id: string) => {
    return articles.find((article) => article.id === id);
  };

  const createArticle = async (
    article: Omit<Article, "id" | "createdAt" | "updatedAt">
  ): Promise<Article> => {
    try {
      // Prepare data for backend
      const articleData = {
        title: article.title,
        slug: article.slug,
        category: article.category,
        tags: article.tags,
        excerpt: article.excerpt || "",
        coverImage: article.coverImage || "",
        content: article.content,
        status: article.status || "published",
      };

      // Call backend API
      const response = await createArticleAPI(articleData);

      // Create article object for local state
      const newArticle: Article = {
        ...article,
        id: response.article?.id?.toString() || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Refresh articles list
      await fetchArticles();

      toast({
        title: "Articol creat",
        description: "Articolul a fost creat și publicat cu succes!",
      });

      return newArticle;
    } catch (error) {
      console.error("Error creating article:", error);
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "Nu s-a putut crea articolul",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    try {
      await updateArticleAPI(parseInt(id), updates);

      // Refresh articles list
      await fetchArticles();

      toast({
        title: "Articol actualizat",
        description: "Articolul a fost actualizat cu succes",
      });
    } catch (error) {
      console.error("Error updating article:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut actualiza articolul",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await deleteArticleAPI(parseInt(id));

      // Refresh articles list
      await fetchArticles();

      toast({
        title: "Articol șters",
        description: "Articolul a fost șters cu succes",
      });
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge articolul",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        fetchArticles,
        getArticle,
        createArticle,
        updateArticle,
        deleteArticle,
        pagination,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
};
