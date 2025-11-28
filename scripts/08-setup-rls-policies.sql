-- Enable Row Level Security on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on services" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on providers" ON providers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read access on provider_services" ON provider_services
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on portfolio" ON portfolio
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on reviews" ON reviews
    FOR SELECT USING (true);

-- For bookings, we'll allow read access for now (you can restrict this later based on user authentication)
CREATE POLICY "Allow public read access on bookings" ON bookings
    FOR SELECT USING (true);

-- Allow public insert on bookings (for booking creation)
CREATE POLICY "Allow public insert on bookings" ON bookings
    FOR INSERT WITH CHECK (true);
