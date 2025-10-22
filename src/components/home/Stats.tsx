import { TrendingUp, Users, Award, Star } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "85%",
    label: "Taux de réussite ciblé",
    description: "Objectif de réussite aux examens",
  },
  {
    icon: Users,
    value: "500+",
    label: "Élèves accompagnés",
    description: "Depuis le lancement du programme",
  },
  {
    icon: Award,
    value: "15+",
    label: "Années d'expérience",
    description: "En excellence académique",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Satisfaction parents",
    description: "Note moyenne des témoignages",
  },
];

export const Stats = () => {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Des Résultats qui Parlent d'Eux-Mêmes
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Notre engagement : transformer le potentiel en résultats concrets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="font-display font-bold text-4xl md:text-5xl mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-lg mb-1">
                  {stat.label}
                </div>
                <p className="text-sm text-primary-foreground/70">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
