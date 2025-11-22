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
  PenTool,
  FileText,
} from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { ArticlePreview } from "./ArticlePreview";
import { cn } from "@/lib/utils";

// --- INTERFEȚE ---
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

  // State pentru Tab-uri Mobil
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

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
    // FIX 1: Folosim 'dvh' (Dynamic Viewport Height) pentru mobil
    // Scoatem navbar-ul din calcul dacă există, ajustând h-[calc(100dvh-X)]
    <div className="flex flex-col w-full h-[calc(100dvh-4rem)] bg-gray-50">
      {/* --- HEADER (Fix, nu face scroll) --- */}
      <div className="bg-white border-b px-3 py-2 md:px-6 md:py-3 flex items-center justify-between shrink-0 z-30 shadow-sm h-16">
        {/* Stânga: Back & Titlu */}
        <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/articles")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>

          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm md:text-lg text-gray-800 truncate">
              {article ? "Editare" : "Articol Nou"}
            </span>
            <span className="text-[10px] text-gray-400 md:hidden truncate">
              {formData.title || "Fără titlu"}
            </span>
          </div>
        </div>

        {/* Dreapta: Acțiuni */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Desktop Save Text */}
          <Button
            variant="outline"
            onClick={() => handleSubmit("Draft")}
            disabled={loading}
            size="sm"
            className="hidden md:flex"
          >
            <Save className="mr-2 h-4 w-4" /> Salvează
          </Button>

          {/* Mobile Save Icon */}
          <Button
            variant="outline"
            onClick={() => handleSubmit("Draft")}
            disabled={loading}
            size="icon"
            className="h-9 w-9 md:hidden"
          >
            <Save className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => handleSubmit("Published")}
            disabled={loading}
            className="bg-primary hover:bg-red-700 text-white h-9 px-3 text-xs md:text-sm md:px-4"
          >
            <Globe className="mr-1 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
            Publică
          </Button>
        </div>
      </div>

      {/* --- TABS SWITCHER (Doar Mobil) --- */}
      <div className="lg:hidden flex border-b bg-white shrink-0 z-20">
        <button
          onClick={() => setActiveTab("edit")}
          className={cn(
            "flex-1 py-3 text-sm font-medium text-center border-b-2 transition-all",
            activeTab === "edit"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-gray-500"
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <PenTool className="h-4 w-4" /> Editor
          </div>
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex-1 py-3 text-sm font-medium text-center border-b-2 transition-all",
            activeTab === "preview"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-gray-500"
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Eye className="h-4 w-4" /> Preview
          </div>
        </button>
      </div>

      {/* --- CONTENT AREA (Scrollable) --- */}
      {/* FIX 2: min-h-0 este crucial pentru ca flex-1 să nu iasă din ecran */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative w-full">
        {/* === EDITOR PANE === */}
        <div
          className={cn(
            "flex-1 overflow-y-auto bg-white scroll-smooth",
            "lg:block lg:w-[55%] lg:border-r", // Desktop styles
            activeTab === "edit" ? "block w-full" : "hidden" // Mobile styles
          )}
        >
          <div className="p-4 md:p-8 max-w-4xl mx-auto pb-32">
            {/* Titlu Input */}
            <div className="mb-6">
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Titlul articolului..."
                className="text-2xl md:text-4xl font-serif font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-gray-300 h-auto py-2 bg-transparent w-full"
              />
              <div className="flex items-center text-xs text-gray-400 mt-1 gap-2">
                <span className="bg-gray-100 px-1.5 py-0.5 rounded truncate max-w-full block">
                  /noutati/{formData.slug || "..."}
                </span>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="min-h-[300px] mb-8">
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </div>

            {/* Setări (Accordion) */}
            <div className="border-t pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="settings" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <Settings className="h-5 w-5 text-primary" />
                      Setări Avansate
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-6">
                    {/* Image Upload */}
                    <Card className="border-dashed shadow-none">
                      <CardHeader className="pb-2 p-4">
                        <CardTitle className="text-sm font-medium flex gap-2">
                          <ImageIcon className="h-4 w-4" /> Imagine Copertă
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        {formData.coverImage ? (
                          <div className="relative group rounded-md overflow-hidden h-40 w-full bg-gray-100">
                            <img
                              src={formData.coverImage}
                              alt="Cover"
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow-md opacity-90 hover:opacity-100"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <Upload className="h-6 w-6 text-gray-300 mb-1" />
                            <span className="text-xs text-gray-500">
                              Upload Imagine
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

                    {/* Categorie & Excerpt */}
                    <div className="space-y-4">
                      <div>
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

                      <div>
                        <Label>Rezumat (Meta description)</Label>
                        <Textarea
                          rows={2}
                          className="resize-none"
                          value={formData.excerpt}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              excerpt: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label>Tag-uri</Label>
                        <Input
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                          placeholder="ex: urgente, penal"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* === PREVIEW PANE === */}
        <div
          className={cn(
            "flex-1 overflow-y-auto bg-gray-100",
            "lg:block lg:w-[45%]", // Desktop styles
            activeTab === "preview" ? "block w-full" : "hidden" // Mobile styles
          )}
        >
          <div className="p-4 md:p-8 flex justify-center min-h-full">
            <div className="w-full max-w-2xl pb-20">
              <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm font-bold uppercase tracking-wider">
                <Eye className="h-4 w-4" /> Live Preview
              </div>

              {/* Card Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
                <ArticlePreview
                  title={formData.title || "Titlu Articol"}
                  content={
                    formData.content ||
                    "<p class='text-gray-400 italic'>Conținutul va apărea aici...</p>"
                  }
                  excerpt={formData.excerpt}
                  category={formData.category}
                  tags={formData.tags}
                  coverImage={formData.coverImage}
                  author="Admin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
