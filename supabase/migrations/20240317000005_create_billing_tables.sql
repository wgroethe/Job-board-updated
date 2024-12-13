-- Create plans table
create table if not exists plans (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price numeric not null,
  interval text not null check (interval in ('month', 'year', 'one-time')),
  features jsonb not null default '[]',
  stripe_product_id text,
  stripe_price_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create subscriptions table
create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  plan_id uuid references plans(id) not null,
  status text not null check (status in ('active', 'canceled', 'past_due')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create billing_history table
create table if not exists billing_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  amount numeric not null,
  status text not null check (status in ('paid', 'pending', 'failed')),
  stripe_invoice_id text,
  stripe_payment_intent_id text,
  invoice_url text,
  created_at timestamp with time zone default now()
);

-- Create indexes
create index subscriptions_user_id_idx on subscriptions(user_id);
create index billing_history_user_id_idx on billing_history(user_id);

-- Enable RLS
alter table plans enable row level security;
alter table subscriptions enable row level security;
alter table billing_history enable row level security;

-- Create policies
create policy "Anyone can view plans"
  on plans for select
  using (true);

create policy "Users can view their own subscriptions"
  on subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can view their own billing history"
  on billing_history for select
  using (auth.uid() = user_id);