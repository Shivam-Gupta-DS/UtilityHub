-- Create services_page table for the services page display
CREATE TABLE IF NOT EXISTS services_page (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    image_url TEXT,
    base_price INTEGER NOT NULL,
    current_price INTEGER NOT NULL,
    demand_level TEXT CHECK (demand_level IN ('low', 'medium', 'high', 'very-high')) DEFAULT 'medium',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert sample data for services page
INSERT INTO services_page (id, name, description, category, subcategory, image_url, base_price, current_price, demand_level) VALUES
('1', 'Professional Home Cleaning', 'Expert home cleaning services with eco-friendly products', 'Cleaning', NULL, 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop', 199, 249, 'medium'),
('2', 'Plumbing Solutions', 'Expert plumbing repair and installation services', 'Plumbing', NULL, 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1000&auto=format&fit=crop', 180, 180, 'low'),
('3', 'Comprehensive Appliance Repair', 'Repairs for all electrical appliances and systems', 'Electrical', NULL, 'https://media.istockphoto.com/id/1425979071/photo/maintenance-of-the-air-conditioner.webp?a=1&b=1&s=612x612&w=0&k=20&c=S9Vo80AgoCi0nHlAfkmC11u3yA0xtmg3twnpAykt2Us=', 220, 320, 'very-high'),
('4', 'Interior Renovation', 'Complete home renovation and interior design services', 'Renovation', NULL, 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?q=80&w=1000&auto=format&fit=crop', 250, 300, 'high'),
('5', 'Women''s Hair Styling', 'Professional hair styling, cutting, and coloring services for women', 'Beauty', 'Women', 'https://mustsharenews.com/wp-content/uploads/2023/11/MSN-Featured-10.jpg', 180, 220, 'medium'),
('6', 'Automotive Repair & Maintenance', 'Professional vehicle repair and maintenance services', 'Automotive', NULL, 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e', 200, 250, 'medium'),
('7', 'Pest Control Services', 'Effective pest control solutions for your home', 'Cleaning', NULL, 'https://irp.cdn-website.com/23314c60/dms3rep/multi/s2+(64).jpg', 170, 170, 'low'),
('8', 'Carpentry & Furniture Repair', 'Custom carpentry and furniture repair services', 'Renovation', NULL, 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1000&auto=format&fit=crop', 190, 190, 'medium'),
('9', 'Deep Cleaning Services', 'Thorough cleaning of all surfaces, fixtures, and hard-to-reach areas', 'Cleaning', NULL, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop', 220, 280, 'high'),
('10', 'Bathroom Renovation', 'Complete bathroom remodeling and fixture installation', 'Renovation', NULL, 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1000&auto=format&fit=crop', 250, 350, 'high'),
('11', 'Electrical Wiring & Repairs', 'Professional electrical services for your home and office', 'Electrical', NULL, 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop', 180, 230, 'medium'),
('12', 'Women''s Hair Coloring', 'Professional hair coloring and highlighting services for women', 'Beauty', 'Women', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop', 150, 190, 'high'),
('13', 'Car Detailing', 'Comprehensive cleaning and restoration of your vehicle', 'Automotive', NULL, 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000&auto=format&fit=crop', 220, 270, 'medium'),
('14', 'Kitchen Renovation', 'Complete kitchen remodeling with modern designs', 'Renovation', NULL, 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1000&auto=format&fit=crop', 250, 350, 'high'),
('15', 'AC Installation & Repair', 'Professional air conditioning services', 'Electrical', NULL, 'https://media.istockphoto.com/id/1425979071/photo/maintenance-of-the-air-conditioner.webp?a=1&b=1&s=612x612&w=0&k=20&c=S9Vo80AgoCi0nHlAfkmC11u3yA0xtmg3twnpAykt2Us=', 230, 290, 'high'),
('16', 'Carpet Cleaning', 'Deep cleaning for carpets and upholstery', 'Cleaning', NULL, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1000&auto=format&fit=crop', 160, 200, 'medium'),
('17', 'Women''s Facial Treatment', 'Rejuvenating facial treatments for glowing skin', 'Beauty', 'Women', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop', 200, 250, 'high'),
('18', 'Women''s Manicure & Pedicure', 'Professional nail care and design services', 'Beauty', 'Women', 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1000&auto=format&fit=crop', 170, 210, 'medium'),
('19', 'Women''s Makeup Services', 'Professional makeup application for all occasions', 'Beauty', 'Women', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000&auto=format&fit=crop', 180, 230, 'high'),
('20', 'Women''s Waxing Services', 'Professional hair removal services', 'Beauty', 'Women', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop', 150, 180, 'medium'),
('21', 'Men''s Haircut & Styling', 'Professional haircuts and styling for men', 'Beauty', 'Men', 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1000&auto=format&fit=crop', 150, 190, 'high'),
('22', 'Men''s Beard Grooming', 'Professional beard trimming and styling', 'Beauty', 'Men', 'https://th.bing.com/th/id/OIP.qH_BDO2AG4XlndaH3r543AHaE8?w=271&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7', 150, 170, 'medium'),
('23', 'Men''s Facial Treatment', 'Specialized facial treatments for men''s skin', 'Beauty', 'Men', 'https://cdn.activeman.com/wp-content/uploads/2023/04/10010107/men-skincare.jpeg', 180, 220, 'medium'),
('24', 'Men''s Manicure', 'Professional nail care services for men', 'Beauty', 'Men', 'https://sterlingballroomevents.com/wp-content/uploads/2019/10/GettyImages-674966894.jpg', 150, 170, 'low'),
('25', 'Men''s Hair Coloring', 'Professional hair and beard coloring services', 'Beauty', 'Men', 'https://thumbs.dreamstime.com/b/close-up-view-hairdresser-colouring-hair-man-salon-men-mask-lying-chair-229969181.jpg', 170, 210, 'medium'),
('26', 'Drain Cleaning', 'Professional drain unclogging and cleaning services', 'Plumbing', NULL, 'https://tandjrooterservice.com/wp-content/uploads/2024/04/Signs-You-Need-Professional-Drain-Cleaning-1024x538.jpg', 160, 200, 'high'),
('27', 'Water Heater Installation', 'Professional installation and repair of water heaters', 'Plumbing', NULL, 'https://hvacseer.com/wp-content/uploads/2022/01/Adjusting-the-water-heater-in-the-basement.jpg', 220, 270, 'medium'),
('28', 'Ceiling Fan Installation', 'Professional installation of ceiling fans', 'Electrical', NULL, 'https://media.istockphoto.com/id/1571179874/photo/technician-installing-wooden-ceiling-fan-in-kitchen.webp?b=1&s=612x612&w=0&k=20&c=3i6KkAZKiTieSsfSGaOjFpGs4IWQM9IJQ1EdVrpCEoY=', 150, 190, 'medium');

-- Enable RLS
ALTER TABLE services_page ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all users
CREATE POLICY "Allow read access to services_page" ON services_page
    FOR SELECT USING (true);

-- Create policy to allow insert/update/delete for authenticated users (for admin purposes)
CREATE POLICY "Allow full access to services_page for authenticated users" ON services_page
    FOR ALL USING (auth.role() = 'authenticated');
