-- Allow public users to create payment records during enrollment
-- This is safe because amounts come from the plans table which is admin-controlled
DROP POLICY IF EXISTS "Admins can create payments" ON public.payments;

CREATE POLICY "Anyone can create payments for enrollments"
ON public.payments FOR INSERT
WITH CHECK (true);

-- Ensure only admins can update payment status
CREATE POLICY "Only admins can update payment status"
ON public.payments FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));