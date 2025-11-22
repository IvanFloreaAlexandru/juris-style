import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";

// Imaginea office pentru Hero
import officeImage from "@/assets/office-2.jpeg";

export default function Contact() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logica de trimitere...
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 container mx-auto px-4">
        <Skeleton className="h-64 w-full mb-12 rounded-xl" />
        <div className="grid lg:grid-cols-2 gap-8">
          <Skeleton className="h-[500px] rounded-xl" />
          <Skeleton className="h-[500px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white animate-fade-in font-sans">
      {/* 1. HERO SECTION */}
      <HeroSection
        backgroundImage={officeImage}
        category={t("CONTACTAȚI-NE", "CONTACT US")}
        categoryEn="CONTACT US"
        title={t("Suntem aici pentru tine", "We are here for you")}
        titleEn="We are here for you"
        subtitle={t(
          "Programează o consultație sau vizitează-ne la sediul nostru.",
          "Schedule a consultation or visit us at our headquarters."
        )}
        subtitleEn="Schedule a consultation or visit us at our headquarters."
        language={language}
        align="center"
      />

      {/* 2. MAIN CONTACT SECTION */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          {/* Container Principal Formular + Info */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-6xl mx-auto flex flex-col lg:flex-row mb-24">
            {/* PARTEA STÂNGĂ: FORMULAR (ALB) */}
            <div className="w-full lg:w-3/5 p-8 lg:p-16 bg-white order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-8">
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {t("Trimite-ne un mesaj", "Send Us a Message")}
                  </h2>
                  <div className="h-1.5 w-24 bg-primary rounded-full mb-4" />
                  <p className="text-gray-600 text-lg">
                    {t(
                      "Completează formularul și te vom contacta pentru a stabili o întâlnire.",
                      "Fill out the form and we will contact you to set up a meeting."
                    )}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        {t("Nume", "Name")}
                      </label>
                      <Input
                        placeholder="Ion Popescu"
                        required
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        {t("Email", "Email")}
                      </label>
                      <Input
                        type="email"
                        placeholder="email@exemplu.ro"
                        required
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        {t("Telefon", "Phone")}
                      </label>
                      <Input
                        type="tel"
                        placeholder="+40 7xx xxx xxx"
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                        {t("Subiect", "Subject")}
                      </label>
                      <Input
                        placeholder={t(
                          "Motivul contactului",
                          "Reason for contact"
                        )}
                        required
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">
                      {t("Mesaj", "Message")}
                    </label>
                    <Textarea
                      placeholder={t(
                        "Descrieți pe scurt situația juridică...",
                        "Briefly describe the legal situation..."
                      )}
                      rows={5}
                      required
                      className="bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-primary/20 transition-all resize-none p-4 rounded-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-red-700 text-white px-10 h-14 text-lg font-semibold shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all rounded-xl mt-2"
                  >
                    {t("Trimite Solicitarea", "Send Request")}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* PARTEA DREAPTĂ: INFO PANEL (ROȘU) */}
            <div className="w-full lg:w-2/5 bg-primary text-white p-8 lg:p-16 relative overflow-hidden flex flex-col justify-between order-1 lg:order-2">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay" />
              <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-[-50%] left-[-50%] w-[100%] h-[100%] bg-black/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-10 text-white">
                  {t("Informații Contact", "Contact Information")}
                </h3>

                <div className="space-y-10">
                  {/* ADRESA */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">
                        {t("Locație", "Location")}
                      </h4>
                      <p className="text-lg leading-relaxed text-white font-medium">
                        Pictor Barbu Iscovescu 40,
                        <br />
                        Et. 1, Ap. 2, Sector 1,
                        <br />
                        București
                      </p>
                    </div>
                  </div>

                  {/* TELEFON */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-lg">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">
                        {t("Telefon", "Phone")}
                      </h4>
                      <a
                        href="tel:+40723360063"
                        className="text-xl text-white hover:underline decoration-2 underline-offset-4 transition-all font-bold block"
                      >
                        +40 723 360 063
                      </a>
                      <div className="flex items-center gap-2 mt-2 text-white/80 text-sm bg-white/10 px-3 py-1 rounded-full w-fit">
                        <Clock className="h-3 w-3" />
                        <span>09:00 - 18:00</span>
                      </div>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-lg">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">
                        Email
                      </h4>
                      <a
                        href="mailto:office@frunza-asociatii.ro"
                        className="text-lg text-white hover:underline decoration-2 underline-offset-4 transition-all font-medium break-all"
                      >
                        office@frunza-asociatii.ro
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
                <p className="text-sm text-white/90 leading-relaxed font-light italic">
                  "
                  {t(
                    "Avocatura este o artă a cuvântului pusă în slujba adevărului.",
                    "Law is the art of words in the service of truth."
                  )}
                  "
                </p>
              </div>
            </div>
          </div>

          {/* 3. MAP SECTION - STILIZATĂ CA UN "WIDGET" MARE */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                {t("Unde ne găsiți", "Where to find us")}
              </h3>
              <p className="text-gray-500 mt-2">
                {t(
                  "Acces facil în inima cartierului Dorobanți",
                  "Easy access in the heart of Dorobanți district"
                )}
              </p>
            </div>

            {/* Harta în container rotunjit și umbrit, nu full-width */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.738104706734!2d26.091927776639037!3d44.41516497107234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff5219e2cd7b%3A0xe2cd88b231b0a448!2sStrada%20Pictor%20Barbu%20Iscovescu%2040%2C%20Bucure%C8%99ti%20011577!5e0!3m2!1sen!2sro!4v1731618710000!5m2!1sen!2sro"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>

              {/* Pin Overlay - Jos Dreapta */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 max-w-xs">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-primary rounded-lg text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      Sediul Central
                    </p>
                    <p className="text-xs text-gray-500">Deschis acum</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-3 text-xs h-8 border-primary text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <a
                    href="https://www.google.com/maps/dir//Strada+Pictor+Barbu+Iscovescu+40,+București+011577"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("Navighează", "Navigate")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
