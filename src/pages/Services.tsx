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
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Asigură-te că imaginile sunt importate corect
import officeImage1 from "@/assets/office-1.jpeg";
import officeImage2 from "@/assets/office-2.jpeg";
import officeImage3 from "@/assets/office-4.jpg";
import officeImage4 from "@/assets/office-12.jpeg";

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
      description:
        language === "ro"
          ? "Consultanță și litigii civile complexe, revendicări și partaje."
          : "Consulting and complex civil litigation.",
      path: `${basePath}/${language === "ro" ? "drept-civil" : "civil-law"}`,
      image: officeImage1,
    },
    {
      icon: Building,
      title: language === "ro" ? "Drept societar" : "Corporate Law",
      description:
        language === "ro"
          ? "Înființări companii, fuziuni, achiziții și guvernanță corporativă."
          : "Incorporation, mergers and acquisitions.",
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
          ? "Optimizare fiscală, contencios administrativ și consultanță taxe."
          : "Tax optimization and litigation.",
      path: `${basePath}/${language === "ro" ? "drept-fiscal" : "fiscal-law"}`,
      image: officeImage2,
    },
    {
      icon: Gavel,
      title: language === "ro" ? "Drept penal" : "Criminal Law",
      description:
        language === "ro"
          ? "Asistență și reprezentare în procese penale (White Collar Crime)."
          : "Assistance in criminal proceedings.",
      path: `${basePath}/${language === "ro" ? "drept-penal" : "criminal-law"}`,
      image: officeImage3,
    },
    {
      icon: Users,
      title: language === "ro" ? "Dreptul muncii" : "Labor Law",
      description:
        language === "ro"
          ? "Negocierea contractelor, conflicte de muncă și proceduri disciplinare."
          : "Labor relations and conflicts.",
      path: `${basePath}/${language === "ro" ? "drept-munca" : "labor-law"}`,
      image: officeImage1,
    },
    {
      icon: Home,
      title: language === "ro" ? "Fundații & Asociații" : "NGOs",
      description:
        language === "ro"
          ? "Constituire ONG-uri, modificare acte constitutive și consultanță."
          : "NGO incorporation and consulting.",
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
          ? "Executări silite, proceduri de insolvență și recuperare creanțe."
          : "Enforcement and insolvency.",
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
          ? "Apărarea drepturilor pacienților și medicilor în cazuri de culpă medicală."
          : "Defending patients' rights.",
      path: `${basePath}/${language === "ro" ? "malpraxis" : "malpractice"}`,
      image: officeImage3,
    },
  ];

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
        category={language === "ro" ? "Expertiză Juridică" : "Legal Expertise"}
        categoryEn="Expertise"
        title={language === "ro" ? "Domenii de Practică" : "Practice Areas"}
        titleEn="Practice Areas"
        subtitle={
          language === "ro"
            ? "Excelență juridică în fiecare arie de specialitate."
            : "Legal excellence in every area of expertise."
        }
        subtitleEn="Legal excellence in every area of expertise."
        language={language}
      />

      {/* 2. MAIN GRID SECTION (Alb / Gri deschis) */}
      <section className="py-20 lg:py-24 px-4 bg-gray-50/50 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "ro" ? "Serviciile Noastre" : "Our Services"}
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed">
              {language === "ro"
                ? "Oferim asistență juridică completă, adaptată nevoilor complexe ale clienților noștri, fie că sunt persoane fizice sau corporații."
                : "We offer complete legal assistance, tailored to the complex needs of our clients, whether individuals or corporations."}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                onClick={() => navigate(service.path)}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 flex flex-col h-full"
              >
                {/* Imagine */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Icon */}
                  <div className="absolute bottom-4 left-4 z-20 bg-white p-3 rounded-lg shadow-md group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Continut */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center text-sm font-bold text-primary uppercase tracking-wider">
                    <span className="mr-2">
                      {language === "ro" ? "Vezi detalii" : "Learn More"}
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                {/* Linie decorativă jos */}
                <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PROCESS SECTION (RED THEME) - MODIFICAT AICI */}
      <section className="py-20 lg:py-28 bg-primary text-white relative overflow-hidden">
        {/* Background Pattern Subtil pentru adâncime */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Coloana Stânga: Text Intro */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase mb-6">
                  {language === "ro" ? "Metodologie" : "Methodology"}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                  {language === "ro" ? "Abordarea Noastră" : "Our Approach"}
                </h2>
                <p className="text-red-50 text-lg mb-8 leading-relaxed max-w-lg">
                  {language === "ro"
                    ? "Procesul nostru este structurat pentru a oferi claritate, transparență și rezultate măsurabile. Transformăm complexitatea juridică în pași concreți."
                    : "Our process is structured to provide clarity, transparency, and measurable results. We turn legal complexity into concrete steps."}
                </p>

                {/* Buton Alb pe fundal Roșu */}
              </motion.div>
            </div>

            {/* Coloana Dreapta: Timeline Vertical */}
            <div className="relative pl-4 lg:pl-10">
              {/* Linie verticală albă transparentă */}
              <div className="absolute left-[27px] lg:left-[51px] top-4 bottom-8 w-0.5 bg-gradient-to-b from-white via-white/40 to-transparent opacity-50" />

              <div className="space-y-10">
                {[
                  {
                    step: "01",
                    title:
                      language === "ro"
                        ? "Evaluare & Analiză"
                        : "Evaluation & Analysis",
                    desc:
                      language === "ro"
                        ? "Analizăm dosarul în detaliu pentru a identifica riscurile și oportunitățile strategice."
                        : "We analyze the case in detail to identify strategic risks and opportunities.",
                  },
                  {
                    step: "02",
                    title:
                      language === "ro"
                        ? "Strategie Personalizată"
                        : "Tailored Strategy",
                    desc:
                      language === "ro"
                        ? "Dezvoltăm un plan de acțiune optimizat, specific speței tale."
                        : "We develop an optimized action plan, specific to your case.",
                  },
                  {
                    step: "03",
                    title:
                      language === "ro" ? "Implementare" : "Implementation",
                    desc:
                      language === "ro"
                        ? "Reprezentare în instanță sau negocieri cu maxim profesionalism."
                        : "Representation in court or negotiations with maximum professionalism.",
                  },
                  {
                    step: "04",
                    title: language === "ro" ? "Rezultat" : "Result",
                    desc:
                      language === "ro"
                        ? "Finalizarea mandatului și asigurarea punerii în executare a soluției."
                        : "Finalization of the mandate and ensuring the execution of the solution.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-6 relative group"
                  >
                    {/* Cerc Număr - Alb cu text Roșu (Inversat) */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-4 border-primary flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="font-serif font-bold text-xl text-primary">
                        {item.step}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        {item.title}
                      </h3>
                      <p className="text-red-100 text-sm md:text-base max-w-md leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION (Final alb curat) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-10 md:p-16 text-center border border-gray-100 shadow-sm relative overflow-hidden">
            {/* Decorativ */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12" />

            <div className="relative z-10">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === "ro"
                  ? "Ai nevoie de asistență juridică?"
                  : "Need Legal Assistance?"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                {language === "ro"
                  ? "Nu lăsa problemele juridice să se agraveze. Contactează-ne pentru o evaluare inițială a cazului tău."
                  : "Don't let legal issues escalate. Contact us for an initial assessment of your case."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/contact")}
                  size="lg"
                  className="bg-primary text-white hover:bg-red-700 shadow-lg hover:shadow-xl transition-all px-8"
                >
                  {language === "ro" ? "Contactează-ne" : "Contact Us"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/avocati")}
                  className="border-primary text-primary hover:bg-primary/5 px-8"
                >
                  {language === "ro" ? "Echipa Noastră" : "Our Team"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
