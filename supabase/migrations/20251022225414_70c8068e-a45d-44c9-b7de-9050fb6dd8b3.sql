-- Table des inscriptions
CREATE TABLE IF NOT EXISTS public.inscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Informations élève
  nom_complet_eleve TEXT NOT NULL,
  classe_actuelle TEXT NOT NULL CHECK (classe_actuelle IN ('3e', '1re', 'Tle')),
  programme_souhaite TEXT NOT NULL CHECK (programme_souhaite IN ('BEPC', 'BAC')),
  ecole_actuelle TEXT NOT NULL,
  
  -- Contact parent/tuteur
  nom_parent TEXT NOT NULL,
  telephone_parent TEXT NOT NULL,
  email_parent TEXT,
  
  -- Formule choisie
  formule TEXT NOT NULL CHECK (formule IN ('Mensuel BEPC', 'Mensuel BAC', 'Trimestriel BEPC', 'Trimestriel BAC')),
  montant INTEGER NOT NULL,
  
  -- Statut
  statut TEXT NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'contacte', 'confirme', 'annule')),
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index pour recherches fréquentes
CREATE INDEX idx_inscriptions_statut ON public.inscriptions(statut);
CREATE INDEX idx_inscriptions_created_at ON public.inscriptions(created_at DESC);
CREATE INDEX idx_inscriptions_telephone ON public.inscriptions(telephone_parent);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inscriptions_updated_at
  BEFORE UPDATE ON public.inscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies (accessible en lecture seule par les admins, création publique)
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

-- Permettre l'insertion publique (formulaire d'inscription)
CREATE POLICY "Permettre insertion publique"
  ON public.inscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permettre la lecture pour tous (pour l'instant, à restreindre plus tard)
CREATE POLICY "Permettre lecture publique"
  ON public.inscriptions
  FOR SELECT
  TO anon
  USING (true);