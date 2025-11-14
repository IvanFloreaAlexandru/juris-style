import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticles } from '@/contexts/ArticlesContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { articles, loading, fetchArticles } = useArticles();
  const { language } = useLanguage();
  
  const article = articles.find(a => a.slug === slug && a.status === 'published');

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles({ status: 'published' });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <article className="max-w-4xl mx-auto">
            <Skeleton className="w-full h-96 rounded-lg mb-8" />
            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </article>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Articol negăsit</h1>
        <Button asChild>
          <Link to={language === 'ro' ? '/noutati' : '/news'}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ro' ? 'Înapoi la noutăți' : 'Back to news'}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 hover:scale-105 transition-transform">
          <Link to={language === 'ro' ? '/noutati' : '/news'}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ro' ? 'Înapoi' : 'Back'}
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          {article.coverImage && (
            <div className="overflow-hidden rounded-lg mb-8">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="mb-6">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {article.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-6">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
};
