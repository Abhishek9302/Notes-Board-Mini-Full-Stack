CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO notes (id, title, body, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Welcome to Notes Board',
  'This is your first note. You can create, read, and delete notes via the UI.',
  NOW()
)
ON CONFLICT (id) DO NOTHING;
