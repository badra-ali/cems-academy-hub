import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  programme: [
    { name: "Programme BEPC", href: "/programme#bepc" },
    { name: "Programme BAC", href: "/programme#bac" },
    { name: "Examens Blancs", href: "/calendrier" },
    { name: "Ressources", href: "/ressources" },
  ],
  ecole: [
    { name: "À propos de CEMS", href: "/a-propos" },
    { name: "Notre équipe", href: "/a-propos#equipe" },
    { name: "Partenariats", href: "/a-propos#partenariats" },
    { name: "Actualités", href: "/actualites" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Inscriptions", href: "/inscriptions" },
    { name: "Politique de confidentialité", href: "/confidentialite" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center shadow-soft">
                <span className="text-2xl font-display font-bold text-primary-foreground">C</span>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground">CEMS</div>
                <div className="text-sm text-muted-foreground">Centre d'Excellence Matin Sanogo</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-sm">
              L'excellence n'est pas un hasard, c'est une discipline quotidienne.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+2250566621095" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                +225 05 66 62 10 95
              </a>
              <a href="tel:+2250705875502" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                +225 07 05 87 55 02
              </a>
              <a href="mailto:contact@cems-ci.com" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                contact@cems-ci.com
              </a>
              <div className="flex items-start text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
            </div>
          </div>

          {/* Programme */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Programme</h3>
            <ul className="space-y-2">
              {footerLinks.programme.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* École */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">École</h3>
            <ul className="space-y-2">
              {footerLinks.ecole.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CEMS - Centre d'Excellence Matin Sanogo. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
