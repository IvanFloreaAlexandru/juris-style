import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* 1. About Section */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base md:text-xl">
              {t("Frunză & Asociații", "Law Firm")}
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
              {t(
                "Oferim servicii juridice de calitate, bazate pe profesionalism și dedicare.",
                "We provide quality legal services based on professionalism and dedication."
              )}
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 md:mb-4">
              {t("Link-uri utile", "Quick Links")}
            </h4>
            <ul className="space-y-2">
              {[
                { path: "/despre", label: t("Despre noi", "About Us") },
                { path: "/avocati", label: t("Avocați", "Lawyers") },
                {
                  path: "/domenii-de-practica",
                  label: t("Servicii juridice", "Legal Services"),
                },
                {
                  path: "/noutati",
                  label: t("Noutăți & Articole", "News & Articles"),
                },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    // MODIFICARE AICI: am pus hover:text-white în loc de accent
                    className="text-sm text-primary-foreground/80 hover:text-white hover:pl-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 md:mb-4">
              {t("Contact", "Contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 mt-0.5 flex-shrink-0" />
                <span>
                  Pictor Barbu Iscovescu 40, et.1, ap.2, Sector 1, Bucuresti
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <a
                  href="tel:+40723360063"
                  // MODIFICARE AICI: hover:text-white
                  className="hover:text-white transition-colors"
                >
                  +40 723 360 063
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <a
                  href="mailto:office@frunza-asociatii.ro"
                  // MODIFICARE AICI: hover:text-white
                  className="hover:text-white transition-colors break-all"
                >
                  office@frunza-asociatii.ro
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Social Media */}
          <div>
            <h4 className="font-semibold text-base md:text-lg mb-3 md:mb-4">
              {t("Urmărește-ne", "Follow Us")}
            </h4>
            <div className="flex gap-3 md:gap-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Instagram, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // MODIFICARE AICI: bg-white/10 și hover:bg-white cu text inversat pentru un look clean
                  className="w-9 h-9 md:w-10 md:h-10 bg-primary-foreground/10 hover:bg-white hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-primary-foreground/60">
          <p className="text-center md:text-left">
            © {currentYear} Frunză & Asociații.{" "}
            <span className="hidden sm:inline">| </span>
            <span className="block sm:inline">
              {t("Toate drepturile rezervate.", "All rights reserved.")}
            </span>
          </p>

          <div className="flex gap-4 md:gap-6">
            <Link to="/termeni" className="hover:text-white transition-colors">
              {t("Termeni", "Terms")}
            </Link>
            <Link
              to="/confidentialitate"
              className="hover:text-white transition-colors"
            >
              {t("Confidențialitate", "Privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
