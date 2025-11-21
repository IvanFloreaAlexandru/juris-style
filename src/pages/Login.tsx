import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Importăm o imagine office pentru fundal (folosim una existentă)
import officeImage from "@/assets/office-4.jpg";
import logo from "@/assets/logo.png";

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect dacă e deja logat
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/articles", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulare delay pentru efect vizual
    await new Promise((r) => setTimeout(r, 800));

    const success = await login(email, password);

    if (success) {
      toast({
        title: t("Bun venit!", "Welcome back!"),
        description: t("Autentificare reușită.", "Login successful."),
        className: "bg-green-50 border-green-200",
      });
      navigate("/admin/articles");
    } else {
      toast({
        title: t("Eroare de autentificare", "Authentication Error"),
        description: t(
          "Email sau parolă incorectă",
          "Invalid email or password"
        ),
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    // Folosim 'fixed inset-0 z-[100]' pentru a acoperi complet Navbar-ul și Footer-ul site-ului
    // Acest lucru transformă pagina într-un portal dedicat
    <div className="fixed inset-0 z-[100] w-full h-full flex font-sans bg-white overflow-hidden">
      {/* --- PARTEA STÂNGĂ: BRANDING (Vizibilă doar pe Desktop) --- */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-gray-900 items-center justify-center overflow-hidden">
        {/* Imagine Fundal */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 transform scale-105"
          style={{ backgroundImage: `url(${officeImage})` }}
        />
        {/* Overlay Gradient Roșu-Închis pentru efect dramatic */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-red-900/90 to-black/90 mix-blend-multiply" />

        {/* Conținut Branding */}
        <div className="relative z-10 max-w-lg text-center px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-28 w-auto mx-auto mb-10 brightness-0 invert opacity-95"
            />
            <h2 className="text-4xl font-serif font-bold text-white mb-6 tracking-tight">
              Portal Administrativ
            </h2>
            <p className="text-red-100/90 text-lg leading-relaxed mb-10 font-light">
              {t(
                "Platformă securizată pentru gestionarea conținutului juridic și a resurselor firmei Frunză & Asociații.",
                "Secure platform for managing legal content and resources for Frunză & Asociații firm."
              )}
            </p>

            {/* Badge de securitate */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-sm">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              <span className="tracking-wide uppercase text-xs font-bold">
                Secure Environment
              </span>
            </div>
          </motion.div>
        </div>

        {/* Elemente decorative fundal */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
      </div>

      {/* --- PARTEA DREAPTĂ: FORMULARUL --- */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-8 lg:p-24 bg-white relative shadow-2xl">
        {/* Buton "Înapoi la site" */}
        <Link
          to="/"
          className="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-primary/10 transition-colors">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          {t("Înapoi la site", "Back to website")}
        </Link>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-10"
        >
          {/* Header Formular */}
          <div className="text-center lg:text-left">
            {/* Logo vizibil doar pe mobil */}
            <div className="lg:hidden flex justify-center mb-8">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 tracking-tight mb-3">
              {t("Autentificare", "Sign In")}
            </h1>
            <p className="text-gray-500 text-sm lg:text-base">
              {t(
                "Introduceți credențialele pentru a accesa panoul.",
                "Enter your credentials to access the dashboard."
              )}
            </p>
          </div>

          {/* Formular */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {/* Input Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">
                  {t("Email", "Email")}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    type="email"
                    placeholder="nume@frunza-asociatii.ro"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-14 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-gray-700">
                    {t("Parolă", "Password")}
                  </label>
                  <a
                    href="#"
                    className="text-xs font-medium text-primary hover:text-red-700 transition-colors"
                  >
                    {t("Ai uitat parola?", "Forgot password?")}
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 h-14 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-primary hover:bg-red-700 text-white text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 rounded-xl flex items-center justify-center gap-3 group"
              disabled={loading}
            >
              {loading ? (
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {t("Accesează Contul", "Access Account")}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {/* Demo Hint */}
            <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
              <p className="text-xs text-blue-600/80 font-medium">
                Demo Admin:{" "}
                <span className="font-bold text-blue-700">admin@site.com</span>{" "}
                / <span className="font-bold text-blue-700">admin123</span>
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="pt-4 text-center">
            <p className="text-xs text-gray-400 font-medium">
              © {new Date().getFullYear()} Frunză & Asociații.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
