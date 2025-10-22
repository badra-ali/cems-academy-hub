-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create plans table
CREATE TABLE public.plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price_cfa INTEGER NOT NULL,
  billing TEXT NOT NULL CHECK (billing IN ('monthly', 'quarterly')),
  details TEXT,
  tag TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  weight INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider TEXT NOT NULL CHECK (provider IN ('ORANGE_MONEY', 'MTN_MOMO', 'MOOV_MONEY', 'CARD')),
  amount_cfa INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XOF',
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
  ref TEXT UNIQUE,
  metadata JSONB,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create track_events table
CREATE TABLE public.track_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL,
  meta JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table for admin access control
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Add payment_id to inscriptions table
ALTER TABLE public.inscriptions
ADD COLUMN payment_id UUID REFERENCES public.payments(id);

-- Enable RLS on all tables
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.track_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for plans (public read, admin write)
CREATE POLICY "Plans are viewable by everyone"
ON public.plans FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can insert plans"
ON public.plans FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update plans"
ON public.plans FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete plans"
ON public.plans FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for payments (admin only)
CREATE POLICY "Admins can view all payments"
ON public.payments FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create payments"
ON public.payments FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update payments"
ON public.payments FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for track_events (public insert for analytics, admin read)
CREATE POLICY "Anyone can track events"
ON public.track_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view track events"
ON public.track_events FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles (users can read their own, admins can manage)
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update inscriptions RLS policies (remove public read, add admin read)
DROP POLICY IF EXISTS "Permettre lecture publique" ON public.inscriptions;

CREATE POLICY "Admins can view all inscriptions"
ON public.inscriptions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update inscriptions"
ON public.inscriptions FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete inscriptions"
ON public.inscriptions FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_plans_updated_at
BEFORE UPDATE ON public.plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial plans data
INSERT INTO public.plans (code, name, price_cfa, billing, details, tag, weight) VALUES
('MENSUEL_BEPC', 'Mensuel BEPC', 50000, 'monthly', '3 sessions/semaine · Accès ressources · Support WhatsApp', NULL, 10),
('MENSUEL_BAC', 'Mensuel BAC', 60000, 'monthly', '3 sessions/semaine · Accès ressources · Support WhatsApp', 'Populaire', 20),
('TRIM_BEPC', 'Trimestriel BEPC', 135000, 'quarterly', '3 sessions/semaine · 1 examen blanc · Coaching inclus', 'Économie 10%', 30),
('TRIM_BAC', 'Trimestriel BAC', 162000, 'quarterly', '3 sessions/semaine · 1 examen blanc · Mentorat inclus', 'Économie 10%', 40);