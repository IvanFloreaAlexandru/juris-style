import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Scale,
  Home,
  Building,
  FileText,
  Users,
  Gavel,
  AlertCircle,
  HeartPulse,
  ChevronRight, // Am adaugat o sageata discreta pentru a indica actiunea
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

import officeImage1 from "@/assets/office-1.jpeg";
import officeImage2 from "@/assets/office-2.jpeg";
import officeImage3 from "@/assets/office-4.jpg";
import officeImage4 from "@/assets/office-12.jpeg";

export default function DomeniiDePractica() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const basePath =
    language === "ro" ? "/domenii-de-practica" : "/legal-services";

  // Am eliminat proprietatea 'description' conform cerintei
  const services = [
    {
      icon: Scale,
      title: language === "ro" ? "Drept civil" : "Civil Law",
      path: `${basePath}/${language === "ro" ? "drept-civil" : "civil-law"}`,
      image: officeImage1,
    },
    {
      icon: Building,
      title: language === "ro" ? "Drept societar" : "Corporate Law",
      path: `${basePath}/${
        language === "ro" ? "drept-societar" : "corporate-law"
      }`,
      image: officeImage3,
    },
    {
      icon: FileText,
      title: language === "ro" ? "Drept fiscal" : "Fiscal Law",
      path: `${basePath}/${language === "ro" ? "drept-fiscal" : "fiscal-law"}`,
      image: officeImage2,
    },
    {
      icon: Gavel,
      title:
        language === "ro"
          ? "Drept penal. Latura civilă"
          : "Criminal Law – Civil Aspect",
      path: `${basePath}/${language === "ro" ? "drept-penal" : "criminal-law"}`,
      image: officeImage3,
    },
    {
      icon: Users,
      title: language === "ro" ? "Dreptul muncii" : "Labor Law",
      path: `${basePath}/${language === "ro" ? "drept-munca" : "labor-law"}`,
      image: officeImage1,
    },
    {
      icon: Home,
      title:
        language === "ro"
          ? "Fundații și asociații"
          : "Foundations & Associations",
      path: `${basePath}/${
        language === "ro" ? "fundatii-asociatii" : "foundations-associations"
      }`,
      image: officeImage4,
    },
    {
      icon: AlertCircle,
      title: language === "ro" ? "Proceduri speciale" : "Special Procedures",
      path: `${basePath}/${
        language === "ro" ? "proceduri-speciale" : "special-procedures"
      }`,
      image: officeImage2,
    },
    {
      icon: HeartPulse,
      title: language === "ro" ? "Malpraxis medical" : "Medical Malpractice",
      path: `${basePath}/${language === "ro" ? "malpraxis" : "malpractice"}`,
      image: officeImage3,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Skeleton className="w-full h-48 sm:h-64 mb-6 sm:mb-8" />
          {/* Skeleton adaptat pentru carduri mai mici */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-24 sm:h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in text-left">
      {/* Hero Section */}
      <HeroSection
        backgroundImage={officeImage3}
        category={language === "ro" ? "DOMENII DE PRACTICĂ" : "LEGAL SERVICES"}
        categoryEn="LEGAL SERVICES"
        title={language === "ro" ? "Domenii de practică" : "Legal Services"}
        titleEn="Legal Services"
        subtitle={
          language === "ro"
            ? "Soluții juridice specializate pentru nevoile dumneavoastră"
            : "Specialized legal solutions for your needs"
        }
        subtitleEn="Specialized legal solutions for your needs"
        language={language}
      />

      {/* Services Grid */}
      <section className="py-12 sm:py-16 bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-row h-28 sm:h-36 md:h-40 bg-white border-gray-200"
                onClick={() => navigate(service.path)}
              >
                {/* Partea Stângă: Imaginea */}
                {/* Ocupă 35% pe mobil și 40% pe desktop */}
                <div className="w-[35%] sm:w-[40%] relative overflow-hidden h-full flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                {/* Partea Dreaptă: Icon + Titlu */}
                <div className="w-[65%] sm:w-[60%] flex items-center justify-between px-4 sm:px-6 lg:px-8 relative">
                  {/* Wrapper pentru Icon si Titlu */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Icon Container - Cerc roșu */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 group-hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Titlu */}
                    <h3 className="font-serif font-bold text-base sm:text-lg lg:text-xl text-gray-900 leading-tight group-hover:text-red-700 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Săgeată decorativă (opțional, pentru UX) */}
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all hidden sm:block" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 sm:mb-16">
            {language === "ro" ? "Procesul nostru de lucru" : "Our Process"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: language === "ro" ? "Analiză" : "Analysis",
                description:
                  language === "ro"
                    ? "Evaluarea detaliată a situației juridice."
                    : "Detailed evaluation of the legal situation.",
              },
              {
                step: "02",
                title: language === "ro" ? "Strategie" : "Strategy",
                description:
                  language === "ro"
                    ? "Planificarea pașilor și acțiunilor legale."
                    : "Planning legal steps and actions.",
              },
              {
                step: "03",
                title: language === "ro" ? "Acțiune" : "Action",
                description:
                  language === "ro"
                    ? "Implementarea strategiei stabilite."
                    : "Implementation of the agreed strategy.",
              },
              {
                step: "04",
                title: language === "ro" ? "Rezultat" : "Result",
                description:
                  language === "ro"
                    ? "Finalizarea cu succes a mandatului."
                    : "Successful completion of the mandate.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl sm:text-5xl font-serif font-bold text-gray-200 group-hover:text-red-600 transition-colors duration-300 mb-3 sm:mb-4 select-none">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
