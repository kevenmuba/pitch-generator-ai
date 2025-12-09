-- ==========================
-- 1️⃣ Users Table
-- ==========================
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text, -- nullable if OAuth-only
  name text,
  role text DEFAULT 'user', -- 'user' or 'admin'
  credits integer DEFAULT 0,
  trial_credits integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_users_created_at ON users(created_at);


-- ==========================
-- 2️⃣ User Lessons Table
-- Tracks scenario, skill level, and phase per user
-- ==========================
CREATE TABLE user_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  scenario text NOT NULL,       -- 'dating', 'cold_call', 'business'
  skill_level text NOT NULL,    -- 'basic', 'intermediate', 'advanced'
  phase integer DEFAULT 1,      -- tracks user's progress in this skill/phase
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_user_lessons_user_id ON user_lessons(user_id);
CREATE INDEX idx_user_lessons_scenario ON user_lessons(scenario);
CREATE INDEX idx_user_lessons_skill_phase ON user_lessons(skill_level, phase);


-- ==========================
-- 3️⃣ Pitches Table
-- Stores generated outputs for users
-- ==========================
CREATE TABLE pitches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  scenario text NOT NULL,
  skill_level text NOT NULL,
  phase integer DEFAULT 1,
  tone text, -- 'formal', 'casual', 'friendly'
  input_prompt jsonb, -- final prompt sent to AI
  result_text text NOT NULL,
  cost_credits integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_pitches_user_id ON pitches(user_id);
CREATE INDEX idx_pitches_created_at ON pitches(created_at);


-- ==========================
-- 4️⃣ Templates Table
-- Admin-created or public templates
-- ==========================
CREATE TABLE templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  scenario text,
  skill_level text,
  prompt_text text NOT NULL,
  is_public boolean DEFAULT false,
  created_by uuid REFERENCES users(id), -- admin
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_templates_created_by ON templates(created_by);


-- ==========================
-- 5️⃣ Transactions Table
-- Payments & credit purchases
-- ==========================
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  stripe_payment_id text,
  type text, -- 'credit_purchase', 'subscription', 'refund'
  amount_cents integer,
  credits_granted integer,
  status text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);


-- ==========================
-- 6️⃣ Subscriptions Table
-- Recurring subscriptions
-- ==========================
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  stripe_subscription_id text,
  status text, -- 'active', 'canceled', 'past_due'
  plan text, -- 'unlimited', 'single_scenario', etc.
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);


-- ==========================
-- 7️⃣ Webhook Events Table
-- Stripe or other webhook logs
-- ==========================
CREATE TABLE webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text,
  payload jsonb,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_webhook_events_event_type ON webhook_events(event_type);


-- ==========================
-- 8️⃣ Admin Settings Table
-- Global platform settings
-- ==========================
CREATE TABLE admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL, -- 'credit_price', 'trial_credits', etc.
  value text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);


-- ==========================
-- 9️⃣ Practice Sessions Table
-- AI roleplay and scoring
-- ==========================
CREATE TABLE practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  scenario text,
  skill_level text,
  phase integer DEFAULT 1,
  ai_score numeric, -- 0-100
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX idx_practice_sessions_created_at ON practice_sessions(created_at);


-- ==========================
-- 🔟 Usage Logs Table
-- Track API and user actions
-- ==========================
CREATE TABLE usage_logs (
  id bigserial PRIMARY KEY,
  user_id uuid,
  endpoint text,
  event jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at);
