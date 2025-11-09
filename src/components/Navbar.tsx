import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "../assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  // 🔹 Funcția de schimbare limbă cu redirecționare între rute
  const handleLanguageSwitch = (lang: 'ro' | 'en') => {
    const currentPath = location.pathname;

    const routesMap: Record<string, string> = {
      "/despre": "/about",
      "/about": "/despre",
      "/domenii-de-practica": "/legal-services",
      "/legal-services": "/domenii-de-practica",
      "/noutati": "/news",
      "/news": "/noutati",
      "/contact": "/contact",
      "/login": "/login",
    };

    let newPath = currentPath;

    // Caută echivalența între rutele RO ↔ EN
    for (const [ro, en] of Object.entries(routesMap)) {
      if (lang === "en" && currentPath === ro) newPath = en;
      if (lang === "ro" && currentPath === en) newPath = ro;
    }

    // Actualizează limba în context și navighează la ruta echivalentă
    setLanguage(lang);
    navigate(newPath);
  };

  const navItems = language === 'ro' 
    ? [
        { path: "/despre", label: "Despre noi" },
        { path: "/domenii-de-practica", label: "Domenii de practică" },
        { path: "/noutati", label: "Noutăți legislative & Comentarii juridice" },
        { path: "/contact", label: "Contact" },
      ]
    : [
        { path: "/about", label: "About Us" },
        { path: "/legal-services", label: "Legal Services" },
        { path: "/news", label: "News" },
        { path: "/contact", label: "Contact" },
      ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/despre" className="flex items-center space-x-2">
            <img
              src={logoImage}
              alt="Logo Frunză-Asociații"
              className="h-12 w-auto object-contain"
            />
            <span className="font-serif font-bold text-xl hidden sm:block text-[hsl(var(--primary))]">
              {t("Frunză-Asociații", "Law Firm")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-primary bg-secondary"
                    : "text-foreground hover:text-primary hover:bg-secondary/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Language & Login */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {language === "ro" ? "RO" : "EN"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem onClick={() => handleLanguageSwitch("ro")}>
                  🇷🇴 Română
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageSwitch("en")}>
                  🇬🇧 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login Button */}
            <Link to="/login">
              <Button
                variant="default"
                size="sm"
                className="hidden sm:inline-flex"
              >
                {t("Login", "Login")}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md hover:bg-secondary"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-secondary"
                      : "text-foreground hover:text-primary hover:bg-secondary/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50"
              >
                {t("Login", "Login")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
