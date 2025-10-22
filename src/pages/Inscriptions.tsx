import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, CreditCard, Smartphone } from "lucide-react";
import { toast } from "sonner";

const tarifs = [
  {
    name: "Mensuel BEPC",
    price: "50 000 FCFA",
    periode: "/mois",
    features: ["3 sessions/semaine", "Accès ressources", "Support WhatsApp"],
  },
  {
    name: "Mensuel BAC",
    price: "60 000 FCFA",
    periode: "/mois",
    features: ["3 sessions/semaine", "Accès ressources", "Support WhatsApp"],
    popular: true,
  },
  {
    name: "Trimestriel BEPC",
    price: "135 000 FCFA",
    periode: "/trimestre",
    features: ["3 sessions/semaine", "1 examen blanc", "Coaching inclus", "Économie 10%"],
  },
  {
    name: "Trimestriel BAC",
    price: "162 000 FCFA",
    periode: "/trimestre",
    features: ["3 sessions/semaine", "1 examen blanc", "Mentorat inclus", "Économie 10%"],
  },
];

const Inscriptions = () => {
  const [formData, setFormData] = useState({
    nomEleve: "",
    classe: "",
    programme: "",
    matieres: [] as string[],
    ecole: "",
    nomParent: "",
    telephone: "",
    email: "",
    formule: "",
    accepteConditions: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accepteConditions) {
      toast.error("Veuillez accepter les conditions générales");
      return;
    }
    toast.success("Inscription envoyée ! Nous vous contacterons sous 24h.");
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Inscriptions & Tarifs
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Choisissez la formule qui vous convient et rejoignez l'excellence
          </p>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-12">
            Nos Formules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tarifs.map((tarif, index) => (
              <Card 
                key={index} 
                className={`relative ${tarif.popular ? 'border-2 border-success shadow-medium' : 'border-border'}`}
              >
                {tarif.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Populaire
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-display text-xl text-foreground">
                    {tarif.name}
                  </CardTitle>
                  <div className="flex items-baseline mt-4">
                    <span className="text-3xl font-bold text-foreground">{tarif.price}</span>
                    <span className="text-muted-foreground ml-1">{tarif.periode}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tarif.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="font-display text-3xl text-foreground">
                Formulaire d'Inscription
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Complétez ce formulaire et nous vous contacterons sous 24h pour finaliser votre inscription
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations élève */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">Informations de l'élève</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomEleve">Nom complet de l'élève *</Label>
                      <Input
                        id="nomEleve"
                        required
                        value={formData.nomEleve}
                        onChange={(e) => setFormData({ ...formData, nomEleve: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classe">Classe actuelle *</Label>
                      <Select value={formData.classe} onValueChange={(value) => setFormData({ ...formData, classe: value })}>
                        <SelectTrigger id="classe">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3eme">3ème (BEPC)</SelectItem>
                          <SelectItem value="2nde">2nde</SelectItem>
                          <SelectItem value="1ere">1ère</SelectItem>
                          <SelectItem value="tle">Terminale (BAC)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="programme">Programme souhaité *</Label>
                      <Select value={formData.programme} onValueChange={(value) => setFormData({ ...formData, programme: value })}>
                        <SelectTrigger id="programme">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bepc">Programme BEPC</SelectItem>
                          <SelectItem value="bac">Programme BAC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ecole">École actuelle *</Label>
                      <Input
                        id="ecole"
                        required
                        value={formData.ecole}
                        onChange={(e) => setFormData({ ...formData, ecole: e.target.value })}
                        placeholder="Nom de l'établissement"
                      />
                    </div>
                  </div>
                </div>

                {/* Informations parent */}
                <div className="space-y-4 border-t border-border pt-6">
                  <h3 className="font-semibold text-lg text-foreground">Contact du parent / tuteur</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomParent">Nom du parent / tuteur *</Label>
                      <Input
                        id="nomParent"
                        required
                        value={formData.nomParent}
                        onChange={(e) => setFormData({ ...formData, nomParent: e.target.value })}
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@exemple.com"
                    />
                  </div>
                </div>

                {/* Formule */}
                <div className="space-y-4 border-t border-border pt-6">
                  <h3 className="font-semibold text-lg text-foreground">Formule d'inscription</h3>
                  <div className="space-y-2">
                    <Label htmlFor="formule">Choisir une formule *</Label>
                    <Select value={formData.formule} onValueChange={(value) => setFormData({ ...formData, formule: value })}>
                      <SelectTrigger id="formule">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {tarifs.map((tarif, idx) => (
                          <SelectItem key={idx} value={tarif.name}>
                            {tarif.name} - {tarif.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <p className="text-sm font-medium text-foreground">Modes de paiement acceptés :</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Smartphone className="w-4 h-4 mr-2 text-success" />
                        Orange Money
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Smartphone className="w-4 h-4 mr-2 text-success" />
                        MTN MoMo
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Smartphone className="w-4 h-4 mr-2 text-success" />
                        Moov Money
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CreditCard className="w-4 h-4 mr-2 text-primary" />
                        Carte bancaire
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reçu automatique envoyé par email et WhatsApp après paiement
                    </p>
                  </div>
                </div>

                {/* Conditions */}
                <div className="flex items-start space-x-2 border-t border-border pt-6">
                  <Checkbox
                    id="conditions"
                    checked={formData.accepteConditions}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, accepteConditions: checked as boolean })
                    }
                  />
                  <label htmlFor="conditions" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    J'accepte les conditions générales d'inscription et autorise le CEMS à me contacter 
                    concernant cette demande. *
                  </label>
                </div>

                {/* Submit */}
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Envoyer ma demande d'inscription
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Un conseiller CEMS vous contactera sous 24h pour finaliser votre inscription
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Inscriptions;
