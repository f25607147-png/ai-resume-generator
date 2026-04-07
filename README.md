# ResumeAI — AI-Powered Resume Builder

A production-ready, full-stack resume builder built with Next.js 14, Tailwind CSS, Supabase, and Groq AI. Create professional resumes in minutes with AI-generated content tailored to any job description.

## Features

- **AI Generation** — Groq AI (Llama 3 70B) generates tailored summaries, experience bullets, and skills
- **3 Templates** — Modern (two-column), Classic (traditional), Minimal (elegant)
- **Live Preview** — Real-time resume preview as you edit
- **PDF Export** — Export resumes via browser print API
- **Authentication** — Supabase email/password auth with email verification
- **Payments** — Stripe subscriptions (Free & Pro plans)
- **Email** — Resend for welcome and verification emails
- **SEO** — Sitemap, robots.txt, OpenGraph metadata on all pages

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL + Row Level Security)
- **AI**: Groq SDK (`llama3-70b-8192`)
- **Payments**: Stripe
- **Email**: Resend

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `GROQ_API_KEY` | Groq API key from [console.groq.com](https://console.groq.com) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRO_PRICE_ID` | Stripe Price ID for Pro plan |
| `RESEND_API_KEY` | Resend API key |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `http://localhost:3000`) |

### 3. Set up Supabase database

Run the migration in your Supabase SQL editor or with the CLI:

```bash
# Using Supabase CLI
supabase db push
```

The migration at `supabase/migrations/001_initial.sql` creates:
- `profiles` table with subscription plan tracking
- `resumes` table with JSONB resume data
- Row Level Security policies for both tables
- Trigger to auto-create profile on user signup

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 5. Build for production

```bash
npm run build
```

## Project Structure

```
src/
  app/
    (auth)/          # Login, signup, verify-email pages
    (dashboard)/     # Protected dashboard, resume editor/viewer
    (marketing)/     # Landing, pricing, privacy, terms pages
    api/             # API routes (resumes CRUD, AI generate, Stripe, auth)
  components/
    resume/          # ResumeEditor, ResumePreview, TemplateSelector
    resume/templates/# ModernTemplate, ClassicTemplate, MinimalTemplate
    ui/              # Button, Input, Card, Modal, Navbar, Footer, DashboardSidebar
  lib/
    supabase/        # Browser & server Supabase clients + middleware
    groq.ts          # Groq AI client and generation function
    stripe.ts        # Stripe client and plan configuration
    resend.ts        # Resend email client and templates
    pdf.ts           # PDF export utility (browser print)
    utils.ts         # cn() utility for Tailwind class merging
  types/             # TypeScript interfaces (Resume, ResumeData, etc.)
supabase/
  migrations/        # SQL migration files
```

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/resumes` | GET, POST | List or create resumes |
| `/api/resumes/[id]` | GET, PUT, DELETE | Individual resume operations |
| `/api/generate` | POST | AI content generation via Groq |
| `/api/stripe/checkout` | POST | Create Stripe checkout session |
| `/api/stripe/webhook` | POST | Handle Stripe subscription events |
| `/api/auth/callback` | GET | Supabase OAuth callback |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy

### Stripe Webhooks

Set your webhook endpoint to `https://your-domain.com/api/stripe/webhook` and subscribe to:
- `checkout.session.completed`
- `customer.subscription.deleted`

## License

MIT
