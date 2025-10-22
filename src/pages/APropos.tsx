import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Award, Heart, Users, TrendingUp, BookOpen } from "lucide-react";

const valeurs = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous visons les meilleurs résultats pour chaque élève avec une pédagogie rigoureuse et adaptée.",
  },
  {
    icon: Heart,
    title: "Engagement",
    description: "Notre équipe est dévouée à la réussite de chaque élève avec un suivi personnalisé constant.",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Un environnement d'apprentissage stimulant où chacun se sent soutenu et motivé.",
  },
  {
    icon: TrendingUp,
    title: "Progrès",
    description: "Nous mesurons et célébrons chaque avancée pour maintenir la motivation au quotidien.",
  },
];

const equipe = [
  {
    nom: "Alidjou BAMBA",
    role: "Fondateur & Directeur Pédagogique",
    description: "BAC D avec mention (313/400) au Lycée Scientifique. Passionné par l'excellence académique et le mentorat.",
  },
  {
    nom: "Équipe Pédagogique",
    role: "Enseignants Experts",
    description: "Professeurs certifiés et expérimentés dans la préparation aux examens BEPC et BAC.",
  },
];

const APropos = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
              Notre Mission : Votre Excellence
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Le Centre d'Excellence Matin Sanogo (CEMS) est né d'une conviction forte : 
              l'excellence académique est accessible à tous avec les bonnes méthodes et le bon accompagnement.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display font-bold text-3xl text-foreground mb-4">
                  Notre Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Devenir la référence en matière d'excellence académique en Côte d'Ivoire, 
                  en transformant chaque élève en un candidat confiant et performant, 
                  prêt à réussir brillamment ses examens et à poursuivre ses ambitions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-success">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-success/10 flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-success" />
                </div>
                <h2 className="font-display font-bold text-3xl text-foreground mb-4">
                  Notre Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Offrir un programme de préparation aux examens BEPC et BAC qui combine 
                  rigueur académique, pédagogie innovante et accompagnement personnalisé 
                  pour maximiser les chances de réussite de chaque élève.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Valeurs */}
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((valeur, index) => {
              const Icon = valeur.icon;
              return (
                <Card key={index} className="border-border hover:shadow-medium transition-all text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                      {valeur.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {valeur.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-foreground mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des experts passionnés au service de votre réussite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {equipe.map((membre, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4 text-3xl font-display font-bold text-primary-foreground">
                    {membre.nom.charAt(0)}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-1">
                    {membre.nom}
                  </h3>
                  <p className="text-primary font-semibold mb-3">{membre.role}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {membre.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Histoire du fondateur */}
          <Card className="max-w-4xl mx-auto border-2 border-primary">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                    L'Histoire d'Alidjou BAMBA
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Diplômé du prestigieux Lycée Scientifique avec une mention de{" "}
                    <span className="font-bold text-success">313/400 au BAC série D</span>, 
                    Alidjou BAMBA a fondé le CEMS avec une vision claire : démocratiser l'excellence 
                    académique. Fort de son expérience personnelle et de sa passion pour l'enseignement, 
                    il a créé un programme qui combine méthodologie éprouvée, suivi personnalisé et 
                    coaching mental pour transformer chaque élève en candidat performant.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    "L'excellence n'est pas un hasard, c'est une discipline quotidienne" - cette phrase 
                    résume sa philosophie et guide l'ensemble du programme CEMS.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-success text-success-foreground border-0 shadow-strong">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Rejoignez la Communauté CEMS
              </h2>
              <p className="text-lg text-success-foreground/90 mb-8 max-w-2xl mx-auto">
                Faites partie des centaines d'élèves qui ont transformé leurs résultats avec le CEMS
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" asChild className="bg-success-foreground text-success hover:bg-success-foreground/90 border-0">
                  <Link to="/inscriptions">S'inscrire maintenant</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-success-foreground/30 text-success-foreground hover:bg-success-foreground/10">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default APropos;
