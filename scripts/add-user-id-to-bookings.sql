-- Add user_id column to bookings table
ALTER TABLE public.bookings
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index on user_id for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);

-- Update the booking table comment
COMMENT ON COLUMN public.bookings.user_id IS 'Reference to the authenticated user who made the booking';
