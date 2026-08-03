# Database Schema & RLS Policies

## Tables

### 1. `bookings`
Stores customer booking requests, reference numbers, slot times, and statuses (`confirmed`, `cancelled`, `completed`).

### 2. `services`
Stores salon services, pricing, duration, and active status.

### 3. `business_settings`
Stores system configurations (e.g. `opening_time`, `closing_time`, `slot_capacity`, `walkin_capacity`).

---

## Row Level Security (RLS) Policies

All tables are secured using RLS in Supabase. The complete SQL script for enabling RLS policies is available in [`supabase_rls_policies.sql`](file:///E:/kannan/mrkentsalon/supabase_rls_policies.sql).

- **Public (`anon`)**: Can read services & settings and insert/read bookings to check slot availability.
- **Admin (`authenticated`)**: Full CRUD access (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) across all tables.