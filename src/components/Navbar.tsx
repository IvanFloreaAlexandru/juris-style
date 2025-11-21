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
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  // Detectare scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Blocare scroll body când meniul e deschis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
    setIsOpen(false);
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
    setIsOpen(false);
  };

  // --- DEFINIRE VARIANTS (Aici era posibila eroare, trebuie să fie în interiorul componentei sau constantă externă) ---

  const menuVariants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren", // Animăm containerul înainte să apară link-urile
        staggerChildren: 0.05,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
        when: "afterChildren", // Ascundem link-urile înainte să închidem containerul
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <header className="fixed top-0 w-full z-50 font-sans bg-white">
      {/* 1. TOP BAR (Desktop) */}
      <div
        className={`bg-primary text-white transition-all duration-300 overflow-hidden ${
          scrolled ? "h-0" : "h-10"
        } hidden lg:block`}
      >
        <div className="container mx-auto px-4 h-full flex justify-between items-center text-xs font-medium opacity-90">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+40723360063"
              className="flex items-center gap-2 hover:text-gray-200 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> <span>+40 723 360 063</span>
            </a>
            <a
              href="mailto:office@frunza-asociatii.ro"
              className="flex items-center gap-2 hover:text-gray-200 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />{" "}
              <span>office@frunza-asociatii.ro</span>
            </a>
          </div>
          <div>București, Sector 1</div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      {/* Adăugăm 'relative' aici pentru ca meniul mobil (absolute) să se poziționeze față de acest container */}
      <nav
        className={`relative transition-all duration-300 border-b ${
          scrolled
            ? "bg-white shadow-sm py-2 border-gray-100"
            : "bg-white py-4 border-transparent"
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
                  scrolled || isOpen ? "h-10" : "h-12"
                }`}
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-gray-900 leading-none">
                  Frunză & Asociații
                </span>
                <span
                  className={`text-[0.65rem] uppercase tracking-[0.2em] text-gray-500 transition-all duration-300 ${
                    scrolled || isOpen
                      ? "h-0 opacity-0"
                      : "h-auto opacity-100 mt-1"
                  }`}
                >
                  Law Firm
                </span>
              </div>
            </Link>

            {/* DESKTOP MENU (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-gray-600 hover:text-primary"
                    } group`}
                  >
                    {item.label}
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

            {/* ICONS & TOGGLE */}
            <div className="flex items-center space-x-2">
              {/* Language (Desktop + Mobile Icon style) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary px-2 py-1 outline-none">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {language === "ro" ? "RO" : "EN"}
                    </span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border-gray-200"
                >
                  <DropdownMenuItem onClick={() => handleLanguageSwitch("ro")}>
                    🇷🇴 Română
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageSwitch("en")}>
                    🇬🇧 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Desktop Auth Button */}
              <div className="hidden sm:block">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-gray-200 text-gray-700"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/articles")}
                      >
                        Admin Panel
                      </DropdownMenuItem>
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
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* MOBILE BURGER BUTTON */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-900 hover:text-primary transition-colors"
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

        {/* 3. MOBILE MENU DROPDOWN (Inside Nav, Absolute Positioned) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden z-40"
              style={{ transformOrigin: "top" }}
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <motion.div key={item.path} variants={itemVariants}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                        location.pathname === item.path
                          ? "bg-gray-100 text-gray-900 font-semibold border-l-4 border-primary"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Actions */}
                <motion.div
                  variants={itemVariants}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigate("/admin/articles");
                          setIsOpen(false);
                        }}
                        className="w-full justify-start text-gray-700 border-gray-300"
                      >
                        <Settings className="h-4 w-4 mr-2" /> Admin Panel
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate("/login");
                        setIsOpen(false);
                      }}
                      className="w-full bg-primary text-white shadow-md"
                    >
                      Login
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Overlay (Fundal întunecat) - Opțional */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            // Top trebuie sa fie sub navbar, dar fiind fixed full screen e mai simplu sa il lasam full
            // si sa il punem sub meniu prin z-index (z-30 vs z-40 la meniu)
            style={{ top: "100px" }}
          />
        )}
      </AnimatePresence>
    </header>
  );
};
