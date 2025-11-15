import { useState, useEffect } from "react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function Lawyers() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const lawyers = [
    {
      name: 'Dr. Ion Popescu',
      title: t('Avocat asociat senior', 'Senior Associate Lawyer'),
      specialty: t('Drept civil și comercial', 'Civil and Commercial Law'),
      email: 'ion.popescu@cabinetavocat.ro',
      phone: '+40 21 123 4567',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
    },
    {
      name: 'Av. Maria Ionescu',
      title: t('Avocat', 'Lawyer'),
      specialty: t('Drept penal', 'Criminal Law'),
      email: 'maria.ionescu@cabinetavocat.ro',
      phone: '+40 21 123 4568',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
    },
    {
      name: 'Av. Alexandru Dumitrescu',
      title: t('Avocat', 'Lawyer'),
      specialty: t('Drept familiei', 'Family Law'),
      email: 'alexandru.dumitrescu@cabinetavocat.ro',
      phone: '+40 21 123 4569',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=400&h=500&fit=crop',
    },
    {
      name: 'Av. Elena Constantinescu',
      title: t('Avocat', 'Lawyer'),
      specialty: t('Dreptul muncii', 'Labor Law'),
      email: 'elena.constantinescu@cabinetavocat.ro',
      phone: '+40 21 123 4570',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 animate-fade-in">
      {/* Header */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4">
            {t('Avocații noștri', 'Our Lawyers')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              'Echipă de profesioniști cu experiență vastă în domeniul juridic',
              'Team of professionals with vast experience in the legal field'
            )}
          </p>
        </div>
      </section>

      {/* Lawyers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lawyers.map((lawyer, idx) => (
              <div key={idx} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-1">{lawyer.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{lawyer.title}</p>
                  <p className="text-muted-foreground text-sm mb-4">{lawyer.specialty}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{lawyer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{lawyer.phone}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    {t('Solicită consultație', 'Request Consultation')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
