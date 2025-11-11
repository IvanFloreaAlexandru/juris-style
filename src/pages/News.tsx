import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useArticles } from '@/contexts/ArticlesContext';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function News() {
  const { t, language } = useLanguage();
  const { articles, loading, fetchArticles } = useArticles();

  useEffect(() => {
    fetchArticles({ status: 'published' });
  }, []);

  const publishedArticles = articles.filter(a => a.status === 'published');

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4">
            {t('Noutăți și articole', 'News and Articles')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              'Rămâneți la curent cu ultimele schimbări legislative și sfaturi juridice',
              'Stay up to date with the latest legislative changes and legal advice'
            )}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">Se încarcă...</div>
          ) : publishedArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Nu există articole publicate</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {article.coverImage && (
                    <img src={article.coverImage} alt={article.title} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <Badge className="mb-2 w-fit">{article.category}</Badge>
                    <CardTitle className="font-serif">{article.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('ro-RO')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <User className="h-3 w-3" />
                        <span>{article.author}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`${language === 'ro' ? '/noutati' : '/news'}/${article.slug}`}>
                        {t('Citește mai mult', 'Read More')}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
