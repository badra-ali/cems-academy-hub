import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-hero rounded-2xl shadow-strong p-8 md:p-12 lg:p-16 text-center">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary-foreground mb-4">
            Prêt à Transformer Vos Résultats ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez les centaines d'élèves qui ont déjà choisi l'excellence avec le CEMS. 
            Inscrivez-vous dès aujourd'hui pour la prochaine session.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
            >
              <Link to="/inscriptions">
                S'inscrire maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="https://wa.me/2250566621095" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                Parler à un conseiller
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-primary-foreground/80">
            <span>✓ Inscriptions ouvertes toute l'année</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Places limitées par classe</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Première séance gratuite</span>
          </div>
        </div>
      </div>
    </section>
  );
};
