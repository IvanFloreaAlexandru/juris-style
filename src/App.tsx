import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import About from "./pages/About";
import Lawyers from "./pages/Lawyers";
import Services from "./pages/Services";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PracticeAreaDetail from "./pages/PracticeAreaDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              {/* Romanian routes */}
              <Route path="/despre" element={<About />} />
              <Route path="/avocati" element={<Lawyers />} />
              <Route path="/domenii-de-practica" element={<Services />} />
              <Route path="/domenii-de-practica/:id" element={<PracticeAreaDetail />} />
              <Route path="/noutati" element={<News />} />
              
              {/* English routes */}
              <Route path="/about" element={<About />} />
              <Route path="/lawyers" element={<Lawyers />} />
              <Route path="/legal-services" element={<Services />} />
              <Route path="/legal-services/:id" element={<PracticeAreaDetail />} />
              <Route path="/news" element={<News />} />
              
              {/* Common routes */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
