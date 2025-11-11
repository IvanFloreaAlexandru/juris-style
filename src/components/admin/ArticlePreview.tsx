import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ArticlePreviewProps {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags: string;
  coverImage?: string;
  author: string;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  title,
  content,
  excerpt,
  category,
  tags,
  coverImage,
  author,
}) => {
  const tagsArray = tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <Card className="p-6 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {coverImage && (
          <img
            src={coverImage}
            alt={title || 'Preview'}
            className="w-full h-64 object-cover rounded-lg mb-6"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        <div className="mb-6">
          {category && <Badge className="mb-4">{category}</Badge>}
          <h1 className="text-4xl font-bold mb-4">
            {title || 'Titlul articolului'}
          </h1>

          <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{author || 'Admin'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('ro-RO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
          </div>

          {tagsArray.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {tagsArray.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {excerpt && (
            <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4 mb-6">
              {excerpt}
            </p>
          )}
        </div>

        {content ? (
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="text-muted-foreground text-center py-8">
            Conținutul articolului va apărea aici...
          </div>
        )}
      </div>
    </Card>
  );
};
