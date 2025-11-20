import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string;
  author: string;
  created_at: string;
  published_at: string;
  status: string;
}

interface PaginationInfo {
  current_page: number;
  items_per_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export default function News() {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const itemsPerPage = 6;

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/articles?page=${page}&limit=${itemsPerPage}`
      );
      const data = await response.json();

      if (data.status === "success") {
        // Filtrăm doar articolele publicate
        const publishedArticles = data.data.filter(
          (a: Article) => a.status === "published"
        );
        setArticles(publishedArticles);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    if (!pagination) return null;

    const pages = [];
    const { total_pages, current_page } = pagination;
    const maxVisiblePages = 5;

    if (total_pages <= maxVisiblePages) {
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      if (current_page <= 3) {
        pages.push(1, 2, 3, 4, "...", total_pages);
      } else if (current_page >= total_pages - 2) {
        pages.push(
          1,
          "...",
          total_pages - 3,
          total_pages - 2,
          total_pages - 1,
          total_pages
        );
      } else {
        pages.push(
          1,
          "...",
          current_page - 1,
          current_page,
          current_page + 1,
          "...",
          total_pages
        );
      }
    }

    return pages;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === "ro"
      ? date.toLocaleDateString("ro-RO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Header */}
      <section className="bg-secondary py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            {language === "ro" ? "Noutăți și articole" : "News and Articles"}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "ro"
              ? "Rămâneți la curent cu ultimele schimbări legislative și sfaturi juridice"
              : "Stay up to date with the latest legislative changes and legal advice"}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardHeader>
                    <Skeleton className="h-6 w-20 mb-2" />
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3 mt-1" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-9 w-28" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {language === "ro"
                  ? "Nu există articole publicate"
                  : "No published articles"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                  >
                    {article.cover_image && (
                      <div className="overflow-hidden h-48">
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <Badge className="mb-2 w-fit">{article.category}</Badge>
                      <CardTitle className="font-serif line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {formatDate(
                              article.published_at || article.created_at
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <Link
                          to={`${language === "ro" ? "/noutati" : "/news"}/${
                            article.slug
                          }`}
                        >
                          {language === "ro" ? "Citește mai mult" : "Read More"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination - Păstrează design-ul original */}
              {pagination && pagination.total_pages > 0 && (
                <div className="mt-12 flex justify-center animate-fade-in">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            pagination.has_prev &&
                            handlePageChange(currentPage - 1)
                          }
                          className={
                            !pagination.has_prev
                              ? "pointer-events-none opacity-40 cursor-not-allowed"
                              : "cursor-pointer hover:scale-105"
                          }
                        />
                      </PaginationItem>

                      {renderPageNumbers()?.map((page, index) => (
                        <PaginationItem key={index}>
                          {page === "..." ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              onClick={() => handlePageChange(page as number)}
                              isActive={currentPage === page}
                              className="cursor-pointer hover:scale-105 transition-transform"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            pagination.has_next &&
                            handlePageChange(currentPage + 1)
                          }
                          className={
                            !pagination.has_next
                              ? "pointer-events-none opacity-40 cursor-not-allowed"
                              : "cursor-pointer hover:scale-105"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
