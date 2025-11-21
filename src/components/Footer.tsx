import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "../assets/logo.png";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary text-white font-sans overflow-hidden">
      {/* 1. FUNDAL DECORATIV SUBTIL */}
      {/* Un gradient fin pentru a da adâncime culorii roșii */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 py-12 lg:py-16 z-10">
        {/* GRID CU 3 COLOANE - Balans perfect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* COLOANA 1: BRANDING */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                {/* Logo complet alb */}
                <img
                  src={logoImage}
                  alt="Frunza & Asociatii"
                  className="h-14 w-auto brightness-0 invert opacity-100 transition-opacity group-hover:opacity-80"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-wide text-white leading-none">
                    Frunză & Asociații
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/70 mt-1">
                    Law Firm
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {t(
                "Partenerul dumneavoastră juridic de încredere. Oferim consultanță și reprezentare la cele mai înalte standarde de profesionalism.",
                "Your trusted legal partner. We provide consultancy and representation at the highest standards of professionalism."
              )}
            </p>

            {/* Social Icons - Stil minimalist */}
            <div className="flex gap-4 pt-2">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/icon relative flex items-center justify-center w-10 h-10"
                >
                  {/* Cerc fundal care apare la hover */}
                  <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover/icon:scale-100 transition-transform duration-300" />
                  {/* Iconita care își schimbă culoarea */}
                  <Icon className="relative z-10 h-5 w-5 text-white group-hover/icon:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* COLOANA 2: MENIU RAPID */}
          <div className="md:pl-8 lg:pl-12">
            <h4 className="font-serif text-lg font-semibold mb-6 text-white inline-block border-b-2 border-white/20 pb-1">
              {t("Navigare", "Menu")}
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/despre", label: t("Despre noi", "About Us") },
                { path: "/avocati", label: t("Echipa noastră", "Our Team") },
                {
                  path: "/domenii-de-practica",
                  label: t("Domenii de practică", "Practice Areas"),
                },
                { path: "/noutati", label: t("Noutăți", "News") },
                { path: "/contact", label: t("Contact", "Contact") },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mr-3 group-hover:bg-white group-hover:scale-125 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLOANA 3: CONTACT */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6 text-white inline-block border-b-2 border-white/20 pb-1">
              {t("Contact", "Contact Info")}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded bg-white/10 shadow-sm">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm text-white/90 leading-relaxed">
                  Pictor Barbu Iscovescu 40,
                  <br />
                  Et. 1, Ap. 2, Sector 1,
                  <br />
                  București, România
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 rounded bg-white/10 shadow-sm">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <a
                  href="tel:+40723360063"
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  +40 723 360 063
                </a>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 rounded bg-white/10 shadow-sm">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <a
                  href="mailto:office@frunza-asociatii.ro"
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  office@frunza-asociatii.ro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEPARATOR DISCRET */}
      <div className="border-t border-white/10 w-full" />

      {/* COPYRIGHT CENTERED */}
      <div className="bg-black/10">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-xs text-white/60 font-medium tracking-wide">
            © {currentYear} Frunză & Asociații.{" "}
            {t("Toate drepturile rezervate.", "All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
};
