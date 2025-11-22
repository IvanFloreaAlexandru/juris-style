import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowRight,
  Newspaper,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";

import officeImage from "@/assets/office-12.jpeg";

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

  // URL-ul API-ului
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/articles?page=${page}&limit=${itemsPerPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        const publishedArticles = data.data.filter(
          (a: Article) => a.status?.toLowerCase() === "published"
        );
        console.log("API response:", data.data);

        setArticles(publishedArticles);
        setPagination(data.pagination);
      } else {
        // Dacă API-ul nu returnează succes, resetăm articolele și paginarea
        setArticles([]);
        setPagination(null);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
      setPagination(null);
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
    if (!dateString) return "";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <HeroSection
        backgroundImage={officeImage}
        category={language === "ro" ? "RESURSE JURIDICE" : "LEGAL RESOURCES"}
        categoryEn="LEGAL RESOURCES"
        title={language === "ro" ? "Noutăți și Articole" : "News and Articles"}
        titleEn="News and Articles"
        subtitle={
          language === "ro"
            ? "Analize detaliate, noutăți legislative și perspective juridice de actualitate."
            : "Detailed analyses, legislative news, and current legal perspectives."
        }
        subtitleEn="Detailed analyses, legislative news, and current legal perspectives."
        language={language}
        align="center"
      />

      <section className="py-20 lg:py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-64 rounded-xl" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-32">
              <Newspaper className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900">
                {language === "ro"
                  ? "Nu există articole momentan."
                  : "No articles found."}
              </h3>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <Link
                    to={`/${language === "ro" ? "noutati" : "news"}/${
                      article.slug
                    }`}
                    className="group block h-full"
                  >
                    <Card className="h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden bg-white group-hover:-translate-y-1">
                      {/* Imagine */}
                      <div className="relative h-60 overflow-hidden">
                        {article.cover_image ? (
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Newspaper className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-3 pt-6 px-6">
                        {/* Tag-uri Roșii */}
                        <div className="mb-3">
                          <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border-red-100 px-3 py-1 rounded-md font-medium text-xs uppercase tracking-wide shadow-none transition-colors">
                            {article.category}
                          </Badge>
                        </div>

                        <CardTitle className="font-serif text-xl leading-snug text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>

                        {/* Metadata */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-3 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            <span>
                              {formatDate(
                                article.published_at || article.created_at
                              )}
                            </span>
                          </div>
                          <span className="text-gray-300">|</span>
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-primary" />
                            <span className="truncate max-w-[120px]">
                              {article.author}
                            </span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 flex flex-col justify-between px-6 pb-6 pt-0">
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                          {article.excerpt}
                        </p>

                        <div className="w-full flex items-center text-primary font-bold text-sm mt-auto group/btn">
                          <span className="mr-2">
                            {language === "ro"
                              ? "Citește articolul"
                              : "Read Article"}
                          </span>
                          <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* --- PAGINARE --- */}
          {/* MODIFICARE: Am adăugat condiția && articles.length > 0 */}
          {pagination && pagination.total_pages >= 1 && articles.length > 0 && (
            <div className="mt-16 flex justify-center animate-fade-in w-full">
              <Pagination>
                <PaginationContent className="gap-2 sm:gap-3 items-center flex-wrap justify-center">
                  {/* BUTON ANTERIOR */}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        pagination.has_prev && handlePageChange(currentPage - 1)
                      }
                      className={`h-10 w-10 sm:w-auto sm:px-4 rounded-full flex items-center justify-center gap-2 border border-gray-200 bg-white transition-all ${
                        !pagination.has_prev
                          ? "pointer-events-none opacity-50 text-gray-300"
                          : "cursor-pointer hover:bg-gray-50 hover:text-primary hover:border-primary/30 text-gray-600"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline text-sm font-medium">
                        {language === "ro" ? "Înapoi" : "Back"}
                      </span>
                    </PaginationLink>
                  </PaginationItem>

                  {/* NUMERE PAGINI */}
                  <div className="flex gap-1 sm:gap-2">
                    {renderPageNumbers()?.map((page, index) => (
                      <PaginationItem key={index}>
                        {page === "..." ? (
                          <PaginationEllipsis className="w-8 h-10 flex items-center justify-center" />
                        ) : (
                          <PaginationLink
                            onClick={() => handlePageChange(page as number)}
                            isActive={currentPage === page}
                            className={`w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-full flex items-center justify-center border transition-all font-medium text-xs sm:text-sm ${
                              currentPage === page
                                ? "bg-primary text-white border-primary hover:bg-red-700 hover:text-white shadow-md scale-105"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary/50"
                            }`}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                  </div>

                  {/* BUTON URMĂTOR */}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        pagination.has_next && handlePageChange(currentPage + 1)
                      }
                      className={`h-10 w-10 sm:w-auto sm:px-4 rounded-full flex items-center justify-center gap-2 border border-gray-200 bg-white transition-all ${
                        !pagination.has_next
                          ? "pointer-events-none opacity-50 text-gray-300"
                          : "cursor-pointer hover:bg-gray-50 hover:text-primary hover:border-primary/30 text-gray-600"
                      }`}
                    >
                      <span className="hidden sm:inline text-sm font-medium">
                        {language === "ro" ? "Următorul" : "Next"}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
