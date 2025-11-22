import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useArticles } from "@/contexts/ArticlesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Eye,
  Filter,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AdminArticles: React.FC = () => {
  // Folosim doar articles și fetchArticles din context
  // Pentru delete și patch folosim fetch manual pentru a controla header-ul de autorizare
  const { articles, fetchArticles } = useArticles();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null); // Loading per row action

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Încărcare inițială
  useEffect(() => {
    if (fetchArticles) {
      fetchArticles();
    }
  }, []);

  const isPublished = (status: string) => status?.toLowerCase() === "published";

  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "Eroare Dată";
    }
  };

  // --- 1. UPDATE STATUS CU TOKEN ---
  const handleToggleStatus = async (article: any) => {
    const currentlyPublished = isPublished(article.status);
    const newStatus = currentlyPublished ? "Draft" : "Published";

    // Preluare Token
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

    setLoadingId(article.id);

    try {
      const response = await fetch(`${API_URL}/articles/${article.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Header esențial
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast({
          title: "Status Actualizat",
          description: `Articolul este acum: ${
            newStatus === "Published" ? "Publicat" : "Ciornă"
          }`,
          className: "bg-green-50 border-green-200",
        });

        // Refresh lista
        if (fetchArticles) fetchArticles();
        else window.location.reload();
      } else {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error("Update failed");
      }
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        navigate("/login");
      } else {
        toast({
          title: "Eroare",
          description: "Nu s-a putut modifica statusul.",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingId(null);
    }
  };

  // --- 2. DELETE CU TOKEN ---
  const handleDelete = async () => {
    if (!deleteId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast({ title: "Sesiune expirată", variant: "destructive" });
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/articles/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Header esențial
        },
      });

      if (response.ok) {
        toast({ title: "Succes", description: "Articolul a fost șters." });
        if (fetchArticles) fetchArticles();
      } else {
        if (response.status === 401) throw new Error("Unauthorized");
        throw new Error("Delete failed");
      }
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        navigate("/login");
      } else {
        toast({
          title: "Eroare",
          description: "Nu s-a putut șterge articolul.",
          variant: "destructive",
        });
      }
    } finally {
      setDeleteId(null);
    }
  };

  // Filtrare
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;

    let matchesStatus = true;
    if (statusFilter === "Published") {
      matchesStatus = isPublished(article.status);
    } else if (statusFilter === "Draft") {
      matchesStatus = !isPublished(article.status);
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalArticles = articles.length;
  const publishedCount = articles.filter((a) => isPublished(a.status)).length;
  const draftCount = totalArticles - publishedCount;

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* STATISTICI */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Articole
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalArticles}
            </div>
            <p className="text-xs text-muted-foreground">În baza de date</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Publicate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {publishedCount}
            </div>
            <p className="text-xs text-muted-foreground">Vizibile pe site</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-amber-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ciorne (Draft)
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{draftCount}</div>
            <p className="text-xs text-muted-foreground">În lucru</p>
          </CardContent>
        </Card>
      </div>

      {/* MAIN CONTENT */}
      <Card className="border border-gray-200 shadow-md">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Gestiune Conținut
              </CardTitle>
              <CardDescription>
                Vizualizează, editează sau șterge articolele existente.
              </CardDescription>
            </div>
            <Button
              asChild
              className="bg-primary hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
            >
              <Link to="/admin/articles/new">
                <Plus className="mr-2 h-4 w-4" />
                Articol Nou
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* FILTRE */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Caută după titlu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all"
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Filter className="h-3.5 w-3.5" />
                    <SelectValue placeholder="Categorie" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate categoriile</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toate</SelectItem>
                  <SelectItem value="Published">Publicate</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* TABEL */}
          <div className="rounded-md border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[40%]">Titlu & Slug</TableHead>
                  <TableHead>Categorie</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dată</TableHead>
                  <TableHead className="text-right">Acțiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <FileText className="h-8 w-8 text-gray-300" />
                        <p>Nu s-au găsit articole conform filtrelor.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredArticles.map((article: any) => {
                    const published = isPublished(article.status);

                    return (
                      <TableRow
                        key={article.id}
                        className="hover:bg-gray-50/80 transition-colors group"
                      >
                        <TableCell className="py-4">
                          <div className="font-semibold text-gray-900 line-clamp-1">
                            {article.title}
                          </div>
                          <div className="text-xs text-gray-400 font-mono mt-1">
                            /{article.slug}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-gray-50 font-normal text-gray-600"
                          >
                            {article.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              published
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                published ? "bg-green-600" : "bg-amber-600"
                              }`}
                            />
                            {published ? "Publicat" : "Ciornă"}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(article.createdAt || article.created_at)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-700"
                                disabled={loadingId === article.id}
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acțiuni</DropdownMenuLabel>

                              <DropdownMenuItem asChild>
                                <Link
                                  to={`/noutati/${article.slug}`}
                                  target="_blank"
                                  className="cursor-pointer flex items-center"
                                >
                                  <Eye className="mr-2 h-4 w-4 text-gray-500" />
                                  Vizualizează
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem asChild>
                                <Link
                                  to={`/admin/articles/edit/${article.id}`}
                                  className="cursor-pointer flex items-center"
                                >
                                  <Edit2 className="mr-2 h-4 w-4 text-blue-600" />
                                  Editează Conținut
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleToggleStatus(article)}
                                className="cursor-pointer flex items-center"
                              >
                                <RefreshCw className="mr-2 h-4 w-4 text-orange-500" />
                                {published
                                  ? "Trece în Ciornă"
                                  : "Publică Articol"}
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() => setDeleteId(article.id)}
                                className="text-red-600 focus:text-red-600 cursor-pointer flex items-center"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Șterge Definitiv
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Ștergere */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ești sigur?</AlertDialogTitle>
            <AlertDialogDescription>
              Această acțiune este ireversibilă. Articolul va fi șters
              definitiv.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
