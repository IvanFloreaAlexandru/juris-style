import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArticles } from "@/contexts/ArticlesContext";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Article } from "@/contexts/ArticlesContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export const AdminArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, fetchArticles } = useArticles();
  const { toast } = useToast();

  const [articleData, setArticleData] = useState<Article | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // 1. Încărcare date
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);

      const cachedArticle = articles.find(
        (a) => a.id === Number(id) || a.id === id
      );

      if (cachedArticle) {
        setArticleData(cachedArticle);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/articles/${id}`);
        if (!response.ok) throw new Error("Articolul nu a putut fi găsit.");

        const data = await response.json();
        const fetchedArticle = data.article || data;

        const normalizedArticle: Article = {
          ...fetchedArticle,
          coverImage: fetchedArticle.coverImage || fetchedArticle.cover_image,
          createdAt: fetchedArticle.createdAt || fetchedArticle.created_at,
        };

        setArticleData(normalizedArticle);
      } catch (error) {
        console.error(error);
        toast({
          title: "Eroare",
          description: "Nu am putut încărca articolul. Verificați conexiunea.",
          variant: "destructive",
        });
        navigate("/admin/articles");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, articles, API_URL, navigate, toast]);

  // 2. UPDATE CU TOKEN (FIX 401)
  const handleUpdate = async (data: Partial<Article>) => {
    if (!id) return;

    // Luăm token-ul din localStorage (salvat la login)
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Sesiune expirată",
        description: "Te rugăm să te autentifici din nou.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // ADĂUGAT HEADER DE AUTORIZARE
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Sesiune expirată (401)");
        }
        const errorData = await response.json();
        console.error("Update Error:", errorData);
        throw new Error("Eroare la actualizare");
      }

      // Refresh lista articolelor în context
      if (fetchArticles) await fetchArticles();
    } catch (error) {
      console.error(error);
      if (error.message.includes("401")) {
        navigate("/login");
      }
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-[400px] w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!articleData) {
    return <div>Articol negăsit</div>;
  }

  return (
    <div className="w-full">
      <ArticleForm article={articleData} onSubmit={handleUpdate} />
    </div>
  );
};
