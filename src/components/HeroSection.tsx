import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface HeroSectionProps {
  backgroundImage: string;
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  language: "ro" | "en";
  align?: "left" | "center";
  height?: string;
}

const HeroSection = ({
  backgroundImage,
  category,
  categoryEn,
  title,
  titleEn,
  subtitle,
  subtitleEn,
  language,
  align = "left",
  // Am mărit puțin min-h la 400px pentru a lăsa textul să respire pe mobil
  height = "h-[40vh] min-h-[400px]",
}: HeroSectionProps) => {
  const { t } = useLanguage();

  const isCentered = align === "center";

  const alignmentClasses = isCentered
    ? "items-center text-center mx-auto"
    : "items-start text-left";

  return (
    <section className={`relative w-full ${height} overflow-hidden font-sans`}>
      {/* Imaginea de fundal */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay-uri */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Container Principal */}
      {/* MODIFICARE AICI: Am adăugat 'pt-16 md:pt-20' */}
      {/* Asta împinge conținutul în jos cu înălțimea meniului, centrându-l vizual corect */}
      <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-center pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex flex-col ${alignmentClasses} max-w-4xl w-full`}
        >
          {/* Categorie */}
          <div
            className={`inline-flex items-center gap-2 mb-3 md:mb-4 ${
              isCentered ? "" : "pl-1"
            }`}
          >
            <span className="h-px w-6 md:w-8 bg-red-600"></span>
            <span className="text-red-500 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
              {language === "ro" ? category : categoryEn}
            </span>
            {isCentered && <span className="h-px w-6 md:w-8 bg-red-600"></span>}
          </div>

          {/* Titlu Principal */}
          <h1 className="text-white font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight drop-shadow-lg">
            {language === "ro" ? title : titleEn}
          </h1>

          {/* Subtitlu */}
          <p className="text-gray-200 text-base md:text-lg font-light max-w-2xl leading-relaxed drop-shadow-md">
            {language === "ro" ? subtitle : subtitleEn}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
