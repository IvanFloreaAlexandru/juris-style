import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  LogOut,
  Settings,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  // Detectează scroll-ul pentru efecte vizuale
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageSwitch = (lang: "ro" | "en") => {
    const currentPath = location.pathname;
    // ... logica ta de mapare rute rămâne neschimbată ...
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
          { path: "/noutati", label: "Noutăți" },
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
    <header className="fixed top-0 w-full z-50 font-sans">
      {/* 1. TOP BAR - Contact Info (Doar pe Desktop) */}
      {/* Dispare la scroll pentru a păstra ecranul curat */}
      <div
        className={`bg-primary text-primary-foreground transition-all duration-300 overflow-hidden ${
          scrolled ? "h-0" : "h-10"
        } hidden lg:block`}
      >
        <div className="container mx-auto px-4 h-full flex justify-between items-center text-xs font-medium tracking-wide opacity-90">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+40723360063"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+40 723 360 063</span>
            </a>
            <a
              href="mailto:office@frunza-asociatii.ro"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>office@frunza-asociatii.ro</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span>București, Sector 1</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav
        className={`transition-all duration-300 border-b border-transparent ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-border/10 py-2"
            : "bg-white py-4 border-border/0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link
              to={language === "ro" ? "/despre" : "/about"}
              className="flex items-center space-x-3 group"
            >
              <img
                src={logoImage}
                alt="Logo"
                className={`transition-all duration-300 object-contain ${
                  scrolled ? "h-10" : "h-12"
                }`}
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-gray-900 leading-none group-hover:text-primary transition-colors">
                  Frunză & Asociații
                </span>
                <span
                  className={`text-[0.65rem] uppercase tracking-[0.2em] text-gray-500 transition-all duration-300 ${
                    scrolled ? "h-0 opacity-0" : "h-auto opacity-100 mt-1"
                  }`}
                >
                  Law Firm
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION - Cu efect de subliniere */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative py-2 text-sm font-medium transition-colors duration-300 
                      ${
                        isActive
                          ? "text-primary"
                          : "text-gray-600 hover:text-primary"
                      }
                      group
                    `}
                  >
                    {item.label}
                    {/* Linia animată de dedesubt */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-out ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* ACTIONS (Language + Auth) */}
            <div className="flex items-center space-x-3">
              {/* Language Switcher - Minimalist */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary transition-colors px-2 py-1">
                    <Globe className="h-4 w-4" />
                    <span>{language === "ro" ? "RO" : "EN"}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-32 animate-in fade-in-0 zoom-in-95"
                >
                  <DropdownMenuItem
                    onClick={() => handleLanguageSwitch("ro")}
                    className="cursor-pointer"
                  >
                    🇷🇴 Română
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLanguageSwitch("en")}
                    className="cursor-pointer"
                  >
                    🇬🇧 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Auth Button */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden sm:inline-flex gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="hidden lg:inline">Admin</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/articles")}
                    >
                      Admin Panel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button
                    variant="default"
                    size="sm"
                    className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU - Full screen overlay sau Dropdown stilizat */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl animate-in slide-in-from-top-5 duration-300 z-40">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  location.pathname === item.path
                    ? "bg-primary/5 text-primary border-l-4 border-primary pl-3"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
              {/* Mobile Auth Actions */}
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/articles")}
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" /> Admin
                </Button>
              ) : (
                <Button onClick={() => navigate("/login")} className="w-full">
                  Login
                </Button>
              )}
              {/* Mobile Logout if auth */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-red-500 w-full justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
