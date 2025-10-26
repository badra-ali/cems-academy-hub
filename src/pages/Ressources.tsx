import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Download, Search, BookOpen, Award } from "lucide-react";
import { useState } from "react";

const categories = ["Toutes", "BEPC", "BAC", "Mathématiques", "Physique-Chimie", "SVT", "Français", "Anglais"];

const ressources = [
  // 10 Annales BEPC avec corrections complètes (Côte d'Ivoire 2024-2025)
  {
    titre: "Compilation Mathématiques BEPC 2025",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Mathématiques",
    description: "Compilation complète des sujets et corrigés de Mathématiques - BEPC 2025 (Zones 1, 2 et 3)",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/39714-compilation-complete-sujets-et-corriges-de-mathematiques-bepc-session-2025-zones-1-2-et-3",
  },
  {
    titre: "Compilation Anglais BEPC 2025",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Anglais",
    description: "Compilation complète des sujets et corrigés d'Anglais - BEPC 2025 (Zones 1, 2 et 3)",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/39713-compilation-complete-sujets-et-corriges-d-anglais-bepc-session-2025-zones-1-2-et-3",
  },
  {
    titre: "Compilation Physique-Chimie BEPC 2025",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Physique-Chimie",
    description: "Compilation complète des sujets et corrigés de Physique-Chimie - BEPC 2025 (Zones 1, 2 et 3)",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/39716-compilation-complete-sujets-et-corriges-de-physique-chimie-bepc-session-2025-zones-1-2-et-3",
  },
  {
    titre: "Compilation SVT BEPC 2025",
    type: "Annale",
    categorie: "BEPC",
    matiere: "SVT",
    description: "Compilation complète des sujets et corrigés de Sciences de la Vie et de la Terre - BEPC 2025 (Zones 1, 2 et 3)",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/39717-compilation-complete-sujets-et-corriges-de-sciences-de-la-vie-et-de-la-terre-bepc-session-2025-zones-1-2-et-3",
  },
  {
    titre: "Compilation Français BEPC 2025",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Français",
    description: "Compilation complète des sujets et corrigés d'Orthographe - BEPC 2025 (Zones 1, 2 et 3)",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/39715-compilation-complete-sujets-et-corriges-d-orthographe-bepc-session-2025-zones-1-2-et-3",
  },
  {
    titre: "Épreuve Mathématiques BEPC 2025 Zone 3",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Mathématiques",
    description: "Épreuve et corrigé de Mathématiques - BEPC Session 2025 Zone 3",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/432-epreuves-et-corriges-bepc-2025-cote-d-ivoire/39688-epreuve-et-corrige-de-mathematiques-bepc-session-2025-zone-3",
  },
  {
    titre: "Épreuve Anglais BEPC 2025 Zone 1",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Anglais",
    description: "Épreuve et corrigé d'Anglais - BEPC Session 2025 Zone 1 avec vocabulaire clé",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/432-epreuves-et-corriges-bepc-2025-cote-d-ivoire/39698-epreuve-et-corrige-d-anglais-bepc-session-2025-zone-1",
  },
  {
    titre: "Épreuve Physique-Chimie BEPC 2025 Zone 1",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Physique-Chimie",
    description: "Épreuve et corrigé de Physique-Chimie - BEPC Session 2025 Zone 1 avec explications détaillées",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/432-epreuves-et-corriges-bepc-2025-cote-d-ivoire/39707-epreuve-et-corrige-de-physique-chimie-bepc-session-2025-zone-1",
  },
  {
    titre: "Épreuve SVT BEPC 2025 Zone 1",
    type: "Annale",
    categorie: "BEPC",
    matiere: "SVT",
    description: "Épreuve et corrigé de Sciences de la Vie et de la Terre - BEPC Session 2025 Zone 1",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/432-epreuves-et-corriges-bepc-2025-cote-d-ivoire/39710-epreuve-et-corrige-de-sciences-de-la-vie-et-de-la-terre-bepc-session-2025-zone-1",
  },
  {
    titre: "Épreuve Français BEPC 2025 Zone 3",
    type: "Annale",
    categorie: "BEPC",
    matiere: "Français",
    description: "Épreuve et corrigé de Composition Française - BEPC Session 2025 Zone 3",
    annee: "2025",
    icon: FileText,
    pdfUrl: "https://epreuvesetcorriges.com/categories/cote-d-ivoire/examens/bepc/432-epreuves-et-corriges-bepc-2025-cote-d-ivoire/39701-epreuve-et-corrige-de-composition-francaise-bepc-session-2025-zone-3",
  },
  // Autres ressources
  {
    titre: "Annales BAC D Physique-Chimie 2023",
    type: "Annale",
    categorie: "BAC",
    matiere: "Physique-Chimie",
    description: "Toutes les épreuves de Physique-Chimie série D avec corrections détaillées",
    annee: "2023",
    icon: FileText,
  },
  {
    titre: "Fiche Révision - Théorème de Pythagore",
    type: "Fiche",
    categorie: "BEPC",
    matiere: "Mathématiques",
    description: "Fiche synthétique avec exercices types et astuces de résolution",
    icon: BookOpen,
  },
  {
    titre: "Vidéo - Les Fonctions Polynômes",
    type: "Vidéo",
    categorie: "BAC",
    matiere: "Mathématiques",
    description: "Cours complet en vidéo de 45 minutes avec exercices corrigés",
    duree: "45 min",
    icon: Video,
  },
  {
    titre: "Fiche Révision - Le Système Nerveux",
    type: "Fiche",
    categorie: "BAC",
    matiere: "SVT",
    description: "Synthèse complète avec schémas et questions types d'examen",
    icon: BookOpen,
  },
  {
    titre: "Vidéo - La Dissertation en Français",
    type: "Vidéo",
    categorie: "BAC",
    matiere: "Français",
    description: "Méthodologie complète de la dissertation littéraire",
    duree: "30 min",
    icon: Video,
  },
  {
    titre: "Annales BAC C Mathématiques 2023",
    type: "Annale",
    categorie: "BAC",
    matiere: "Mathématiques",
    description: "Sujets série C avec corrections complètes et barèmes officiels",
    annee: "2023",
    icon: FileText,
  },
];

const typeColors = {
  Annale: "bg-primary/10 text-primary border-primary/20",
  Fiche: "bg-success/10 text-success border-success/20",
  Vidéo: "bg-accent/10 text-accent border-accent/20",
};

const Ressources = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRessources = ressources.filter((ressource) => {
    const matchCategory = selectedCategory === "Toutes" || 
      ressource.categorie === selectedCategory || 
      ressource.matiere === selectedCategory;
    const matchSearch = ressource.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ressource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Ressources Pédagogiques
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Annales corrigées, fiches de révision et vidéos de cours pour optimiser vos révisions
          </p>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-primary/5 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-display font-bold text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Annales corrigées</p>
              </CardContent>
            </Card>

            <Card className="border-success/20 bg-success/5 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-display font-bold text-success mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Fiches de révision</p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5 text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-display font-bold text-accent mb-2">30+</div>
                <p className="text-sm text-muted-foreground">Vidéos de cours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recherche et filtres */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Barre de recherche */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une ressource..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste des ressources */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRessources.map((ressource, index) => {
                const Icon = ressource.icon;
                return (
                  <Card key={index} className="border-border hover:shadow-medium transition-all group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <Badge className={`${typeColors[ressource.type as keyof typeof typeColors]} border`}>
                          {ressource.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-foreground line-clamp-2">
                        {ressource.titre}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{ressource.categorie}</Badge>
                        <Badge variant="outline" className="text-xs">{ressource.matiere}</Badge>
                        {ressource.annee && (
                          <Badge variant="outline" className="text-xs">{ressource.annee}</Badge>
                        )}
                        {ressource.duree && (
                          <Badge variant="outline" className="text-xs">{ressource.duree}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {ressource.description}
                      </p>
                      <Button 
                        variant="hero" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          if (ressource.pdfUrl) {
                            window.open(ressource.pdfUrl, '_blank');
                          }
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredRessources.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  Aucune ressource trouvée pour cette recherche
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Accès élèves */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-success text-success-foreground border-0 shadow-strong">
            <CardContent className="p-8 md:p-12 text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h2 className="font-display font-bold text-3xl mb-4">
                Accès Complet aux Ressources
              </h2>
              <p className="text-lg text-success-foreground/90 mb-6 max-w-2xl mx-auto">
                Inscrivez-vous au programme CEMS pour accéder à l'intégralité de notre bibliothèque 
                de ressources : annales, fiches, vidéos, quiz et plus encore
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="bg-success-foreground text-success hover:bg-success-foreground/90 border-0">
                  S'inscrire maintenant
                </Button>
                <Button variant="outline" size="lg" className="border-success-foreground/30 text-success-foreground hover:bg-success-foreground/10">
                  En savoir plus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Ressources;
