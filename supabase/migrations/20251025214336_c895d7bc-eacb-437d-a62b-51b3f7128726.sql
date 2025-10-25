-- Diviser tous les montants des plans par 10
UPDATE public.plans
SET price_cfa = price_cfa / 10
WHERE is_active = true;