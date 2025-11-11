import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ArticlesProvider } from "./contexts/ArticlesContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RootRedirect } from "./components/RootRedirect";
import { RouteGuard } from "./components/RouteGuard";
import { AdminLayout } from "./components/admin/AdminLayout";
import About from "./pages/About";
import Lawyers from "./pages/Lawyers";
import Services from "./pages/Services";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PracticeAreaDetail from "./pages/PracticeAreaDetail";
import { ArticleDetail } from "./pages/ArticleDetail";
import { AdminArticles } from "./pages/admin/AdminArticles";
import { AdminArticleNew } from "./pages/admin/AdminArticleNew";
import { AdminArticleEdit } from "./pages/admin/AdminArticleEdit";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ArticlesProvider>
            <LanguageProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Admin routes (no navbar/footer) */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminArticles />} />
                    <Route path="articles" element={<AdminArticles />} />
                    <Route path="articles/new" element={<AdminArticleNew />} />
                    <Route path="articles/edit/:id" element={<AdminArticleEdit />} />
                    <Route path="settings" element={<div className="text-center py-16">Settings page coming soon</div>} />
                  </Route>

                  {/* Public routes (with navbar/footer) */}
                  <Route path="*" element={
                    <>
                      <Navbar />
                      <RouteGuard>
                        <Routes>
                          {/* Root redirect */}
                          <Route path="/" element={<RootRedirect />} />
                          
                          {/* Romanian routes */}
                          <Route path="/despre" element={<About />} />
                          <Route path="/avocati" element={<Lawyers />} />
                          <Route path="/domenii-de-practica" element={<Services />} />
                          <Route path="/domenii-de-practica/:id" element={<PracticeAreaDetail />} />
                          <Route path="/noutati" element={<News />} />
                          <Route path="/noutati/:slug" element={<ArticleDetail />} />
                          
                          {/* English routes */}
                          <Route path="/about" element={<About />} />
                          <Route path="/lawyers" element={<Lawyers />} />
                          <Route path="/legal-services" element={<Services />} />
                          <Route path="/legal-services/:id" element={<PracticeAreaDetail />} />
                          <Route path="/news" element={<News />} />
                          <Route path="/news/:slug" element={<ArticleDetail />} />
                          
                          {/* Common routes */}
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </RouteGuard>
                      <Footer />
                    </>
                  } />
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
          </ArticlesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
