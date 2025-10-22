import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Étudiants du CEMS en classe" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full mb-6 border border-success/20">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Programme d'Excellence BEPC & BAC</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight">
            L'Excellence n'est pas un{" "}
            <span className="text-transparent bg-clip-text bg-gradient-hero">hasard</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            C'est une discipline quotidienne. Rejoignez le Centre d'Excellence Matin Sanogo et transformez vos résultats au BEPC et BAC.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-display font-bold text-success">85%</span>
              <span className="text-sm text-muted-foreground">Taux de réussite ciblé</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-display font-bold text-primary">3×</span>
              <span className="text-sm text-muted-foreground">Sessions par semaine</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-display font-bold text-accent">1</span>
              <span className="text-sm text-muted-foreground">Examen blanc / trimestre</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="hero" size="lg" asChild className="group">
              <Link to="/inscriptions">
                S'inscrire maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/programme">Découvrir le programme</Link>
            </Button>
            <Button variant="success" size="lg" asChild>
              <a href="https://wa.me/2250566621095" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span>Suivi personnalisé</span>
            <span>•</span>
            <span>Examens blancs réguliers</span>
            <span>•</span>
            <span>Pédagogie éprouvée</span>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};
