import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Fatoumata K.",
    role: "Élève - BAC D obtenu avec 15.2/20",
    content: "Grâce au CEMS, j'ai non seulement réussi mon BAC avec mention, mais j'ai aussi appris à gérer mon stress et à mieux organiser mes révisions. Les examens blancs m'ont vraiment préparée.",
    rating: 5,
  },
  {
    name: "M. Kouamé Jean",
    role: "Parent d'élève BEPC",
    content: "Mon fils a progressé de manière spectaculaire. Les enseignants sont dévoués et le suivi personnalisé fait toute la différence. Je recommande vivement le CEMS.",
    rating: 5,
  },
  {
    name: "Abdoulaye S.",
    role: "Élève - BEPC obtenu",
    content: "L'ambiance au CEMS est motivante et les profs savent vraiment expliquer les choses compliquées de façon simple. J'ai eu mon BEPC du premier coup alors que j'étais en difficulté.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Témoignages de Réussite
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les histoires de nos élèves et familles qui ont atteint l'excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-medium transition-all duration-300 bg-card">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-success text-success" />
                  ))}
                </div>

                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
