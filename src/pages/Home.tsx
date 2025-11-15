import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scale, Shield, Users, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import heroImage from '@/assets/hero-bg.png';

export default function Home() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="w-full h-screen" />
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            {t('Apărăm dreptatea, protejăm interesele tale', 'Defending Justice, Protecting Your Interests')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/90">
            {t(
              'Expertiză juridică de încredere pentru soluționarea problemelor dvs. legale',
              'Trusted legal expertise for solving your legal problems'
            )}
          </p>
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
            onClick={() => navigate(language === 'ro' ? '/despre' : '/about')}
          >
            {t('Descoperă mai mult', 'Learn More')}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-center mb-12">
            {t('De ce să ne alegi?', 'Why Choose Us?')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Scale,
                title: t('Experiență vastă', 'Vast Experience'),
                description: t(
                  'Peste 20 de ani în domeniul juridic',
                  'Over 20 years in the legal field'
                ),
              },
              {
                icon: Shield,
                title: t('Protecție totală', 'Total Protection'),
                description: t(
                  'Apărăm interesele clienților noștri cu dedicare',
                  'We defend our clients\' interests with dedication'
                ),
              },
              {
                icon: Users,
                title: t('Echipă de elită', 'Elite Team'),
                description: t(
                  'Avocați specializați în diverse domenii',
                  'Lawyers specialized in various fields'
                ),
              },
              {
                icon: Award,
                title: t('Rezultate dovedite', 'Proven Results'),
                description: t(
                  'Cazuri câștigate și clienți mulțumiți',
                  'Won cases and satisfied clients'
                ),
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            {t('Ai nevoie de asistență juridică?', 'Need Legal Assistance?')}
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            {t(
              'Contactează-ne astăzi pentru o consultație gratuită',
              'Contact us today for a free consultation'
            )}
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="gap-2"
            onClick={() => navigate('/contact')}
          >
            {t('Contactează-ne', 'Contact Us')}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
