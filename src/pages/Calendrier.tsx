import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const evenements = [
  {
    date: "15 Janvier 2025",
    titre: "Session de rentrée - Programme BEPC",
    type: "Session",
    horaire: "14h00 - 17h00",
    lieu: "CEMS - Salle A",
    description: "Début du programme de renforcement pour les élèves de 3ème.",
  },
  {
    date: "20 Janvier 2025",
    titre: "Session de rentrée - Programme BAC",
    type: "Session",
    horaire: "15h00 - 18h00",
    lieu: "CEMS - Salle B",
    description: "Lancement du programme d'excellence pour les terminales.",
  },
  {
    date: "15 Mars 2025",
    titre: "1er Examen Blanc BEPC",
    type: "Examen",
    horaire: "08h00 - 12h00",
    lieu: "CEMS - Conditions réelles",
    description: "Premier examen blanc du trimestre en conditions d'examen.",
  },
  {
    date: "22 Mars 2025",
    titre: "1er Examen Blanc BAC",
    type: "Examen",
    horaire: "08h00 - 13h00",
    lieu: "CEMS - Conditions réelles",
    description: "Première simulation complète du baccalauréat.",
  },
  {
    date: "5 Avril 2025",
    titre: "Atelier Gestion du Stress",
    type: "Atelier",
    horaire: "10h00 - 12h00",
    lieu: "CEMS - Salle de conférence",
    description: "Techniques de gestion du stress et de confiance en soi avant les examens.",
  },
  {
    date: "10 Juin 2025",
    titre: "2ème Examen Blanc BEPC",
    type: "Examen",
    horaire: "08h00 - 12h00",
    lieu: "CEMS - Conditions réelles",
    description: "Deuxième examen blanc avec correction détaillée.",
  },
  {
    date: "15 Juin 2025",
    titre: "2ème Examen Blanc BAC",
    type: "Examen",
    horaire: "08h00 - 13h00",
    lieu: "CEMS - Conditions réelles",
    description: "Simulation finale avant les épreuves officielles.",
  },
  {
    date: "25 Juin 2025",
    titre: "Révisions Intensives BEPC",
    type: "Révision",
    horaire: "09h00 - 17h00",
    lieu: "CEMS - Toutes salles",
    description: "Journée intensive de révisions avec focus sur les points clés.",
  },
];

const typeColors = {
  Session: "bg-primary/10 text-primary border-primary/20",
  Examen: "bg-success/10 text-success border-success/20",
  Atelier: "bg-accent/10 text-accent border-accent/20",
  Révision: "bg-primary-light/10 text-primary-light border-primary-light/20",
};

const Calendrier = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">
            Calendrier & Examens Blancs
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-6">
            Planifiez votre réussite avec notre calendrier complet des sessions, examens blancs et ateliers
          </p>
          <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0">
            <Download className="w-4 h-4 mr-2" />
            Télécharger le calendrier (.ics)
          </Button>
        </div>
      </section>

      {/* Informations */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">3 Sessions / Semaine</h3>
                <p className="text-sm text-muted-foreground">
                  Planning adapté aux emplois du temps scolaires
                </p>
              </CardContent>
            </Card>

            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-6 text-center">
                <Clock className="w-10 h-10 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">1 Examen Blanc / Trimestre</h3>
                <p className="text-sm text-muted-foreground">
                  En conditions réelles d'examen
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6 text-center">
                <MapPin className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Ateliers Réguliers</h3>
                <p className="text-sm text-muted-foreground">
                  Méthodologie et coaching mental
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Liste des événements */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8 text-center">
            Événements à Venir
          </h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {evenements.map((event, index) => (
              <Card key={index} className="border-border hover:shadow-medium transition-all">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded-lg bg-gradient-hero flex flex-col items-center justify-center text-primary-foreground flex-shrink-0">
                        <span className="text-xs font-medium">
                          {event.date.split(' ')[1]}
                        </span>
                        <span className="text-2xl font-bold">
                          {event.date.split(' ')[0]}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-foreground">
                          {event.titre}
                        </CardTitle>
                      </div>
                    </div>
                    <Badge 
                      className={`${typeColors[event.type as keyof typeof typeColors]} border self-start sm:self-center`}
                    >
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {event.horaire}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-success" />
                      {event.lieu}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-hero text-primary-foreground border-0">
              <CardContent className="p-8">
                <h3 className="font-display font-bold text-2xl mb-3">
                  Recevez les Rappels d'Événements
                </h3>
                <p className="mb-6 text-primary-foreground/90">
                  Abonnez-vous à notre calendrier pour recevoir des notifications automatiques 
                  avant chaque session, examen blanc et atelier
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0">
                    <Download className="w-4 h-4 mr-2" />
                    S'abonner au calendrier
                  </Button>
                  <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Synchroniser avec Google Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Examens blancs - Informations détaillées */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-foreground mb-6 text-center">
              À Propos des Examens Blancs
            </h2>
            <Card className="border-border">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-xl text-foreground mb-3 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-primary" />
                    Conditions Réelles d'Examen
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nos examens blancs se déroulent exactement comme les épreuves officielles : 
                    mêmes durées, mêmes consignes, même niveau de difficulté. Cela permet à nos élèves 
                    de se familiariser avec les conditions réelles et de gérer leur stress le jour J.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl text-foreground mb-3 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-success" />
                    Correction Détaillée
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Chaque copie est corrigée minutieusement avec des commentaires personnalisés. 
                    Une séance de correction collective permet de revoir les points clés et d'identifier 
                    les erreurs communes à éviter.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-xl text-foreground mb-3 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-accent" />
                    Résultats et Classements
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Les résultats sont publiés sous 48h avec un classement anonyme pour motiver 
                    chaque élève. Un rapport détaillé de progression est envoyé aux parents avec 
                    recommandations personnalisées.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendrier;
