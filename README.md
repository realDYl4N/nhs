# ProstaVita - Prostate Health Supplements E-commerce

A complete e-commerce website for selling nutritional prostate supplements, built with Next.js 14+, TypeScript, Tailwind CSS, Stripe, Prisma, and NextAuth.

## Features

### Core E-commerce
- **Product Catalog** - Browse products with filtering by benefit, price, and stock
- **Product Detail Pages** - Comprehensive product information with image galleries, ingredients, supplement facts, and reviews
- **Shopping Cart** - Persistent cart with localStorage (guest) and database sync (logged-in users)
- **Checkout** - Secure Stripe integration with guest checkout support
- **Order Confirmation** - Email notifications for order updates

### User Features
- **Authentication** - Email/password login with NextAuth
- **User Dashboard** - Order history, saved addresses, subscription management
- **Account Settings** - Profile management and preferences

### Admin Features
- **Admin Dashboard** - Sales overview, recent orders, low stock alerts
- **Product Management** - CRUD operations for products
- **Order Management** - View and update order status
- **Inventory Tracking** - Stock level monitoring

### Content Pages
- **Homepage** - Hero section, featured products, benefits, testimonials
- **About Page** - Brand story and quality commitment
- **Blog** - Educational content about prostate health
- **FAQ** - Common questions and answers
- **Contact** - Contact form and support information

### Legal & Compliance
- **Privacy Policy** - GDPR/CCPA compliant
- **Terms of Service** - Legal terms and conditions
- **Cookie Consent** - GDPR-compliant cookie banner
- **FDA Disclaimer** - Required supplement disclaimers

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma with SQLite (easily migrate to PostgreSQL)
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Email**: Nodemailer
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prostate-supplements
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-user"
SMTP_PASSWORD="your-password"
EMAIL_FROM="noreply@yourdomain.com"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="ProstaVita"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Seed the database with sample data:
```bash
npx tsx prisma/seed.ts
```

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Test Accounts

After seeding, you can use these accounts:

- **Admin**: admin@prostavita.com / admin123
- **User**: user@example.com / user123

## Stripe Setup

### Test Mode

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your test API keys from the Dashboard
3. Add keys to `.env`

### Webhook (Local Development)

1. Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
```

2. Login and forward webhooks:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

3. Add the webhook secret to `.env`

### Test Cards

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Auth**: 4000 0025 0000 3155

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── account/           # User account pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── checkout/          # Checkout flow
│   ├── products/          # Product pages
│   └── ...                # Content pages
├── components/
│   ├── cart/              # Cart components
│   ├── checkout/          # Checkout components
│   ├── layout/            # Header, footer
│   ├── product/           # Product components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configs
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   ├── stripe.ts          # Stripe configuration
│   ├── email.ts           # Email utilities
│   └── utils.ts           # Helper functions
├── store/                 # Zustand stores
│   └── cart.ts            # Cart state management
└── types/                 # TypeScript types
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Migration

For production, migrate from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `DATABASE_URL` in `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

3. Run migrations:
```bash
npx prisma migrate deploy
```

## Security Considerations

- All payments processed securely through Stripe
- Passwords hashed with bcrypt
- CSRF protection via NextAuth
- Input validation with Zod
- SQL injection prevention via Prisma
- XSS protection through React's default escaping

## License

This project is for educational/demonstration purposes.
