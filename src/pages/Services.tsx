import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Scale, Home, Building } from "lucide-react";
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
      title: t("Drept civil", "Civil Law"),
      description: t(
        "Contracte, litigii civile, executări silite, recuperări creanțe",
        "Contracts, civil litigation, forced executions, debt recovery"
      ),
      path: `${basePath}/${language === "ro" ? "drept-civil" : "civil-law"}`,
      image: officeImage1,
    },
    {
      icon: Home,
      title: t("Drept societar", "Corporate Law"),
      description: t(
        "Tranzacții imobiliare, verificări juridice, asistență notarială",
        "Real estate transactions, legal checks, notarial assistance"
      ),
      path: `${basePath}/${
        language === "ro" ? "drept-societar" : "corporate-law"
      }`,
      image: officeImage3,
    },
    {
      icon: Building,
      title: t("Drept fiscal", "Fiscal Law"),
      description: t(
        "Asistență fiscală și consultanță în impozite",
        "Fiscal assistance and tax consultancy"
      ),
      path: `${basePath}/${language === "ro" ? "drept-fiscal" : "fiscal-law"}`,
      image: officeImage2,
    },
    {
      icon: Building,
      title: t(
        "Drept penal. Latura civilă a dreptului penal",
        "Criminal Law – Civil Aspect"
      ),
      description: t(
        "Apărare penală cu implicații civile",
        "Criminal defense with civil implications"
      ),
      path: `${basePath}/${language === "ro" ? "drept-penal" : "criminal-law"}`,
      image: officeImage3,
    },
    {
      icon: Building,
      title: t("Dreptul muncii", "Labor Law"),
      description: t(
        "Contracte de muncă, concedieri, discriminare, hărțuire",
        "Employment contracts, dismissals, discrimination, harassment"
      ),
      path: `${basePath}/${language === "ro" ? "drept-munca" : "labor-law"}`,
      image: officeImage3,
    },
    {
      icon: Building,
      title: t("Fundații și asociații", "Foundations & Associations"),
      description: t(
        "Consultanță juridică pentru organizații non-profit",
        "Legal consultancy for non-profit organizations"
      ),
      path: `${basePath}/${
        language === "ro" ? "fundatii-asociatii" : "foundations-associations"
      }`,
      image: officeImage1,
    },
    {
      icon: Building,
      title: t(
        "Proceduri speciale. Ordonanța de plată. Procedura de evacuare. Ordonanța președințială",
        "Special Procedures: Payment Order, Eviction, Presidential Order"
      ),
      description: t(
        "Proceduri speciale pentru recuperarea creanțelor și evacuări",
        "Special procedures for debt recovery and evictions"
      ),
      path: `${basePath}/${
        language === "ro" ? "proceduri-speciale" : "special-procedures"
      }`,
      image: officeImage4,
    },
    {
      icon: Building,
      title: t("Malpraxis", "Medical Malpractice"),
      description: t(
        "Asistență juridică în cazuri de malpraxis",
        "Legal assistance in malpractice cases"
      ),
      path: `${basePath}/${language === "ro" ? "malpraxis" : "malpractice"}`,
      image: officeImage2,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="w-full h-64 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 animate-fade-in">
      {/* Header */}
      <section className="relative py-16 min-h-[20vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={officeImage3}
            alt="Professional Office"
            className="w-full h-full object-cover brightness-75"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-serif text-5xl font-bold mb-4 text-white">
            {t("Domenii de practică", "Legal Services")}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t(
              "Oferim asistență juridică complexă în diverse domenii ale dreptului",
              "We provide comprehensive legal assistance in various areas of law"
            )}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="w-[80%] mx-auto px-4">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col sm:flex-row h-64 group"
                onClick={() => navigate(service.path)}
              >
                {/* Image container - left half */}
                <div className="sm:w-1/2 overflow-hidden relative h-48 sm:h-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content container - right half */}
                <div className="sm:w-1/2 flex flex-col">
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <service.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-serif leading-tight line-clamp-2">
                        {service.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
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
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-center mb-12">
            {t("Cum lucrăm", "How We Work")}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t("Consultație inițială", "Initial Consultation"),
                description: t(
                  "Analizăm cazul dumneavoastră",
                  "We analyze your case"
                ),
              },
              {
                step: "02",
                title: t("Strategie juridică", "Legal Strategy"),
                description: t(
                  "Dezvoltăm un plan de acțiune",
                  "We develop an action plan"
                ),
              },
              {
                step: "03",
                title: t("Reprezentare", "Representation"),
                description: t(
                  "Vă reprezentăm în instanță",
                  "We represent you in court"
                ),
              },
              {
                step: "04",
                title: t("Soluționare", "Resolution"),
                description: t(
                  "Obținem rezultatul dorit",
                  "We achieve the desired result"
                ),
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-serif font-bold text-accent mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
