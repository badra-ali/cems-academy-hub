import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";

type Plan = {
  id: string;
  code: string;
  name: string;
  price_cfa: number;
  billing: string;
  details: string | null;
  tag: string | null;
  is_active: boolean;
  weight: number;
};

type PaymentProvider = "ORANGE_MONEY" | "MTN_MOMO" | "MOOV_MONEY" | "CARD";

const formatCFA = (value: number) => {
  return new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
};

const WHATSAPP_NUMBER = "+2250566621095";
const PHONE_NUMBER1 = "+2250566621095";
const MTN_MONEY_NUMBER = "0566621095";

const trackEvent = async (event: string, meta?: any) => {
  try {
    await supabase.from("track_events").insert({ event, meta });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Track event error:", error);
    }
  }
};

const Inscriptions = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>("ORANGE_MONEY");

  const [formData, setFormData] = useState({
    nomCompletEleve: "",
    classeActuelle: "3e",
    programmeSouhaite: "BEPC",
    ecoleActuelle: "",
    nomParent: "",
    telephoneParent: "",
    emailParent: "",
    formule: "",
    accepteConditions: false,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("is_active", true)
        .order("weight", { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fetching plans:", error);
      }
      toast({
        title: "Erreur",
        description: "Impossible de charger les formules. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const onSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setFormData({ ...formData, formule: plan.code });
    trackEvent("pricing_plan_select", { code: plan.code });
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+225\s?([0-9]{2}\s?){5}$/;
    return phoneRegex.test(phone);
  };

  const initializePayment = async (enrollmentId: string, provider: PaymentProvider) => {
    try {
      const plan = plans.find((p) => p.code === formData.formule);
      if (!plan) throw new Error("Plan introuvable");

      // Create payment record without SELECT by providing client-side UUID
      const paymentId = crypto.randomUUID();
      const paymentRef = `PMT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      const { error: paymentError } = await supabase
        .from("payments")
        .insert({
          id: paymentId,
          provider,
          amount_cfa: plan.price_cfa,
          status: "PENDING",
          ref: paymentRef,
          metadata: { enrollmentId },
        });

      if (paymentError) throw paymentError;

      // Update enrollment with payment_id
      await supabase
        .from("inscriptions")
        .update({
          payment_id: paymentId,
          statut: "PENDING_PAYMENT",
        })
        .eq("id", enrollmentId);

      setPaymentInfo({
        paymentId,
        ref: paymentRef,
        provider,
        amountCFA: plan.price_cfa,
        recipientNumber: provider === "MTN_MOMO" ? MTN_MONEY_NUMBER : undefined,
        instructions: `Effectuez le paiement via ${provider}. Référence: ${paymentRef}`,
      });

      trackEvent("payment_initiated", { provider, amount: plan.price_cfa, ref: paymentRef });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Payment initialization error:", error);
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!validatePhone(formData.telephoneParent)) {
        toast({
          title: "Erreur de validation",
          description: "Format attendu: +225 XX XX XX XX XX",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!formData.formule) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une formule",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const plan = plans.find((p) => p.code === formData.formule);
      if (!plan) {
        toast({
          title: "Erreur",
          description: "Formule introuvable",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Construct WhatsApp message
      const message = `*NOUVELLE DEMANDE D'INSCRIPTION CEMS*

📚 *INFORMATIONS ÉLÈVE*
Nom complet: ${formData.nomCompletEleve}
Classe actuelle: ${formData.classeActuelle}
Programme souhaité: ${formData.programmeSouhaite}
École actuelle: ${formData.ecoleActuelle}

👤 *CONTACT PARENT/TUTEUR*
Nom: ${formData.nomParent}
Téléphone: ${formData.telephoneParent}
${formData.emailParent ? `Email: ${formData.emailParent}` : ''}

💳 *FORMULE & PAIEMENT*
Formule: ${plan.name}
Montant: ${formatCFA(plan.price_cfa)}
Mode de paiement: ${selectedProvider === "ORANGE_MONEY" ? "Orange Money" : selectedProvider === "MTN_MOMO" ? "MTN Mobile Money" : selectedProvider === "MOOV_MONEY" ? "Moov Money" : "Carte bancaire"}`;

      // Open WhatsApp with the message
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      trackEvent("enrollment_whatsapp_sent", { plan: formData.formule });

      toast({
        title: "Redirection vers WhatsApp",
        description: "Votre demande va être envoyée via WhatsApp.",
      });

      // Reset form
      setFormData({
        nomCompletEleve: "",
        classeActuelle: "3e",
        programmeSouhaite: "BEPC",
        ecoleActuelle: "",
        nomParent: "",
        telephoneParent: "",
        emailParent: "",
        formule: "",
        accepteConditions: false,
      });
      setSelectedPlan(null);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Erreur inscription:", error);
      }
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Hero Section */}
      <header className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Inscriptions & Tarifs
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Choisissez la formule qui vous convient et rejoignez l'excellence
          </p>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nos Formules</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Des formules adaptées à vos besoins et votre budget
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.code}
                className={`relative transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedPlan?.code === plan.code
                    ? "border-primary shadow-lg ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => onSelectPlan(plan)}
              >
                {plan.tag === "Populaire" && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    {plan.tag}
                  </Badge>
                )}
                {plan.tag && plan.tag.includes("Économie") && (
                  <Badge variant="secondary" className="absolute -top-3 right-4 bg-success/10 text-success border-success/20">
                    {plan.tag}
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {new Intl.NumberFormat("fr-FR").format(plan.price_cfa)}
                      </span>
                      <span className="text-sm text-muted-foreground">FCFA</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      /{plan.billing === "monthly" ? "mois" : "trimestre"}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {plan.details && (
                    <ul className="space-y-3">
                      {plan.details.split(" · ").map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {selectedPlan?.code === plan.code && (
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="w-4 h-4" />
                      Sélectionné
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <Card className="shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-2">Formulaire d'Inscription</CardTitle>
              <CardDescription className="text-base">
                Complétez ce formulaire et nous vous contacterons sous 24h pour finaliser votre inscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Student Information */}
                <div className="space-y-6">
                  <div className="pb-2 border-b">
                    <h3 className="font-semibold text-lg text-primary">
                      Informations de l'élève
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nomCompletEleve">Nom complet de l'élève *</Label>
                      <Input
                        id="nomCompletEleve"
                        required
                        placeholder="Nom et prénoms"
                        value={formData.nomCompletEleve}
                        onChange={(e) =>
                          setFormData({ ...formData, nomCompletEleve: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classeActuelle">Classe actuelle *</Label>
                      <Select
                        value={formData.classeActuelle}
                        onValueChange={(value) =>
                          setFormData({ ...formData, classeActuelle: value })
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
                      <Label htmlFor="programmeSouhaite">Programme souhaité *</Label>
                      <Select
                        value={formData.programmeSouhaite}
                        onValueChange={(value) =>
                          setFormData({ ...formData, programmeSouhaite: value })
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
                      <Label htmlFor="ecoleActuelle">École actuelle *</Label>
                      <Input
                        id="ecoleActuelle"
                        required
                        placeholder="Nom de l'établissement"
                        value={formData.ecoleActuelle}
                        onChange={(e) =>
                          setFormData({ ...formData, ecoleActuelle: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
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
                      <Label htmlFor="telephoneParent">Téléphone *</Label>
                      <Input
                        id="telephoneParent"
                        type="tel"
                        placeholder="+225 XX XX XX XX XX"
                        required
                        value={formData.telephoneParent}
                        onChange={(e) =>
                          setFormData({ ...formData, telephoneParent: e.target.value })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Format attendu: +225 XX XX XX XX XX
                      </p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="emailParent">Email</Label>
                      <Input
                        id="emailParent"
                        type="email"
                        placeholder="email@exemple.com"
                        value={formData.emailParent}
                        onChange={(e) =>
                          setFormData({ ...formData, emailParent: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Plan Selection */}
                <div className="space-y-6">
                  <div className="pb-2 border-b">
                    <h3 className="font-semibold text-lg text-primary">
                      Formule et Paiement
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="formule">Choisir une formule *</Label>
                      <Select
                        value={formData.formule}
                        onValueChange={(value) => {
                          setFormData({ ...formData, formule: value });
                          const plan = plans.find((p) => p.code === value);
                          if (plan) setSelectedPlan(plan);
                        }}
                        required
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner une formule" />
                        </SelectTrigger>
                        <SelectContent>
                          {plans.map((plan) => (
                            <SelectItem key={plan.code} value={plan.code}>
                              {plan.name} - {formatCFA(plan.price_cfa)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider">Mode de paiement *</Label>
                      <Select
                        value={selectedProvider}
                        onValueChange={(value: PaymentProvider) => setSelectedProvider(value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Sélectionner un mode de paiement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ORANGE_MONEY">Orange Money</SelectItem>
                          <SelectItem value="MTN_MOMO">MTN Mobile Money</SelectItem>
                          <SelectItem value="MOOV_MONEY">Moov Money</SelectItem>
                          <SelectItem value="CARD">Carte bancaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                    <p className="font-semibold text-foreground">À propos du paiement :</p>
                    <p className="text-muted-foreground">
                      Après soumission de votre demande, vous recevrez une référence de paiement. Un conseiller vous contactera sous 24h pour finaliser le processus.
                    </p>
                  </div>
                </div>

                {/* Terms Acceptance */}
                <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="conditions"
                    checked={formData.accepteConditions}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, accepteConditions: checked as boolean })
                    }
                    className="mt-1"
                    required
                  />
                  <Label
                    htmlFor="conditions"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    J'accepte les conditions générales d'inscription et autorise le CEMS à me contacter concernant cette demande. *
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-semibold"
                  disabled={loading}
                  variant="default"
                >
                  {loading ? "Envoi en cours..." : "Envoyer ma demande d'inscription"}
                </Button>

                {/* Payment Info Display */}
                {enrollmentId && paymentInfo && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Demande créée avec succès
                      </CardTitle>
                      <CardDescription>ID: {enrollmentId}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-semibold">Référence de paiement:</span>{" "}
                          {paymentInfo.ref}
                        </div>
                        <div>
                          <span className="font-semibold">Montant:</span>{" "}
                          {formatCFA(paymentInfo.amountCFA)}
                        </div>
                        <div>
                          <span className="font-semibold">Mode de paiement:</span>{" "}
                          {paymentInfo.provider === "ORANGE_MONEY" ? "Orange Money" :
                           paymentInfo.provider === "MTN_MOMO" ? "MTN Mobile Money" :
                           paymentInfo.provider === "MOOV_MONEY" ? "Moov Money" : "Carte bancaire"}
                        </div>
                        <div className="pt-3 border-t space-y-3">
                          <p className="font-semibold">Instructions de paiement :</p>
                          {paymentInfo.provider === "MTN_MOMO" && paymentInfo.recipientNumber ? (
                            <div className="bg-background/50 p-4 rounded-lg space-y-2">
                              <p className="text-muted-foreground">
                                Effectuez le transfert MTN Mobile Money vers le numéro suivant :
                              </p>
                              <p className="text-2xl font-bold text-primary">
                                {paymentInfo.recipientNumber}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Montant à transférer : {formatCFA(paymentInfo.amountCFA)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">{paymentInfo.instructions}</p>
                          )}
                          <p className="text-muted-foreground text-xs pt-2">
                            Notre équipe vous contactera sous 24h pour confirmer votre inscription.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <p className="text-center text-sm text-muted-foreground bg-primary/5 p-4 rounded-lg">
                  Un conseiller CEMS vous contactera sous 24h pour finaliser votre inscription
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Buttons */}
      <aside className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <Button
          asChild
          size="lg"
          className="shadow-lg"
          variant="default"
          onClick={() => trackEvent("whatsapp_click")}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          className="shadow-lg"
          variant="secondary"
          onClick={() => trackEvent("phone_click", { number: PHONE_NUMBER1 })}
        >
          <a href={`tel:${PHONE_NUMBER1}`} className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Appeler
          </a>
        </Button>
      </aside>
    </div>
  );
};

export default Inscriptions;
