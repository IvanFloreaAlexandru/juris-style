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
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const services = [
    {
      icon: Scale,
      title: language === "ro" ? "Drept civil" : "Civil Law",
      description:
        language === "ro"
          ? "Contracte, litigii civile, executări silite, recuperări creanțe"
          : "Contracts, civil litigation, forced executions, debt recovery",
      path: `${basePath}/${language === "ro" ? "drept-civil" : "civil-law"}`,
      image: officeImage1,
    },
    {
      icon: Building,
      title: language === "ro" ? "Drept societar" : "Corporate Law",
      description:
        language === "ro"
          ? "Înființare societăți, guvernanță corporativă, fuziuni și achiziții"
          : "Company formation, corporate governance, mergers and acquisitions",
      path: `${basePath}/${
        language === "ro" ? "drept-societar" : "corporate-law"
      }`,
      image: officeImage3,
    },
    {
      icon: FileText,
      title: language === "ro" ? "Drept fiscal" : "Fiscal Law",
      description:
        language === "ro"
          ? "Consultanță fiscală, planificare fiscală, litigii fiscale"
          : "Tax consultancy, tax planning, tax litigation",
      path: `${basePath}/${language === "ro" ? "drept-fiscal" : "fiscal-law"}`,
      image: officeImage2,
    },
    {
      icon: Gavel,
      title:
        language === "ro"
          ? "Drept penal. Latura civilă"
          : "Criminal Law – Civil Aspect",
      description:
        language === "ro"
          ? "Apărare penală, constituire parte civilă, despăgubiri"
          : "Criminal defense, civil party constitution, compensation",
      path: `${basePath}/${language === "ro" ? "drept-penal" : "criminal-law"}`,
      image: officeImage3,
    },
    {
      icon: Users,
      title: language === "ro" ? "Dreptul muncii" : "Labor Law",
      description:
        language === "ro"
          ? "Contracte de muncă, concedieri, litigii de muncă, discriminare"
          : "Employment contracts, dismissals, labor disputes, discrimination",
      path: `${basePath}/${language === "ro" ? "drept-munca" : "labor-law"}`,
      image: officeImage1,
    },
    {
      icon: Home,
      title:
        language === "ro"
          ? "Fundații și asociații"
          : "Foundations & Associations",
      description:
        language === "ro"
          ? "Înființare ONG-uri, guvernanță, conformitate legală"
          : "NGO formation, governance, legal compliance",
      path: `${basePath}/${
        language === "ro" ? "fundatii-asociatii" : "foundations-associations"
      }`,
      image: officeImage4,
    },
    {
      icon: AlertCircle,
      title: language === "ro" ? "Proceduri speciale" : "Special Procedures",
      description:
        language === "ro"
          ? "Ordonanță de plată, evacuare, ordonanță președințială"
          : "Payment order, eviction, presidential order",
      path: `${basePath}/${
        language === "ro" ? "proceduri-speciale" : "special-procedures"
      }`,
      image: officeImage2,
    },
    {
      icon: HeartPulse,
      title: language === "ro" ? "Malpraxis medical" : "Medical Malpractice",
      description:
        language === "ro"
          ? "Asistență juridică în cazuri de malpraxis medical"
          : "Legal assistance in medical malpractice cases",
      path: `${basePath}/${language === "ro" ? "malpraxis" : "malpractice"}`,
      image: officeImage3,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Skeleton className="w-full h-48 sm:h-64 mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-64 sm:h-72 lg:h-80" />
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
            ? "Oferim asistență juridică complexă în diverse domenii ale dreptului"
            : "We provide comprehensive legal assistance in various areas of law"
        }
        subtitleEn="We provide comprehensive legal assistance in various areas of law"
        language={language}
      />

      {/* Services */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row h-auto sm:h-56 md:h-64 lg:h-72 group"
                onClick={() => navigate(service.path)}
              >
                {/* Image container */}
                <div className="w-full sm:w-2/5 md:w-1/2 overflow-hidden relative h-48 sm:h-full flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content container */}
                <div className="w-full sm:w-3/5 md:w-1/2 flex flex-col">
                  <CardHeader className="flex-1 p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm sm:text-base lg:text-lg font-serif leading-tight line-clamp-2">
                        {service.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12">
            {language === "ro" ? "Cum lucrăm" : "How We Work"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title:
                  language === "ro"
                    ? "Consultație inițială"
                    : "Initial Consultation",
                description:
                  language === "ro"
                    ? "Analizăm cazul dumneavoastră în detaliu"
                    : "We analyze your case in detail",
              },
              {
                step: "02",
                title:
                  language === "ro" ? "Strategie juridică" : "Legal Strategy",
                description:
                  language === "ro"
                    ? "Dezvoltăm un plan de acțiune personalizat"
                    : "We develop a personalized action plan",
              },
              {
                step: "03",
                title: language === "ro" ? "Reprezentare" : "Representation",
                description:
                  language === "ro"
                    ? "Vă reprezentăm în instanță și negocieri"
                    : "We represent you in court and negotiations",
              },
              {
                step: "04",
                title: language === "ro" ? "Soluționare" : "Resolution",
                description:
                  language === "ro"
                    ? "Obținem rezultatul optim pentru dumneavoastră"
                    : "We achieve the optimal result for you",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-serif font-bold text-accent mb-3 sm:mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
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
