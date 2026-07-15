-- 1. Create profiles table if it does not exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'customer',
  full_name TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create settings table and insert default settings if not exists
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'global-settings-id',
  shipping JSONB NOT NULL DEFAULT '{"flat_rate": 99, "free_threshold": 1999, "cod_charge": 50, "online_discount": 0}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default row if settings is empty
INSERT INTO public.settings (id, shipping)
VALUES ('global-settings-id', '{"flat_rate": 99, "free_threshold": 1999, "cod_charge": 50, "online_discount": 0}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 3. Create global_faqs table if not exists
CREATE TABLE IF NOT EXISTS public.global_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Add is_active column to coupons table if not exists
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 5. Disable Row Level Security (ensures smooth connection without permission issues)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_faqs DISABLE ROW LEVEL SECURITY;

-- 6. Grant API roles full table access permissions explicitly
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
