import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

const tarifs = [
  {
    nom: "Mensuel BEPC",
    prix: 50000,
    prixFormate: "50 000",
    periode: "mois",
    caracteristiques: [
      "3 sessions/semaine",
      "Accès ressources",
      "Support WhatsApp",
    ],
    populaire: false,
    economie: null,
  },
  {
    nom: "Mensuel BAC",
    prix: 60000,
    prixFormate: "60 000",
    periode: "mois",
    caracteristiques: [
      "3 sessions/semaine",
      "Accès ressources",
      "Support WhatsApp",
    ],
    populaire: true,
    economie: null,
  },
  {
    nom: "Trimestriel BEPC",
    prix: 135000,
    prixFormate: "135 000",
    periode: "trimestre",
    caracteristiques: [
      "3 sessions/semaine",
      "1 examen blanc",
      "Coaching inclus",
    ],
    populaire: false,
    economie: "10%",
  },
  {
    nom: "Trimestriel BAC",
    prix: 162000,
    prixFormate: "162 000",
    periode: "trimestre",
    caracteristiques: [
      "3 sessions/semaine",
      "1 examen blanc",
      "Mentorat inclus",
    ],
    populaire: false,
    economie: "10%",
  },
];

const Inscriptions = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomEleve: "",
    classe: "",
    programme: "",
    ecole: "",
    nomParent: "",
    telephone: "",
    email: "",
    formule: "",
  });
  const [accepteConditions, setAccepteConditions] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accepteConditions) {
      toast({
        title: "Conditions non acceptées",
        description: "Veuillez accepter les conditions générales pour continuer.",
        variant: "destructive",
      });
      return;
    }

    // Validation du téléphone (format ivoirien)
    const phoneRegex = /^(\+225)?[0-9]{10}$/;
    if (!phoneRegex.test(formData.telephone.replace(/\s/g, ''))) {
      toast({
        title: "Téléphone invalide",
        description: "Veuillez entrer un numéro ivoirien valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const tarifSelectionne = tarifs.find(t => t.nom === formData.formule);
      
      const { error } = await supabase
        .from('inscriptions')
        .insert({
          nom_complet_eleve: formData.nomEleve,
          classe_actuelle: formData.classe,
          programme_souhaite: formData.programme,
          ecole_actuelle: formData.ecole,
          nom_parent: formData.nomParent,
          telephone_parent: formData.telephone,
          email_parent: formData.email || null,
          formule: formData.formule,
          montant: tarifSelectionne?.prix || 0,
        });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Un conseiller CEMS vous contactera sous 24h pour finaliser votre inscription.",
      });

      // Réinitialiser le formulaire
      setFormData({
        nomEleve: "",
        classe: "",
        programme: "",
        ecole: "",
        nomParent: "",
        telephone: "",
        email: "",
        formule: "",
      });
      setAccepteConditions(false);
    } catch (error) {
      console.error('Erreur inscription:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Inscriptions & Tarifs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Choisissez la formule qui vous convient et rejoignez l'excellence
          </p>
        </div>
      </section>

      {/* Section Tarifs */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nos Formules</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Des formules adaptées à vos besoins et votre budget
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {tarifs.map((tarif, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  tarif.populaire
                    ? "border-primary shadow-lg ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {tarif.populaire && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Populaire
                  </Badge>
                )}
                {tarif.economie && (
                  <Badge variant="secondary" className="absolute -top-3 right-4 bg-success/10 text-success border-success/20">
                    Économie {tarif.economie}
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl mb-2">{tarif.nom}</CardTitle>
                  <CardDescription className="text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {tarif.prixFormate}
                      </span>
                      <span className="text-sm text-muted-foreground">FCFA</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      /{tarif.periode}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {tarif.caracteristiques.map((carac, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{carac}</span>
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
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <Card className="shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-2">Formulaire d'Inscription</CardTitle>
              <CardDescription className="text-base">
                Complétez ce formulaire et nous vous contacterons sous 24h pour
                finaliser votre inscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="pb-2 border-b">
                    <h3 className="font-semibold text-lg text-primary">
                      Informations de l'élève
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nomEleve">Nom complet de l'élève *</Label>
                      <Input
                        id="nomEleve"
                        required
                        placeholder="Nom et prénoms"
                        value={formData.nomEleve}
                        onChange={(e) =>
                          setFormData({ ...formData, nomEleve: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classe">Classe actuelle *</Label>
                      <Select
                        value={formData.classe}
                        onValueChange={(value) =>
                          setFormData({ ...formData, classe: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3e">3e</SelectItem>
                          <SelectItem value="1re">1re</SelectItem>
                          <SelectItem value="Tle">Tle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programme">Programme souhaité *</Label>
                      <Select
                        value={formData.programme}
                        onValueChange={(value) =>
                          setFormData({ ...formData, programme: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BEPC">BEPC</SelectItem>
                          <SelectItem value="BAC">BAC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ecole">École actuelle *</Label>
                      <Input
                        id="ecole"
                        required
                        placeholder="Nom de l'établissement"
                        value={formData.ecole}
                        onChange={(e) =>
                          setFormData({ ...formData, ecole: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="pb-2 border-b">
                    <h3 className="font-semibold text-lg text-primary">
                      Contact du parent / tuteur
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nomParent">Nom du parent / tuteur *</Label>
                      <Input
                        id="nomParent"
                        required
                        placeholder="Nom et prénoms"
                        value={formData.nomParent}
                        onChange={(e) =>
                          setFormData({ ...formData, nomParent: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        placeholder="+225 XX XX XX XX XX"
                        required
                        value={formData.telephone}
                        onChange={(e) =>
                          setFormData({ ...formData, telephone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@exemple.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="pb-2 border-b">
                    <h3 className="font-semibold text-lg text-primary">
                      Formule d'inscription
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="formule">Choisir une formule *</Label>
                      <Select
                        value={formData.formule}
                        onValueChange={(value) =>
                          setFormData({ ...formData, formule: value })
                        }
                        required
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner une formule" />
                        </SelectTrigger>
                        <SelectContent>
                          {tarifs.map((tarif) => (
                            <SelectItem key={tarif.nom} value={tarif.nom}>
                              {tarif.nom} - {tarif.prixFormate} FCFA
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                      <p className="font-semibold text-foreground">Modes de paiement acceptés :</p>
                      <p className="text-muted-foreground">Orange Money, MTN MoMo, Moov Money, Carte bancaire</p>
                      <p className="text-muted-foreground">Reçu automatique envoyé par email et WhatsApp après paiement</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="conditions"
                    checked={accepteConditions}
                    onCheckedChange={(checked) =>
                      setAccepteConditions(checked as boolean)
                    }
                    className="mt-1"
                  />
                  <Label
                    htmlFor="conditions"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    J'accepte les conditions générales d'inscription et autorise
                    le CEMS à me contacter concernant cette demande. *
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande d'inscription"}
                </Button>

                <p className="text-center text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg">
                  Un conseiller CEMS vous contactera sous 24h pour finaliser votre
                  inscription
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
