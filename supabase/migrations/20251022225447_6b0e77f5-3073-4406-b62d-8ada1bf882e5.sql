-- Supprimer les index existants s'ils existent
DROP INDEX IF EXISTS public.idx_inscriptions_statut;
DROP INDEX IF EXISTS public.idx_inscriptions_created_at;
DROP INDEX IF EXISTS public.idx_inscriptions_telephone;

-- Recréer les index
CREATE INDEX idx_inscriptions_statut ON public.inscriptions(statut);
CREATE INDEX idx_inscriptions_created_at ON public.inscriptions(created_at DESC);
CREATE INDEX idx_inscriptions_telephone ON public.inscriptions(telephone_parent);