-- Fix formule check constraint to accept actual plan codes
ALTER TABLE public.inscriptions 
DROP CONSTRAINT IF EXISTS inscriptions_formule_check;

ALTER TABLE public.inscriptions 
ADD CONSTRAINT inscriptions_formule_check 
CHECK (formule IN ('MENSUEL_BEPC', 'MENSUEL_BAC', 'TRIM_BEPC', 'TRIM_BAC'));