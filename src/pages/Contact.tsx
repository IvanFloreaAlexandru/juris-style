import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Contact() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
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
            {t("Contact", "Contact")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Suntem aici să vă ajutăm. Contactați-ne pentru o consultație",
              "We are here to help. Contact us for a consultation"
            )}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">
                {t("Trimite-ne un mesaj", "Send Us a Message")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("Nume", "Name")}
                    </label>
                    <Input
                      placeholder={t("Numele dumneavoastră", "Your name")}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("Email", "Email")}
                    </label>
                    <Input
                      type="email"
                      placeholder="email@exemplu.ro"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("Telefon", "Phone")}
                  </label>
                  <Input type="tel" placeholder="+40 ..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("Subiect", "Subject")}
                  </label>
                  <Input
                    placeholder={t("Subiectul mesajului", "Message subject")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("Mesaj", "Message")}
                  </label>
                  <Textarea
                    placeholder={t(
                      "Descrieți situația dumneavoastră...",
                      "Describe your situation..."
                    )}
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  {t("Trimite mesajul", "Send Message")}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">
                    {t("Informații de contact", "Contact Information")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {t("Adresă", "Address")}
                      </h3>
                      <p className="text-muted-foreground">
                        Pictor Barbu Iscovescu 40,
                        <br />
                        et.1, ap.2, Sector 1, Bucuresti
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {t("Telefon", "Phone")}
                      </h3>
                      <p className="text-muted-foreground">+40 723 360 063</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {t("Email", "Email")}
                      </h3>
                      <p className="text-muted-foreground">
                        office@frunza-asociatii.ro
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        {t("Program", "Schedule")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t(
                          "Luni - Vineri: 08:00 - 19:00",
                          "Monday - Friday: 08:00 - 19:00"
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.738104706734!2d26.091927776639037!3d44.41516497107234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff5219e2cd7b%3A0xe2cd88b231b0a448!2sStrada%20Pictor%20Barbu%20Iscovescu%2040%2C%20Bucure%C8%99ti%20011577!5e0!3m2!1sen!2sro!4v1731618710000!5m2!1sen!2sro"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
