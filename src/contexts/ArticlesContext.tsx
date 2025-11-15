import React, { createContext, useContext, useState } from "react";
import { createArticleAPI } from "@/lib/api";
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

// Date mock inițiale
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Noul Cod Civil - Modificări esențiale în 2024",
    slug: "noul-cod-civil-modificari-esentiale-2024",
    content:
      "<h2>Introducere</h2><p>Codul Civil a suferit modificări importante care afectează relațiile contractuale...</p>",
    excerpt:
      "Modificările aduse Codului Civil în 2024 aduc schimbări importante în dreptul contractelor.",
    category: "Noutăți Legislative",
    tags: ["cod civil", "contracte", "legislație"],
    status: "published",
    author: "Admin",
    coverImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    publishedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Jurisprudență CJUE: Hotărâri recente în materie civilă",
    slug: "jurisprudenta-cjue-hotarari-recente-materie-civila",
    content:
      "<p>Curtea de Justiție a Uniunii Europene a pronunțat mai multe hotărâri...</p>",
    excerpt:
      "Analiză detaliată a celor mai recente hotărâri CJUE în materie civilă.",
    category: "Jurisprudență",
    tags: ["CJUE", "drept civil", "hotărâri"],
    status: "published",
    author: "Admin",
    createdAt: "2024-02-01T14:30:00Z",
    updatedAt: "2024-02-01T14:30:00Z",
    publishedAt: "2024-02-01T14:30:00Z",
  },
  {
    id: "3",
    title: "Draft: Ghid practic pentru procedura succesorală",
    slug: "ghid-practic-procedura-succesorala",
    content:
      "<p>Un ghid complet pentru înțelegerea procedurii succesorale...</p>",
    excerpt:
      "Ghid detaliat despre toate etapele procedurii succesorale în România.",
    category: "Practică",
    tags: ["succesiuni", "procedură", "ghid"],
    status: "draft",
    author: "Admin",
    createdAt: "2024-03-10T09:00:00Z",
    updatedAt: "2024-03-10T09:00:00Z",
  },
];

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allArticles, setAllArticles] = useState<Article[]>(mockArticles);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [loading, setLoading] = useState(false);

  const fetchArticles = async (filters?: {
    category?: string;
    tag?: string;
    status?: string;
    search?: string;
  }) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
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

  const getArticle = (id: string) => {
    return allArticles.find((article) => article.id === id);
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
        tags: article.tags.join(", "),
        extras: article.excerpt || "",
        cover_image: article.coverImage || "",
        content: article.content,
      };

      // Call backend API
      const response = await createArticleAPI(articleData);
      
      // Create article object for local state
      const newArticle: Article = {
        ...article,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: article.status === "published" ? new Date().toISOString() : undefined,
      };

      setAllArticles((prev) => [newArticle, ...prev]);
      setArticles((prev) => [newArticle, ...prev]);
      
      toast({
        title: "Succes",
        description: `Articolul a fost creat și publicat pe server: ${response.url}`,
      });
      
      return newArticle;
    } catch (error) {
      toast({
        title: "Eroare",
        description: error instanceof Error ? error.message : "Nu s-a putut crea articolul",
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
  if (!context) {
    throw new Error("useArticles must be used within ArticlesProvider");
  }
  return context;
};
