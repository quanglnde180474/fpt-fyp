# FPT Playbook (FFYB) - Student Portal

A comprehensive student portal and documentation website for FPT University's First Year Playbook program. Built with Next.js 16, Neon PostgreSQL, and Tailwind CSS.

## Features

- **Landing Page** - Welcome page with hero section, features, testimonials, and CTA
- **Student Portal** - Course schedules, services, and resources
- **Documentation Hub** - Comprehensive guides with sidebar navigation
- **Handbook** - Student regulations, GPA calculation, exam info
- **FAQ** - Searchable frequently asked questions
- **Contact** - Contact form and support information
- **Admin Dashboard** - Content management system for admins
- **Authentication** - JWT-based admin login

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Neon PostgreSQL with raw SQL queries
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Auth**: JWT with Next.js Cookies API
- **UI Components**: shadcn/ui with Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Neon PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ffyb-portal
```

2. Install dependencies:
```bash
pnpm install
# or npm install / yarn install
```

3. Set up environment variables:
```bash
# .env.local
DATABASE_URL="postgresql://user:password@host/database"
JWT_SECRET="your-secret-key-change-in-production"
```

4. Initialize the database:
```bash
pnpm run db:init
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── admin/
│   │       └── login/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── pages/
│   │   ├── courses/
│   │   └── ...
│   ├── docs/
│   ├── student-portal/
│   ├── faq/
│   ├── contact/
│   ├── handbook/
│   ├── about/
│   └── page.tsx (landing page)
├── components/
│   ├── header.tsx
│   └── ui/ (shadcn/ui components)
├── lib/
│   ├── db.ts (database queries)
│   └── auth.ts (authentication utilities)
├── prisma/
│   └── schema.prisma
└── scripts/
    ├── init-db.ts (database setup)
    └── seed.ts (sample data)
```

## Database Schema

The project includes 7 main tables:

- **users** - Admin users for authentication
- **pages** - Documentation pages
- **courses** - Course information
- **schedules** - Class schedules and exam dates
- **services** - Student services
- **announcements** - Important announcements
- **faqs** - Frequently asked questions

## Admin Login

Demo credentials:
- Email: `admin@example.com`
- Password: `admin123`

Access the admin panel at `/admin/login`

## Key Pages

- `/` - Landing page
- `/student-portal` - Student services and schedules
- `/docs` - Documentation with sidebar navigation
- `/handbook` - Student handbook with regulations
- `/faq` - Searchable FAQ
- `/contact` - Contact form
- `/about` - About FFYB
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard

## Color System

- **Primary**: Orange (#FF7A3D) - Brand color for buttons and highlights
- **Secondary**: Peach (#E8C6C1) - Accent color for backgrounds
- **Neutral**: Light grays and whites - Clean, modern aesthetic
- **Text**: Dark gray/black for excellent readability

## Scripts

```bash
# Development
pnpm dev

# Build
pnpm build

# Production start
pnpm start

# Database initialization
pnpm run db:init

# Database seeding
pnpm run db:seed

# Linting
pnpm lint
```

## Deployment

This project is ready to deploy to Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

Or deploy manually:

```bash
pnpm build
pnpm start
```

## API Routes

### Admin Authentication
- `POST /api/admin/login` - Admin login endpoint

Additional API routes can be added for:
- Page CRUD operations
- Course management
- Schedule updates
- FAQ management

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is part of FPT University.

## Support

For issues or questions, please contact:
- Email: support@fpt.edu.vn
- Phone: +84 123 456 789

## Future Enhancements

- [ ] Email notifications for announcements
- [ ] Student user accounts for progress tracking
- [ ] Calendar view for schedules
- [ ] Search functionality across all content
- [ ] Mobile app version
- [ ] Real-time notifications
- [ ] Student forum/discussion boards
