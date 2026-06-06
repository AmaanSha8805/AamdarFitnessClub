-- AAMDAR Fitness Club — Supabase Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Membership Plans
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  duration_months INTEGER NOT NULL,
  price INTEGER NOT NULL,
  inclusions JSONB DEFAULT '[]'::jsonb,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Members
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  address TEXT NOT NULL,
  goal TEXT NOT NULL,
  batch TEXT NOT NULL,
  plan_id UUID REFERENCES plans(id),
  join_date DATE DEFAULT CURRENT_DATE,
  expiry_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'expired', 'pending')),
  emergency_contact TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trainers
CREATE TABLE IF NOT EXISTS trainers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  certifications JSONB DEFAULT '[]'::jsonb,
  experience_years INTEGER DEFAULT 0,
  bio TEXT DEFAULT '',
  photo_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Gym Floor', 'Equipment', 'Members', 'Events')),
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress Logs
CREATE TABLE IF NOT EXISTS progress_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  weight DECIMAL(5,2) NOT NULL,
  chest DECIMAL(5,2),
  waist DECIMAL(5,2),
  arms DECIMAL(5,2),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Broadcasts
CREATE TABLE IF NOT EXISTS broadcasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  recipient_count INTEGER DEFAULT 0
);

-- Site Settings (editable stats, timings, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_members_expiry ON members(expiry_date);
CREATE INDEX IF NOT EXISTS idx_members_phone ON members(phone);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_progress_member ON progress_logs(member_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_visible ON testimonials(is_visible);

-- Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read active plans" ON plans FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read trainers" ON trainers FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read visible testimonials" ON testimonials FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert members" ON members FOR INSERT WITH CHECK (true);

-- Seed default plans
INSERT INTO plans (name, duration_months, price, inclusions, is_popular, is_active) VALUES
  ('Monthly', 1, 1500, '["Gym Access", "Locker", "Basic Equipment", "Morning & Evening Batches"]'::jsonb, false, true),
  ('Quarterly', 3, 4000, '["Gym Access", "Locker", "All Equipment", "Diet Consultation", "Progress Tracking"]'::jsonb, false, true),
  ('Half-Yearly', 6, 7500, '["Gym Access", "Locker", "All Equipment", "Diet Plan", "Progress Tracking", "AI Coach Access"]'::jsonb, true, true),
  ('Annual', 12, 12000, '["Gym Access", "Locker", "All Equipment", "Personal Diet Plan", "Progress Tracking", "AI Coach Access", "1 Free PT Session"]'::jsonb, false, true),
  ('Personal Training Add-on', 1, 5000, '["12 PT Sessions/Month", "Custom Workout Plan", "Nutrition Guidance", "Weekly Check-ins"]'::jsonb, false, true),
  ('Couple Plan', 3, 7000, '["Gym Access for 2", "Lockers", "All Equipment", "Couple Diet Plan", "Progress Tracking"]'::jsonb, false, true)
ON CONFLICT DO NOTHING;

-- Seed default site settings
INSERT INTO site_settings (key, value) VALUES
  ('stats', '{"members": 500, "yearsActive": 5, "equipmentCount": 50, "trainerCount": 8}'::jsonb),
  ('timings', '{"morning": "5:30 AM – 10:00 AM", "evening": "4:00 PM – 9:00 PM", "days": "Monday – Saturday"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Seed placeholder testimonials
INSERT INTO testimonials (member_name, content, rating, is_visible) VALUES
  ('[PLACEHOLDER] Rahul S.', 'Best gym in Parbhani! Lost 12kg in 4 months with their guidance. The trainers are amazing and the equipment is top-notch.', 5, true),
  ('[PLACEHOLDER] Priya M.', 'Joined AAMDAR Fitness Club 6 months ago. The AI coach feature is incredible — it''s like having a personal trainer in your pocket!', 5, true),
  ('[PLACEHOLDER] Amit K.', 'Great atmosphere, clean facility, and affordable pricing. The WhatsApp reminders keep me on track. Highly recommend!', 5, true)
ON CONFLICT DO NOTHING;

-- Seed placeholder trainers
INSERT INTO trainers (name, specialization, certifications, experience_years, bio, display_order) VALUES
  ('[PLACEHOLDER] Trainer Name 1', 'Weight Loss & Cardio', '["ACE Certified", "Nutrition Specialist"]'::jsonb, 8, 'Passionate about helping members achieve their weight loss goals through structured cardio and strength training programs.', 1),
  ('[PLACEHOLDER] Trainer Name 2', 'Muscle Building & Strength', '["ISSA Certified", "Sports Nutrition"]'::jsonb, 6, 'Specializes in hypertrophy training and strength programs for all fitness levels.', 2),
  ('[PLACEHOLDER] Trainer Name 3', 'Functional Fitness & CrossFit', '["CrossFit L2", "First Aid Certified"]'::jsonb, 5, 'Expert in functional movements and high-intensity training for overall athletic performance.', 3)
ON CONFLICT DO NOTHING;
