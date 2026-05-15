CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('give','need','lend','event','test')),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK(category IN ('kids','home','tools','food','books','clothes','other')),
  locations TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
