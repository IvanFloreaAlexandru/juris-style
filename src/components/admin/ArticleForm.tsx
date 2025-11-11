import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Eye, EyeOff } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { ArticlePreview } from "./ArticlePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Article {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  status: "draft" | "published";
  author: string;
}

interface ArticleFormProps {
  article?: Article;
  onSubmit: (article: Partial<Article>) => Promise<void>;
}

const categories = [
  "Noutăți Legislative",
  "Comentarii Juridice",
  "Jurisprudență",
  "Doctrină",
  "Practică",
];

export const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    category: article?.category || "",
    tags: article?.tags?.join(", ") || "",
    coverImage: article?.coverImage || "",
    status: article?.status || ("draft" as const),
  });

  useEffect(() => {
    if (!formData.slug && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleSubmit = async (status: "draft" | "published") => {
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Eroare",
        description: "Completează toate câmpurile obligatorii",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        status,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        author: "Admin", // mock author
      });

      toast({
        title: "Success",
        description:
          status === "published" ? "Articol publicat" : "Draft salvat",
      });
      navigate("/admin/articles");
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva articolul",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          size="sm"
        >
          {showPreview ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Ascunde Preview
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Arată Preview
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:hidden mb-4">
          <TabsTrigger value="edit">Editare</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <div className={showPreview ? "grid lg:grid-cols-2 gap-6" : ""}>
          <TabsContent value="edit" className="mt-0 lg:block">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titlu *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Titlul articolului"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="slug-articol"
                />
              </div>

              <div>
                <Label htmlFor="category">Categorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tag-uri</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="drept civil, contract, lege"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Extras</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="coverImage">Imagine copertă (URL)</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Conținut *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) =>
                    setFormData({ ...formData, content })
                  }
                />
              </div>
            </div>
          </TabsContent>

          {showPreview && (
            <TabsContent value="preview" className="mt-0 lg:block">
              <div className="lg:sticky lg:top-6">
                <ArticlePreview
                  title={formData.title}
                  content={formData.content}
                  excerpt={formData.excerpt}
                  category={formData.category}
                  tags={formData.tags}
                  coverImage={formData.coverImage}
                  author="Admin"
                />
              </div>
            </TabsContent>
          )}
        </div>
      </Tabs>

      <div className="flex gap-3 justify-end border-t pt-4">
        <Button variant="outline" onClick={() => navigate("/admin/articles")}>
          Anulează
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSubmit("draft")}
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          Salvează Draft
        </Button>
        <Button onClick={() => handleSubmit("published")} disabled={loading}>
          <Eye className="mr-2 h-4 w-4" />
          Publică
        </Button>
      </div>
    </div>
  );
};
