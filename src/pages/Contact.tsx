import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé ! Nous vous répondrons rapidement.");
    setFormData({ nom: "", email: "", telephone: "", sujet: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-3xl text-foreground mb-6">
                  Nos Coordonnées
                </h2>
                <p className="text-muted-foreground mb-8">
                  N'hésitez pas à nous contacter par téléphone, email ou directement via WhatsApp. 
                  Nous sommes disponibles du lundi au samedi de 8h à 18h.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                      <a href="tel:+2250566621095" className="text-muted-foreground hover:text-primary transition-colors block">
                        +225 05 66 62 10 95
                      </a>
                      <a href="tel:+2250705875502" className="text-muted-foreground hover:text-primary transition-colors block">
                        +225 07 05 87 55 02
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                      <a 
                        href="https://wa.me/2250566621095" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-success transition-colors"
                      >
                        Cliquez pour discuter sur WhatsApp
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Réponse rapide garantie
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Email</h3>
                      <a 
                        href="mailto:contact@cems-ci.com" 
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        contact@cems-ci.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Réponse sous 24h
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                      <p className="text-muted-foreground">
                        Abidjan, Côte d'Ivoire
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sur rendez-vous uniquement
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-success text-success-foreground border-0">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-xl mb-3">
                    Besoin d'une réponse immédiate ?
                  </h3>
                  <p className="mb-4 text-success-foreground/90">
                    Contactez-nous directement sur WhatsApp pour une assistance rapide
                  </p>
                  <Button 
                    variant="outline" 
                    className="bg-success-foreground text-success hover:bg-success-foreground/90 border-0"
                    asChild
                  >
                    <a href="https://wa.me/2250566621095" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ouvrir WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-foreground">
                  Envoyez-nous un message
                </CardTitle>
                <p className="text-muted-foreground">
                  Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet *</Label>
                    <Input
                      id="nom"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      required
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sujet">Sujet *</Label>
                    <Input
                      id="sujet"
                      required
                      value={formData.sujet}
                      onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Votre message..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
