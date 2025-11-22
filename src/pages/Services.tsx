import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowRight,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

// Import Imagini
import officeImage1 from "@/assets/office-1.jpeg";
import officeImage2 from "@/assets/office-2.jpeg";
import officeImage3 from "@/assets/office-4.jpg";
import officeImage4 from "@/assets/office-12.jpeg";
import dreptCivil from "@/assets/dreptcivil.jpg";

export default function DomeniiDePractica() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const basePath =
    language === "ro" ? "/domenii-de-practica" : "/legal-services";

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
      title: language === "ro" ? "Drept penal" : "Criminal Law",
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
      title: language === "ro" ? "Fundații și asociații" : "NGOs",
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

  // Configurație Animații
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 container mx-auto px-4">
        <Skeleton className="w-full h-[50vh] mb-12 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 1. HERO SECTION */}
      <HeroSection
        backgroundImage={officeImage3}
        category={language === "ro" ? "EXPERTIZĂ JURIDICĂ" : "LEGAL EXPERTISE"}
        categoryEn="LEGAL EXPERTISE"
        title={language === "ro" ? "Domenii de Practică" : "Practice Areas"}
        titleEn="Practice Areas"
        subtitle={
          language === "ro"
            ? "Soluții juridice specializate, adaptate nevoilor dumneavoastră complexe."
            : "Specialized legal solutions tailored to your complex needs."
        }
        subtitleEn="Specialized legal solutions tailored to your complex needs."
        language={language}
        align="center"
      />

      {/* 2. MAIN SERVICES GRID */}
      <section className="py-20 lg:py-28 px-4 bg-gray-50/50 min-h-[50vh]">
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ro" ? "Serviciile Noastre" : "Our Services"}
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed">
              {language === "ro"
                ? "Acoperim o gamă largă de arii juridice pentru a oferi suport complet clienților noștri."
                : "We cover a wide range of legal areas to provide complete support to our clients."}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                onClick={() => navigate(service.path)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 flex flex-col h-full"
              >
                {/* IMAGINE */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient fin la bază pentru tranziție */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Iconița Plutitoare - Stil "Badge" */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 z-20">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* CONȚINUT (Doar Titlu + Săgeată) */}
                <div className="p-6 flex flex-col flex-grow items-start justify-center bg-white relative">
                  <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-primary transition-colors pr-8">
                    {service.title}
                  </h3>

                  {/* Săgeată discretă care apare la hover */}
                  <div className="mt-4 flex items-center text-sm font-bold text-primary opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="mr-2">
                      {language === "ro" ? "Detalii" : "Details"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </div>

                  {/* Linie decorativă jos */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
