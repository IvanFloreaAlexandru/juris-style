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
            label: "Noutăți & Comentarii",
          },
          { path: "/contact", label: "Contact" },
        ]
      : [
          { path: "/about", label: "About Us" },
          { path: "/legal-services", label: "Legal Services" },
          { path: "/news", label: "News & Commentary" },
          { path: "/contact", label: "Contact" },
        ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to={language === "ro" ? "/despre" : "/about"}
            className="flex items-center space-x-2 min-w-0 flex-shrink"
          >
            <img
              src={logoImage}
              alt="Logo Frunză & Asociații"
              className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
            />
            <span className="font-serif font-bold text-base sm:text-lg md:text-xl hidden xs:block text-[hsl(var(--primary))] truncate">
              Frunză & Asociații
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 xl:px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
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
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 sm:gap-2 hover:scale-110 transition-transform px-2 sm:px-3"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">
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

            {/* Auth Section - Desktop */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="hidden sm:inline-flex gap-2 text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:inline">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem onClick={() => navigate("/admin/articles")}>
                    <Settings className="h-4 w-4 mr-2" />
                    {language === "ro" ? "Panou Admin" : "Admin Panel"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="hidden sm:inline-flex text-xs sm:text-sm px-2 sm:px-3"
                >
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              aria-label={isOpen ? "Închide meniu" : "Deschide meniu"}
            >
              {isOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
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
                    {language === "ro" ? "Panou Admin" : "Admin Panel"}
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="px-4 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50 text-left flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
