# UtilityHub 🏠✨

> Your One-Stop Solution for Professional Home Services

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat-square&logo=supabase)](https://supabase.com/)

## 🌟 Overview

**UtilityHub** is a modern, full-stack web application that revolutionizes how people access and book professional home services in India. Built with Next.js 15 and powered by Supabase, it provides a seamless platform connecting customers with verified service providers across multiple categories including cleaning, plumbing, electrical, renovation, beauty, and automotive services.

### ✨ Key Features

- 🔐 **Secure Authentication** - User authentication powered by Supabase with protected routes
- 🎯 **Smart Service Discovery** - Browse services by category with dynamic pricing based on demand
- 👷 **Verified Providers** - Connect with trusted, verified service professionals
- 💳 **Integrated Payments** - Razorpay payment gateway integration for secure transactions
- 📱 **Responsive Design** - Beautiful, mobile-first UI built with Tailwind CSS and Radix UI
- 🌓 **Dark Mode Support** - Toggle between light and dark themes
- 📊 **Dynamic Pricing** - Real-time price adjustments based on service demand levels
- 🚨 **Emergency Services** - Quick access to urgent service needs
- ⭐ **Provider Ratings** - Comprehensive review and rating system
- 📅 **Easy Booking** - Streamlined appointment scheduling system
- 👤 **User Dashboard** - Manage bookings, profile, and settings
- 🎨 **Modern Animations** - Smooth transitions with Framer Motion

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4 + Tailwind Animate
- **UI Components**: Radix UI primitives (Accordion, Dialog, Dropdown, etc.)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context API

**Backend:**
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with SSR
- **Storage**: Supabase Storage (for images)

**Payment:**
- **Gateway**: Razorpay

**Development Tools:**
- **Build Tool**: Next.js with Turbopack support
- **CSS Processing**: PostCSS + Autoprefixer
- **Package Manager**: npm

### Project Structure

```
utility-hub/
├── app/                        # Next.js App Router pages
│   ├── about/                  # About page
│   ├── admin/                  # Admin dashboard
│   ├── api/                    # API routes (payments, bookings)
│   ├── auth/                   # Authentication pages
│   ├── contact/                # Contact page
│   ├── dashboard/              # User dashboard
│   ├── emergency/              # Emergency services
│   ├── faq/                    # FAQ page
│   ├── how-it-works/           # How it works page
│   ├── login/                  # Login page
│   ├── profile/                # User profile
│   ├── provider-registration/  # Provider signup
│   ├── providers/              # Provider listings & details
│   ├── services/               # Service listings & details
│   ├── settings/               # User settings
│   ├── signup/                 # User signup
│   ├── subscription/           # Subscription plans
│   ├── terms/                  # Terms & conditions
│   ├── privacy/                # Privacy policy
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/                 # React components
│   ├── ui/                     # Reusable UI components (57 components)
│   ├── emergency-services.tsx  # Emergency service section
│   ├── featured-providers.tsx  # Provider cards
│   ├── footer.tsx              # Footer component
│   ├── hero-section.tsx        # Hero section with animations
│   ├── navbar.tsx              # Navigation bar
│   ├── provider-card.tsx       # Provider card component
│   ├── razorpay-payment.tsx    # Payment integration
│   └── service-card.tsx        # Service card component
├── contexts/                   # React contexts
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
│   ├── supabase.ts            # Supabase client & helpers
│   ├── utils.ts               # Utility functions
│   └── cookies.ts             # Cookie management
├── public/                     # Static assets
├── scripts/                    # Build scripts
├── styles/                     # Additional styles
├── middleware.ts              # Next.js middleware (auth)
├── tailwind.config.ts         # Tailwind configuration
├── next.config.mjs            # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database)
- Razorpay account (for payments)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/utility-hub.git
cd utility-hub
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. **Set up Supabase Database**

Create the following tables in your Supabase project:

**Services Table (`services_page`)**
```sql
CREATE TABLE services_page (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  image_url TEXT,
  base_price INTEGER NOT NULL,
  current_price INTEGER NOT NULL,
  demand_level TEXT CHECK (demand_level IN ('low', 'medium', 'high', 'very-high')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Providers Table**
```sql
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  image_url TEXT,
  bio TEXT,
  profession TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  years_experience INTEGER,
  completed_jobs INTEGER DEFAULT 0,
  location TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  working_hours TEXT,
  response_time TEXT,
  languages TEXT[],
  certifications TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Bookings Table**
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  provider_id UUID REFERENCES providers(id),
  service_id TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🎨 Features in Detail

### Service Categories

- **Cleaning** - Home cleaning, carpet cleaning, deep cleaning
- **Plumbing** - Repairs, installations, maintenance
- **Electrical** - Wiring, repairs, installations
- **Renovation** - Interior design, remodeling
- **Beauty** - Men's and women's grooming services
- **Automotive** - Car repair and maintenance
- **Pest Control** - Home and office pest solutions

### Dynamic Pricing System

Services feature intelligent demand-based pricing:
- **Low Demand** 🟢 - Standard pricing
- **Medium Demand** 🟡 - Slight price increase
- **High Demand** 🟠 - Higher prices
- **Very High Demand** 🔴 - Peak pricing with priority booking

### User Roles

1. **Customers** - Browse, book, and manage services
2. **Service Providers** - Offer services, manage bookings
3. **Admins** - Platform management and oversight

## 🔒 Security Features

- **Authentication Middleware** - Protected routes for authenticated users
- **Supabase Row Level Security** - Database-level access control
- **Secure Payments** - Razorpay integration with order verification
- **Environment Variables** - Sensitive data protection
- **HTTPS Enforcement** - Secure data transmission

## 🎯 Roadmap

- [ ] AI-powered service recommendations
- [ ] Live video consultations with providers
- [ ] Subscription plans for regular services
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Real-time booking notifications
- [ ] Advanced analytics dashboard
- [ ] Provider earnings management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Founder & CEO** - Leading the vision for transforming home services
- **CTO** - Building innovative technology solutions
- **Head of Operations** - Ensuring quality service delivery

## 📞 Contact

- **Website**: [UtilityHub](https://your-domain.com)
- **Email**: support@utilityhub.com
- **GitHub**: [@your-username](https://github.com/your-username)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Razorpay](https://razorpay.com/) - Payment gateway
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Unsplash](https://unsplash.com/) - High-quality images

---

<div align="center">
  Made with ❤️ by the UtilityHub Team
  <br>
  <sub>Transforming how people access professional services</sub>
</div>
