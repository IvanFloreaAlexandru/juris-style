import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import logoImage from "../assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  const handleLanguageSwitch = (lang: "ro" | "en") => {
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

    for (const [ro, en] of Object.entries(routesMap)) {
      if (lang === "en" && currentPath === ro) newPath = en;
      if (lang === "ro" && currentPath === en) newPath = ro;
    }

    setLanguage(lang);
    navigate(newPath);
  };

  const navItems =
    language === "ro"
      ? [
          { path: "/despre", label: "Despre noi" },
          { path: "/domenii-de-practica", label: "Domenii de practică" },
          {
            path: "/noutati",
            label: "Noutăți legislative & Comentarii juridice",
          },
          { path: "/contact", label: "Contact" },
        ]
      : [
          { path: "/about", label: "About Us" },
          { path: "/legal-services", label: "Legal Services" },
          { path: "/news", label: "News" },
          { path: "/contact", label: "Contact" },
        ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/despre" className="flex items-center space-x-2">
            <img
              src={logoImage}
              alt="Logo Frunză & Asociații"
              className="h-12 w-auto object-contain"
            />
            <span className="font-serif font-bold text-xl hidden sm:block text-[hsl(var(--primary))] pr-5">
              {t("Frunză & Asociații", "Frunză & Asociații")}
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

          {/* Right Side - Language & Auth */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:scale-110 transition-transform"
                >
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

            {/* Auth Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="hidden sm:inline-flex gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    {t("Admin", "Admin")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem onClick={() => navigate("/admin/articles")}>
                    <Settings className="h-4 w-4 mr-2" />
                    {t("Panou Admin", "Admin Panel")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("Logout", "Logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  {t("Login", "Login")}
                </Button>
              </Link>
            )}

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

              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin/articles"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50 flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {t("Panou Admin", "Admin Panel")}
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50 text-left flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("Logout", "Logout")}
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50"
                >
                  {t("Login", "Login")}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
