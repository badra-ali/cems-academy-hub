import { BookOpen, Target, Users, TrendingUp, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Renforcement Académique",
    description: "Programme complet couvrant toutes les matières clés du BEPC et BAC avec une pédagogie adaptée.",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Examens Blancs",
    description: "Un examen blanc par trimestre dans les conditions réelles pour une préparation optimale.",
    color: "text-success",
  },
  {
    icon: Users,
    title: "Suivi Personnalisé",
    description: "Encadrement individuel et coaching adapté au profil de chaque élève pour maximiser les résultats.",
    color: "text-primary-light",
  },
  {
    icon: TrendingUp,
    title: "Outils Numériques",
    description: "Plateforme d'apprentissage en ligne avec ressources, vidéos et quiz interactifs.",
    color: "text-success-light",
  },
  {
    icon: Award,
    title: "Méthodologie d'Examen",
    description: "Techniques éprouvées de gestion du temps, de stress et de stratégies de réponse.",
    color: "text-accent",
  },
  {
    icon: Clock,
    title: "Planning Flexible",
    description: "3 sessions par semaine adaptées aux emplois du temps scolaires des élèves.",
    color: "text-primary",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Un Programme d'Excellence Complet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tous les outils et l'accompagnement nécessaires pour réussir brillamment vos examens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border hover:shadow-medium transition-all duration-300 group bg-card"
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
