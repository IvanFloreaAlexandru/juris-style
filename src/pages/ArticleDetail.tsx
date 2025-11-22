import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useArticles } from "@/contexts/ArticlesContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  id: string | number;
  title: string;
  content: string;
  category: string;
  author: string;
  coverImage?: string;
  cover_image?: string;
  publishedAt?: string;
  createdAt?: string;
  created_at?: string;
  published_at?: string;
  status?: string;
}

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles } = useArticles();
  const { language } = useLanguage();

  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!slug) return;

      // --- FIX CRITIC AICI ---
      // Eliminăm extensia .html din URL dacă există, pentru a găsi articolul în DB
      const cleanSlug = slug.replace(/\.html$/, "");

      setIsLoading(true);
      setError(false);

      const normalizeArticle = (data: any): Article => {
        return {
          ...data,
          coverImage: data.coverImage || data.cover_image || "",
          publishedAt:
            data.publishedAt ||
            data.published_at ||
            data.createdAt ||
            data.created_at,
        };
      };

      // 1. Verificăm în Context folosind slug-ul curat
      const contextArticle = articles.find((a) => a.slug === cleanSlug);
      if (contextArticle) {
        setArticle(normalizeArticle(contextArticle));
        setIsLoading(false);
        return;
      }

      // 2. Fetch API folosind slug-ul curat
      try {
        const response = await fetch(`${API_URL}/articles/slug/${cleanSlug}`);

        if (!response.ok) {
          throw new Error("Article not found");
        }

        const data = await response.json();
        setArticle(normalizeArticle(data));
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [slug, articles, API_URL]);

  const getTitleImageSrc = (imgString: string) => {
    if (!imgString) return "";
    if (imgString.startsWith("http") || imgString.startsWith("data:")) {
      return imgString;
    }
    return `data:image/jpeg;base64,${imgString}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 sm:pt-24">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-10 w-32 mb-6" />
          <Skeleton className="w-full aspect-video rounded-lg mb-8" />
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          {language === "ro" ? "Articol negăsit" : "Article not found"}
        </h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          {language === "ro"
            ? "Articolul pe care îl căutați nu există sau a fost șters."
            : "The article you are looking for does not exist or has been removed."}
        </p>
        <Button asChild size="lg">
          <Link to={language === "ro" ? "/noutati" : "/news"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "ro" ? "Înapoi la noutăți" : "Back to news"}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <Button
          variant="ghost"
          asChild
          className="mb-6 sm:mb-8 hover:-translate-x-1 transition-transform pl-0 sm:pl-4"
        >
          <Link to={language === "ro" ? "/noutati" : "/news"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "ro" ? "Înapoi" : "Back"}
          </Link>
        </Button>

        <article>
          {article.coverImage && (
            <div className="w-full overflow-hidden rounded-xl mb-8 sm:mb-10 shadow-lg border border-gray-100">
              <img
                src={getTitleImageSrc(article.coverImage)}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <div className="mb-8 sm:mb-10 border-b pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 border-none">
                {article.category}
              </Badge>
              {article.status?.toLowerCase() === "draft" && (
                <Badge variant="destructive">Draft</Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif leading-tight text-foreground">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-muted-foreground text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground/80">
                  {article.author || "Frunză & Asociații"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString(
                        language === "ro" ? "ro-RO" : "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div
            className="prose prose-lg sm:prose-xl dark:prose-invert max-w-none
              prose-headings:font-serif prose-headings:font-bold
              prose-p:leading-relaxed prose-p:text-foreground/90
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
};
