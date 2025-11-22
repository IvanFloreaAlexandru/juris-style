import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import {
  Shield,
  Users,
  Target,
  Clock,
  Award,
  CheckCircle2,
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Scale,
  Building,
  FileText,
  Gavel,
  Home,
  AlertCircle,
  HeartPulse,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Importuri Imagini
import officeImage1 from "@/assets/office-1.jpeg";
import officeImage2 from "@/assets/office-2.jpeg";
import officeImage3 from "@/assets/office-4.jpg";
import officeImage4 from "@/assets/office-12.jpeg";

export default function About() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // --- LOGICĂ CARUSEL ---
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const galleryImages = [
    {
      src: officeImage3,
      title: language === "ro" ? "Sala de Consiliu" : "Board Room",
      desc:
        language === "ro"
          ? "Locul unde strategiile prind viață."
          : "Where strategies come to life.",
    },
    {
      src: officeImage1,
      title: language === "ro" ? "Recepție" : "Reception Area",
      desc:
        language === "ro"
          ? "Primire profesionistă și caldă."
          : "Professional and warm welcome.",
    },
    {
      src: officeImage2,
      title: language === "ro" ? "Birouri Private" : "Private Offices",
      desc:
        language === "ro"
          ? "Spațiu dedicat concentrării."
          : "Dedicated space for focus.",
    },
    {
      src: officeImage4,
      title: language === "ro" ? "Biblioteca Juridică" : "Legal Library",
      desc:
        language === "ro"
          ? "Resurse complete pentru cazuri complexe."
          : "Complete resources for complex cases.",
    },
  ];

  // Auto-play Carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [galleryImages.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );

  // --- DATE DOMENII DE PRACTICĂ ---
  const practiceAreas = [
    {
      icon: Scale,
      title: language === "ro" ? "Drept Civil" : "Civil Law",
      id: "drept-civil",
    },
    {
      icon: Building,
      title: language === "ro" ? "Drept Societar" : "Corporate Law",
      id: "drept-societar",
    },
    {
      icon: FileText,
      title: language === "ro" ? "Drept Fiscal" : "Fiscal Law",
      id: "drept-fiscal",
    },
    {
      icon: Gavel,
      title:
        language === "ro"
          ? "Drept penal. Latura civilă a dreptului penal"
          : "Criminal Law. The Civil Side of Criminal Law",
      id: "drept-penal",
    },
    {
      icon: Users,
      title: language === "ro" ? "Dreptul Muncii" : "Labor Law",
      id: "drept-munca",
    },
    {
      icon: Home,
      title: language === "ro" ? "Imobiliare & ONG" : "Real Estate & NGOs",
      id: "fundatii-asociatii",
    },
    {
      icon: AlertCircle,
      title: language === "ro" ? "Insolvență" : "Insolvency",
      id: "proceduri-speciale",
    },
    {
      icon: HeartPulse,
      title: language === "ro" ? "Malpraxis" : "Malpractice",
      id: "malpraxis",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 container mx-auto px-4">
        <Skeleton className="w-full h-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* 1. HERO SECTION - MODIFICAT AICI (align="center") */}
      <HeroSection
        backgroundImage={officeImage3}
        category={t("CINE SUNTEM", "WHO WE ARE")}
        categoryEn="WHO WE ARE"
        title={t("Excelență prin integritate", "Excellence through Integrity")}
        titleEn="Excellence through Integrity"
        subtitle={t(
          "Partenerul juridic strategic pentru afacerea și familia ta.",
          "The strategic legal partner for your business and family."
        )}
        subtitleEn="The strategic legal partner for your business and family."
        language={language}
        align="center" // <--- ACEASTA ESTE MODIFICAREA PENTRU CENTRARE
      />

      {/* 2. INTRO & STORY SECTION (Carousel Left, Text Right) */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* CARUSEL */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1 h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-gray-100"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <img
                    src={galleryImages[currentSlide].src}
                    alt={galleryImages[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8 text-white z-20">
                    <h3 className="text-2xl font-serif font-bold mb-2 text-white drop-shadow-md">
                      {galleryImages[currentSlide].title}
                    </h3>
                    <p className="text-gray-200 text-sm md:text-base drop-shadow-sm">
                      {galleryImages[currentSlide].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* Nav Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-primary backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-30"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-primary backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-30"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </motion.div>

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest text-xs uppercase">
                  {t("Povestea Noastră", "Our Story")}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t(
                  "Mai mult decât avocați. Suntem parteneri strategici.",
                  "More than lawyers. We are strategic partners."
                )}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {t(
                  "La Frunză & Asociații, transformăm provocările legale în oportunități. Abordarea noastră combină rigoarea academică cu pragmatismul de business.",
                  "At Frunză & Asociații, we turn legal challenges into opportunities. Our approach combines academic rigor with business pragmatism."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/contact")}
                  className="bg-primary hover:bg-red-700 text-white h-12 px-8"
                >
                  {t("Contactează-ne", "Get in Touch")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/avocati")}
                  className="border-gray-300 text-gray-700 hover:text-primary h-12 px-8"
                >
                  {t("Echipa Noastră", "Our Team")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION (Red Bar) */}
      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            {[
              {
                number: "15+",
                label: t("Ani de Experiență", "Years Experience"),
                icon: Clock,
              },
              {
                number: "500+",
                label: t("Cazuri Reușite", "Successful Cases"),
                icon: CheckCircle2,
              },
              {
                number: "24/7",
                label: t("Suport Strategic", "Strategic Support"),
                icon: Target,
              },
              {
                number: "100%",
                label: t("Confidențialitate", "Confidentiality"),
                icon: Shield,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="px-4"
              >
                <stat.icon className="h-6 w-6 mx-auto mb-3 text-red-200 opacity-80" />
                <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-red-100 opacity-80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPERTISE / PRACTICE AREAS */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {t("Arii de Expertiză", "Areas of Expertise")}
              </h2>
              <div className="h-1 w-20 bg-primary mb-6" />
              <p className="text-gray-600 text-lg">
                {t(
                  "Oferim o gamă completă de servicii juridice, acoperind cele mai complexe ramuri ale dreptului.",
                  "We offer a full range of legal services, covering the most complex branches of law."
                )}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/domenii-de-practica")}
              className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-white"
            >
              {t("Vezi toate serviciile", "View All Services")}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Grid Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {practiceAreas.map((area, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate(`/domenii-de-practica/${area.id}`)}
                className="group bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <area.icon className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-serif font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/domenii-de-practica")}
              className="w-full border-primary text-primary"
            >
              {t("Vezi toate serviciile", "View All Services")}
            </Button>
          </div>
        </div>
      </section>

      {/* 5. VALUES SECTION */}

      {/* 6. CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-2xl p-10 md:p-16 text-center border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12" />
            <div className="relative z-10">
              <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-6 opacity-80" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === "ro"
                  ? "Ai nevoie de asistență juridică?"
                  : "Need Legal Assistance?"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                {language === "ro"
                  ? "Contactează-ne pentru o evaluare inițială a cazului tău."
                  : "Contact us for an initial assessment of your case."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/contact")}
                  size="lg"
                  className="bg-primary text-white hover:bg-red-700 shadow-lg px-8"
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
