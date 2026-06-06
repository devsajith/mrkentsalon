# Booking Platform Template

A modern, enterprise-grade appointment booking platform with an intuitive admin dashboard and capacity management system. Built with a focus on scalability, type safety, and reusability.

## 🚀 Technology Stack

### Frontend
- **Next.js 16.2.6** - React framework with App Router and Server Components
- **React 19.2.4** - Latest React version with built-in optimization
- **TypeScript 5** - Strict mode enabled for type safety
- **Tailwind CSS 4** - Utility-first CSS framework with PostCSS 4
- **React Hook Form 7.76.1** - Efficient form state management
- **Zod 4.4.3** - TypeScript-first schema validation

### Backend & Database
- **Supabase** - Open-source Firebase alternative with PostgreSQL
  - Authentication (Email/Password)
  - Real-time database
  - Row-level security (RLS) support
- **@supabase/supabase-js 2.106.2** - Supabase JavaScript client
- **@supabase/ssr 0.10.3** - Server-side rendering utilities for Supabase

### Utilities
- **date-fns 4.4.0** - Modern date utility library
- **@hookform/resolvers 5.4.0** - Form validation integration

### Development Tools
- **ESLint 9** - Code quality and style enforcement
- **TypeScript 5** - Static type checking

## 📁 Project Structure

```
booking-platform-template/
├── app/                              # Next.js App Router
│   ├── page.tsx                     # Home page (displays bookings)
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   ├── login/                       # Public login page
│   │   └── page.tsx
│   ├── admin/                       # Admin routes
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Admin dashboard
│   │   └── settings/
│   │       └── page.tsx            # Settings page
│   ├── book/                        # Booking interface
│   └── api/                         # API routes
│
├── components/                       # Reusable React components
│   ├── Admin/                       # Admin-specific components
│   │   ├── AdminSidebar.tsx        # Navigation sidebar
│   │   ├── AuthGuard.tsx           # Authentication wrapper
│   │   ├── BookingTable.tsx        # Bookings list table
│   │   ├── DashBoardstats.tsx      # Statistics cards
│   │   ├── LogOutButton.tsx        # Logout functionality
│   │   ├── QuickActions.tsx        # Quick action buttons
│   │   ├── SettingsForm.tsx        # Settings form
│   │   └── TodayBookings.tsx       # Today's bookings widget
│   ├── Booking/                     # Booking components (expandable)
│   └── Ui/                          # Shared UI components
│
├── services/                        # Business logic & API calls
│   ├── auth.services.ts           # Authentication service
│   ├── booking.service.ts         # Booking CRUD operations
│   ├── availability.service.ts    # Slot generation & availability
│   ├── settings.service.ts        # Business settings management
│   └── publicbooking.service.ts   # Public booking service
│
├── lib/                            # Utility libraries
│   └── supabase.ts                # Supabase client initialization
│
├── modules/                        # Feature modules
│   ├── admin/                     # Admin module
│   ├── booking/                   # Booking module
│   └── settings/                  # Settings module
│
├── types/                          # TypeScript type definitions
│   └── booking.ts                 # Booking interface & types
│
├── utils/                          # Helper functions
│
├── public/                         # Static assets
│
├── docs/                           # Documentation
│   └── database.md               # Database schema
│
├── config/                         # Configuration files
│
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── tailwind.config.js             # Tailwind config
└── eslint.config.mjs              # ESLint config
```

## 🗄️ Database Schema

### Tables

#### `bookings`
Stores all customer bookings and appointment data.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| customer_name | String | Customer full name |
| phone | String | Customer phone number |
| booking_date | Date | Appointment date |
| slot_time | Time | Appointment time slot |
| status | String | Booking status (confirmed, cancelled, completed) |
| created_at | Timestamp | Record creation timestamp |

#### `business_settings`
Stores system configuration and business rules.

| Column | Type | Description |
|--------|------|-------------|
| key | String | Setting identifier |
| value | String | Setting value |
| opening_time | String | Business opening time (HH:MM) |
| closing_time | String | Business closing time (HH:MM) |
| slot_duration | Integer | Duration of each slot in minutes |
| slot_capacity | Integer | Maximum bookings per time slot |

### Booking Status Values
- `confirmed` - Booking is confirmed
- `cancelled` - Booking has been cancelled
- `completed` - Appointment has been completed

## 🔐 Authentication

The platform uses **Supabase Authentication** with email and password-based login:

- User credentials are validated against Supabase Auth
- Session management is handled by Supabase
- Protected routes use the `AuthGuard` component to check authentication
- Logout clears the Supabase session

## ✨ Key Features

### 1. Appointment Booking System
- **Dynamic Slot Generation** - Slots are generated based on business hours and slot duration
- **Capacity Management** - Each slot has a configurable maximum capacity
- **Availability Calculation** - Real-time availability checking based on existing bookings
- **Date & Time Selection** - Intuitive booking interface for customers

### 2. Admin Dashboard
- **Dashboard Statistics**
  - Today's bookings count
  - Upcoming appointments
  - Completed appointments
  - Quick overview of slot performance
  
- **Booking Management**
  - View all bookings in a table format
  - Filter and sort bookings
  - Update booking status (confirm, cancel, complete)
  - Search functionality
  
- **Settings Management**
  - Configure business hours (opening & closing time)
  - Set slot duration (e.g., 30 minutes, 1 hour)
  - Manage slot capacity
  - Update settings in real-time

- **User Management**
  - Admin login/logout
  - Session-based access control
  - Secure authentication guard

### 3. Availability Service
Intelligent slot availability system that:
- Generates time slots based on opening hours and duration
- Calculates remaining capacity for each slot
- Returns available and booked slot information
- Updates in real-time based on new bookings

### 4. Responsive Design
- Mobile-friendly interface
- Tailwind CSS utility-based styling
- Clean, modern UI components
- Accessible form inputs and interactive elements

## 🔄 Service Layer Architecture

### Auth Service (`services/auth.services.ts`)
```typescript
- signIn(email, password)        // User login
- signOut()                       // User logout
- getCurrentUser()               // Get authenticated user
- getSession()                   // Get current session
```

### Booking Service (`services/booking.service.ts`)
```typescript
- getBookings()                  // Fetch all bookings
- updateBookingStatus()          // Update booking status
- getDashboardStats()            // Get dashboard statistics
```

### Availability Service (`services/availability.service.ts`)
```typescript
- getAvailableSlots(date)        // Get slots for a specific date
- generateSlots()                // Internal: generate time slots
```

### Settings Service (`services/settings.service.ts`)
```typescript
- getSettings()                  // Fetch business settings
- updateSettings()               // Update business configuration
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd booking-platform-template
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase**
- Create tables: `bookings` and `business_settings`
- Configure row-level security policies
- Set up authentication users

5. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Linting
```bash
npm run lint
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 🎯 Use Cases

- **Service Appointments** - Hairdressers, salons, clinics
- **Consultation Bookings** - Consultants, coaches, advisors
- **Event Registration** - Classes, workshops, seminars
- **Resource Scheduling** - Meeting rooms, equipment rentals
- **Professional Services** - Dentists, therapists, lawyers

## 🔒 Security Features

- **Type-Safe Code** - Full TypeScript with strict mode
- **Form Validation** - Zod schemas for input validation
- **Authentication Guard** - Protected admin routes
- **Server-Side Rendering** - Secure session handling with SSR
- **Row-Level Security** - Supabase RLS policies (configurable)
- **Environment Variables** - Sensitive data protection

## 📦 Dependencies Overview

### Production
- `next` - React framework
- `react`, `react-dom` - UI library
- `@supabase/supabase-js` - Database & Auth
- `react-hook-form` - Form management
- `zod` - Validation
- `date-fns` - Date utilities
- `tailwindcss` - Styling

### Development
- `typescript` - Type checking
- `eslint` - Code quality
- `tailwindcss` - CSS framework
- Type definitions for React, Node.js

## 🚀 Future Enhancements

- Email notifications for bookings
- SMS reminders
- Payment integration
- Multi-location support
- Customer portal
- Automated cancellation policies
- Advanced reporting & analytics
- Calendar view
- Waitlist functionality

## 📝 Documentation

Refer to the `docs/` folder for additional documentation:
- [Database Schema](docs/database.md) - Detailed database structure

## 🤝 Contributing

This is a reusable template. Feel free to:
- Customize components
- Add new features
- Extend services
- Improve styling
- Add more validation rules

## 📄 License

MIT License - Feel free to use this template for your projects.