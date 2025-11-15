import React, { createContext, useContext, useState, useEffect } from "react";
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
  url?: string;
}

interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  fetchArticles: (filters?: {
    category?: string;
    tag?: string;
    status?: string;
    search?: string;
  }) => Promise<void>;
  getArticle: (id: string) => Article | undefined;
  createArticle: (
    article: Omit<Article, "id" | "createdAt" | "updatedAt">
  ) => Promise<Article>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

// Tipul răspunsului API pentru creare articol
interface CreateArticleResponse {
  status: string;
  file: string;
  url: string;
  article?: Article; // optional pentru backend nou
}

// Exemplu funcție API (poți înlocui cu implementarea ta)
const createArticleAPI = async (data: any): Promise<CreateArticleResponse> => {
  const res = await fetch(`${API_BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticlesFromAPI();
  }, []);

  const loadArticlesFromAPI = async () => {
    setLoading(true);
    try {
      console.log("🔄 Loading articles from API...");
      const response = await fetch(`${API_BASE_URL}/articles`);
      if (!response.ok)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      const fetchedArticles = data.articles || [];

      const normalizedArticles: Article[] = fetchedArticles.map(
        (article: any) => ({
          id: String(article.id),
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt || article.extras || "",
          category: article.category,
          tags: Array.isArray(article.tags) ? article.tags : [],
          status: article.status || "published",
          author: article.author || "Admin",
          coverImage: article.coverImage || article.cover_image,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
          publishedAt: article.publishedAt,
          url: article.url,
        })
      );

      setAllArticles(normalizedArticles);
      setArticles(normalizedArticles);

      console.log(`✅ Loaded ${normalizedArticles.length} articles from API`);
    } catch (error) {
      console.error("❌ Failed to load articles:", error);
      toast({
        title: "Avertisment",
        description: "Nu s-au putut încărca articolele de pe server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async (filters?: {
    category?: string;
    tag?: string;
    status?: string;
    search?: string;
  }) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));

    let filtered = [...allArticles];

    if (filters?.category && filters.category !== "all") {
      filtered = filtered.filter((a) => a.category === filters.category);
    }
    if (filters?.tag) {
      filtered = filtered.filter((a) => a.tags.includes(filters.tag));
    }
    if (filters?.status && filters.status !== "all") {
      filtered = filtered.filter((a) => a.status === filters.status);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(searchLower) ||
          a.excerpt.toLowerCase().includes(searchLower)
      );
    }

    setArticles(filtered);
    setLoading(false);
  };

  const getArticle = (id: string) =>
    allArticles.find((article) => article.id === id);

  const createArticle = async (
    article: Omit<Article, "id" | "createdAt" | "updatedAt">
  ): Promise<Article> => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        throw new Error("Nu ești autentificat");
      }

      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: article.title,
          slug: article.slug,
          category: article.category,
          tags: article.tags,
          excerpt: article.excerpt || "",
          coverImage: article.coverImage || "",
          content: article.content,
          status: article.status,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Nu s-a putut crea articolul");
      }

      const data = await response.json();
      const newArticle = data.article;

      setAllArticles((prev) => [newArticle, ...prev]);
      setArticles((prev) => [newArticle, ...prev]);

      toast({
        title: "Succes",
        description: `Articolul a fost publicat: ${newArticle.url}`,
      });

      return newArticle;
    } catch (error) {
      toast({
        title: "Eroare",
        description:
          error instanceof Error
            ? error.message
            : "Nu s-a putut crea articolul",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateArticle = async (id: string, article: Partial<Article>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updateFn = (prev: Article[]) =>
      prev.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            ...article,
            updatedAt: new Date().toISOString(),
            publishedAt:
              article.status === "published" && !a.publishedAt
                ? new Date().toISOString()
                : a.publishedAt,
          };
        }
        return a;
      });

    setAllArticles(updateFn);
    setArticles(updateFn);
  };

  const deleteArticle = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setAllArticles((prev) => prev.filter((a) => a.id !== id));
    setArticles((prev) => prev.filter((a) => a.id !== id));
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
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context)
    throw new Error("useArticles must be used within ArticlesProvider");
  return context;
};
