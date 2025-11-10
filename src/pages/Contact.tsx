import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen pt-20">
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
                      <p className="text-muted-foreground">
                        021 312 27 15
                        <br />
                        021 312 27 80
                      </p>
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
                          "Luni - Vineri: 09:00 - 18:00",
                          "Monday - Friday: 09:00 - 18:00"
                        )}
                        <br />
                        {t("Sâmbătă: 10:00 - 14:00", "Saturday: 10:00 - 14:00")}
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.0864436227384!2d26.10270631564494!3d44.427634179101786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4770adb5b7%3A0x58147f39579fe6fa!2sBulevardul%20Unirii%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1647000000000!5m2!1sen!2sro"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
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
