import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Clock, Target, Users, TrendingUp, Award } from "lucide-react";

const programmes = [
  {
    id: "bepc",
    title: "Programme BEPC",
    description: "Préparation complète pour réussir le Brevet d'Études du Premier Cycle",
    matiers: [
      "Mathématiques",
      "Physique-Chimie",
      "SVT",
      "Français",
      "Anglais",
      "Histoire-Géographie",
    ],
    duration: "3 sessions/semaine",
    examens: "1 examen blanc/trimestre",
    suivi: "Coaching individuel inclus",
  },
  {
    id: "bac",
    title: "Programme BAC",
    description: "Excellence académique pour réussir le Baccalauréat (séries A, C, D)",
    matiers: [
      "Mathématiques",
      "Physique-Chimie",
      "SVT",
      "Philosophie",
      "Français",
      "Anglais",
      "Histoire-Géographie",
    ],
    duration: "3 sessions/semaine",
    examens: "1 examen blanc/trimestre",
    suivi: "Mentorat personnalisé",
  },
];

const methodes = [
  {
    icon: Target,
    title: "Méthodologie d'Examen",
    description: "Techniques éprouvées pour optimiser vos performances : gestion du temps, stratégies de réponse, analyse de sujets.",
  },
  {
    icon: Users,
    title: "Classes en Petits Groupes",
    description: "Maximum 15 élèves par classe pour garantir un suivi personnalisé et des interactions riches.",
  },
  {
    icon: TrendingUp,
    title: "Suivi de Progression",
    description: "Évaluations régulières, rapports détaillés et tableaux de bord pour mesurer vos progrès.",
  },
  {
    icon: Award,
    title: "Coaching Mental",
    description: "Gestion du stress, confiance en soi, motivation : tous les outils pour réussir sereinement.",
  },
];

const Programme = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
              Nos Programmes d'Excellence
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Une préparation complète et structurée pour réussir brillamment votre BEPC ou BAC
            </p>
            <Button variant="outline" size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0">
              <Link to="/inscriptions">Choisir mon programme</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programmes BEPC & BAC */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {programmes.map((programme) => (
              <Card key={programme.id} className="border-2 border-border hover:border-primary hover:shadow-medium transition-all">
                <CardHeader className="bg-gradient-subtle">
                  <CardTitle className="font-display text-3xl text-foreground flex items-center">
                    <BookOpen className="w-8 h-8 mr-3 text-primary" />
                    {programme.title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">{programme.description}</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-success" />
                      Matières enseignées
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {programme.matiers.map((matiere, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                          {matiere}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex items-center text-sm">
                      <Clock className="w-5 h-5 mr-3 text-primary" />
                      <span className="text-foreground font-medium mr-2">Rythme:</span>
                      <span className="text-muted-foreground">{programme.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Target className="w-5 h-5 mr-3 text-success" />
                      <span className="text-foreground font-medium mr-2">Examens:</span>
                      <span className="text-muted-foreground">{programme.examens}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-5 h-5 mr-3 text-accent" />
                      <span className="text-foreground font-medium mr-2">Suivi:</span>
                      <span className="text-muted-foreground">{programme.suivi}</span>
                    </div>
                  </div>

                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/inscriptions">S'inscrire au {programme.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Notre Pédagogie d'Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une approche complète qui va au-delà des connaissances académiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {methodes.map((methode, index) => {
              const Icon = methode.icon;
              return (
                <Card key={index} className="border-border hover:shadow-medium transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                          {methode.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {methode.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-success text-success-foreground border-0 shadow-strong">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Prêt à Commencer Votre Parcours d'Excellence ?
              </h2>
              <p className="text-lg text-success-foreground/90 mb-8 max-w-2xl mx-auto">
                Inscrivez-vous maintenant et bénéficiez d'une séance d'évaluation gratuite
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" asChild className="bg-success-foreground text-success hover:bg-success-foreground/90 border-0">
                  <Link to="/inscriptions">S'inscrire maintenant</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-success-foreground/30 text-success-foreground hover:bg-success-foreground/10">
                  <Link to="/contact">Demander plus d'informations</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Programme;
