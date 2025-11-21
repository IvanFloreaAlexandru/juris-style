import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import {
  FileText,
  Scale,
  Shield,
  Gavel,
  Landmark,
  Building,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import officeImage3 from "@/assets/office-4.jpg";
import logo from "@/assets/logo.png";

export default function About() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="w-full h-48 md:h-64 mb-8" />
          {/* Skeleton adaptat la noua grilă responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
          <Skeleton className="w-full h-64 md:h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={officeImage3}
        category={t("DESPRE NOI", "ABOUT US")}
        categoryEn="ABOUT US"
        title={t("Suport și asistență", "Support and Assistance")}
        titleEn="Support and Assistance"
        subtitle={t(
          "promptitudine, seriozitate și inovație",
          "promptness, seriousness and innovation"
        )}
        subtitleEn="promptness, seriousness and innovation"
        language={language}
      />

      {/* Straight Talk Section */}
      {/* Am redus padding-ul pe mobil (py-12) și l-am crescut pe desktop (lg:py-24) */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Text Content */}
            {/* Text centrat pe mobil, stânga pe desktop */}
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-6 leading-tight">
                {t(
                  "Discuțiile directe sunt discuții bune de afaceri",
                  "Straight Talk Is Good Business Talk"
                )}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {t(
                  "Suntem atenți la rezultate și la relațiile pe care le construim cu clienții noștri. Oferim consiliere juridică de calitate la un preț accesibil. Echipa noastră este dedicată să vă ajute să vă atingeți obiectivele de afaceri prin servicii juridice complete și personalizate.",
                  "We are attentive to results and the relationships we build with our clients. We offer quality legal advice at an affordable price. Our team is dedicated to helping you achieve your business goals through comprehensive and personalized legal services."
                )}
              </p>
            </div>

            {/* Image Content */}
            {/* Înălțime adaptivă: mică pe mobil (h-64), mare pe desktop (h-[500px]) */}
            <div className="relative h-64 sm:h-80 lg:h-[500px] w-full rounded-lg overflow-hidden shadow-xl order-1 lg:order-2">
              <img
                src={logo}
                alt="Professional consultation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-8 md:py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-center mb-10 md:mb-16">
            {t("Domenii de practică", "Practice Areas")}
          </h2>

          {/* Grilă Responsive:
             - Mobile: 1 coloană
             - Tabletă (sm): 2 coloane
             - Desktop (lg): 3 coloane
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {[
              {
                icon: FileText,
                id: "drept-civil",
                title: t("Drept civil", "Civil Law"),
                description: t(
                  "Asistență juridică completă în domeniul dreptului civil, de la tranzacții imobiliare la moșteniri și contracte complexe.",
                  "Complete legal assistance in civil law, from real estate transactions to inheritances and complex contracts."
                ),
              },
              {
                icon: Building,
                id: "drept-comercial",
                title: t("Drept comercial", "Commercial Law"),
                description: t(
                  "Consiliere juridică în domeniul dreptului comercial, acoperind toate aspectele activității comerciale și fuziuni-achiziții.",
                  "Legal advice in commercial law, covering all aspects of commercial activity and mergers-acquisitions."
                ),
              },
              {
                icon: Gavel,
                id: "litigii",
                title: t("Litigii și arbitraj", "Litigation and Arbitration"),
                description: t(
                  "Reprezentare în litigii complexe în fața instanțelor și tribunalelor arbitrale cu strategii eficiente.",
                  "Representation in complex litigation before courts and arbitral tribunals with efficient strategies."
                ),
              },
              {
                icon: Shield,
                id: "drept-penal",
                title: t("Drept penal", "Criminal Law"),
                description: t(
                  "Asistență juridică specializată în toate fazele procesului penal, de la cercetare până la executare.",
                  "Specialized legal assistance in all phases of criminal proceedings, from investigation to execution."
                ),
              },
              {
                icon: Landmark,
                id: "drept-administrativ",
                title: t("Drept administrativ", "Administrative Law"),
                description: t(
                  "Consiliere în relațiile cu autoritățile publice și reprezentare în contenciosul administrativ.",
                  "Advice in relations with public authorities and representation in administrative litigation."
                ),
              },
              {
                icon: Scale,
                id: "drept-proprietate-intelectuala",
                title: t("Proprietate intelectuală", "Intellectual Property"),
                description: t(
                  "Protecție și apărare a drepturilor de proprietate intelectuală, înregistrare mărci și brevete.",
                  "Protection and defense of intellectual property rights, trademark and patent registration."
                ),
              },
            ].map((area, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/domenii-de-practica/${area.id}`)}
                // Padding adaptiv: p-6 pe mobil, p-8 pe desktop
                className="bg-white border border-gray-200 p-6 md:p-8 hover:shadow-lg hover:border-red-600 transition-all duration-300 cursor-pointer flex flex-col h-full group rounded-sm"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 group-hover:bg-red-700 transition-colors mb-5 md:mb-6 shadow-sm">
                  <area.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="font-serif text-lg md:text-xl font-medium mb-3 md:mb-4 group-hover:text-red-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                  {area.description}
                </p>
                <div className="mt-4 text-red-600 font-medium text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
                  {t("Detalii", "Details")} <span className="ml-1">›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
