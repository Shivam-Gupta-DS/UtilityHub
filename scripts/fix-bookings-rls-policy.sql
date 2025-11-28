-- Remove all existing INSERT policies that require authentication
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.bookings;
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON public.bookings;

-- Create a single permissive INSERT policy that allows public inserts
CREATE POLICY "Allow public insert for bookings"
ON public.bookings
FOR INSERT
TO public
WITH CHECK (true);

-- Verify the policy is created
SELECT * FROM pg_policies WHERE tablename = 'bookings';
