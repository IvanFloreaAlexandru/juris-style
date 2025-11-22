import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";

// Imagine fundal Hero
import officeImage from "@/assets/office-4.jpg";

export default function Lawyers() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const lawyers = [
    {
      name: "Dr. Ion Popescu",
      title: t("Avocat Asociat Senior", "Senior Associate Lawyer"),
      specialty: t("Drept Civil și Comercial", "Civil and Commercial Law"),
      email: "ion.popescu@cabinetavocat.ro",
      phone: "+40 21 123 4567",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop",
    },
    {
      name: "Av. Maria Ionescu",
      title: t("Avocat Partener", "Partner Lawyer"),
      specialty: t("Drept Penal", "Criminal Law"),
      email: "maria.ionescu@cabinetavocat.ro",
      phone: "+40 21 123 4568",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
    },
    {
      name: "Av. Alexandru Dumitrescu",
      title: t("Avocat", "Lawyer"),
      specialty: t("Dreptul Familiei", "Family Law"),
      email: "alexandru.dumitrescu@cabinetavocat.ro",
      phone: "+40 21 123 4569",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=800&h=1000&fit=crop",
    },
    {
      name: "Av. Elena Constantinescu",
      title: t("Avocat", "Lawyer"),
      specialty: t("Dreptul Muncii", "Labor Law"),
      email: "elena.constantinescu@cabinetavocat.ro",
      phone: "+40 21 123 4570",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
    },
  ];

  // Variante animație simplă
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 container mx-auto px-4">
        <Skeleton className="h-64 w-full mb-12 rounded-xl" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[400px] rounded-xl" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans">
      {/* HERO SECTION - Păstrăm doar Hero-ul pentru impact vizual la intrare */}
      <HeroSection
        backgroundImage={officeImage}
        category={t("ECHIPA NOASTRĂ", "OUR TEAM")}
        categoryEn="OUR TEAM"
        title={t("Avocații noștri", "Our Lawyers")}
        titleEn="Our Lawyers"
        subtitle={t(
          "Profesioniști dedicați, uniți de pasiunea pentru excelență juridică.",
          "Dedicated professionals, united by a passion for legal excellence."
        )}
        subtitleEn="Dedicated professionals, united by a passion for legal excellence."
        language={language}
        align="center"
        height="h-[45vh] min-h-[400px]"
      />

      {/* LAWYERS GRID - SIMPLU ȘI CURAT */}
      <section className="py-20 px-4 bg-gray-50/30">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {lawyers.map((lawyer, idx) => (
              <motion.div key={idx} variants={cardVariants} className="h-full">
                {/* Card Simplificat */}
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                  {/* Imagine - Curată, fără overlay-uri complicate */}
                  <div className="relative h-[320px] overflow-hidden bg-gray-100 border-b border-gray-50">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Conținut */}
                  <div className="p-6 flex flex-col flex-grow text-center">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                      {lawyer.name}
                    </h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                      {lawyer.title}
                    </p>

                    {/* Specializare */}
                    <div className="mb-6">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal px-3 py-1"
                      >
                        {lawyer.specialty}
                      </Badge>
                    </div>

                    {/* Linie separatoare subtilă */}
                    <div className="w-full h-px bg-gray-100 mb-6" />

                    {/* Date Contact - Simple și Vizibile */}
                    <div className="mt-auto space-y-3 text-sm">
                      <a
                        href={`mailto:${lawyer.email}`}
                        className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary transition-colors w-full p-2 rounded-md hover:bg-gray-50"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="truncate max-w-[200px]">
                          {lawyer.email}
                        </span>
                      </a>
                      <a
                        href={`tel:${lawyer.phone}`}
                        className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary transition-colors w-full p-2 rounded-md hover:bg-gray-50"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{lawyer.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
