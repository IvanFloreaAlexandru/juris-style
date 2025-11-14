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

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">
              {t("Frunză & Asociații", "Law Firm")}
            </h3>
            <p className="text-sm text-primary-foreground/80">
              {t(
                "Oferim servicii juridice de calitate, bazate pe profesionalism și dedicare.",
                "We provide quality legal services based on professionalism and dedication."
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {t("Link-uri utile", "Quick Links")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/despre"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t("Despre noi", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  to="/avocati"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t("Avocați", "Lawyers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/domenii-de-practica"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t("Servicii juridice", "Legal Services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/noutati"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {t("Noutăți legislative & Comentarii juridice", "News")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t("Contact", "Contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  Pictor Barbu Iscovescu 40, et.1, ap.2, Sector 1, Bucuresti
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+40 723 360 063</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>office@frunza-asociatii.ro</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">
              {t("Urmărește-ne", "Follow Us")}
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
    </footer>
  );
};
