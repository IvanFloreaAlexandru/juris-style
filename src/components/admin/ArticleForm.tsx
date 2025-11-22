import React, { useState, useEffect, useRef } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  X,
  ArrowLeft,
  Globe,
  Settings,
} from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { ArticlePreview } from "./ArticlePreview";

export interface Article {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  status: "Draft" | "Published";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: article?.title || "",
    slug: article?.slug || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    category: article?.category || "Noutăți Legislative",
    tags: article?.tags?.join(", ") || "",
    coverImage: article?.coverImage || "",
    status: article?.status || ("Draft" as const),
  });

  // Generare automată URL (Slug) din titlu
  useEffect(() => {
    if (!article && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          coverImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (status: "Draft" | "Published") => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Lipsesc date",
        description: "Titlul și conținutul sunt obligatorii.",
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
        author: "Admin",
      });

      toast({
        title: "Succes",
        description:
          status === "Published" ? "Publicat cu succes!" : "Salvat ca ciornă.",
        className: "bg-green-50 border-green-200",
      });
      navigate("/admin/articles");
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva articolul.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-gray-50/50">
      {/* --- HEADER (Toolbar) --- */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/articles")}
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Button>
          <span className="font-semibold text-lg text-gray-800">
            {article ? "Editare Articol" : "Scrie Articol Nou"}
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleSubmit("Draft")}
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" /> Salvează Ciornă
          </Button>
          <Button
            onClick={() => handleSubmit("Published")}
            disabled={loading}
            className="bg-primary hover:bg-red-700 text-white"
          >
            <Globe className="mr-2 h-4 w-4" /> Publică
          </Button>
        </div>
      </div>

      {/* --- MAIN CONTENT (SPLIT SCREEN) --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* STÂNGA: EDITOR (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 border-r bg-white max-w-[55%]">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* 1. TITLU */}
            <div>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Titlul articolului..."
                className="text-4xl font-serif font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-gray-300 h-auto py-2 bg-transparent"
              />
              {/* URL (Slug) discret */}
              <div className="flex items-center text-xs text-gray-400 mt-1 gap-2">
                <span className="font-mono bg-gray-50 px-1 rounded">
                  /noutati/{formData.slug}
                </span>
              </div>
            </div>

            {/* 2. EDITOR DE TEXT */}
            <div className="min-h-[400px]">
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>

            {/* 3. SETĂRI (Collapsible pentru a nu aglomera) */}
            <div className="pt-8 border-t">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="settings" className="border-none">
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline py-2">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Setări Articol (Imagine, Categorie)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-6">
                    {/* IMAGINE */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-primary" /> Imagine
                          Copertă
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {formData.coverImage ? (
                          <div className="relative group rounded-md overflow-hidden border h-48 w-full">
                            <img
                              src={formData.coverImage}
                              alt="Cover"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={removeImage}
                              >
                                <X className="mr-2 h-4 w-4" /> Șterge
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all"
                          >
                            <Upload className="h-8 w-8 text-gray-300 mb-2" />
                            <span className="text-sm text-gray-500">
                              Click pentru a încărca o imagine
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </CardContent>
                    </Card>

                    {/* METADATA */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Categorie</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(v) =>
                            setFormData({ ...formData, category: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Rezumat scurt (Excerpt)</Label>
                        <Textarea
                          rows={1}
                          className="resize-none"
                          placeholder="Max 150 caractere..."
                          value={formData.excerpt}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              excerpt: e.target.value,
                            })
                          }
                        />
                      </div>
                      {/* Input pentru tag-uri adăugat aici */}
                      <div className="col-span-2 space-y-2">
                        <Label>Tag-uri (separate prin virgulă)</Label>
                        <Input
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                          placeholder="ex: civil, penal, 2024"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* DREAPTA: LIVE PREVIEW (Sticky) */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6 lg:p-10 flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Eye className="h-4 w-4" /> Live Preview
              </h3>
              <span className="text-xs text-gray-400">
                Actualizare în timp real
              </span>
            </div>

            {/* Container Preview - Arată exact ca pe site */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden min-h-[600px] pointer-events-none select-none ring-1 ring-black/5">
              <ArticlePreview
                title={formData.title || "Titlu Articol"}
                content={formData.content || "<p>Începe să scrii...</p>"}
                excerpt={formData.excerpt}
                category={formData.category}
                // MODIFICARE AICI: Trimitem string-ul direct, nu array
                tags={formData.tags}
                coverImage={formData.coverImage}
                author="Admin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
