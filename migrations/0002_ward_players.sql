-- Central player profiles + career stats for NCD Ward (shared leaderboard).
CREATE TABLE IF NOT EXISTS ward_players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_played TIMESTAMPTZ NOT NULL DEFAULT now(),
  lang TEXT NOT NULL DEFAULT 'th',
  difficulty INT NOT NULL DEFAULT 2,
  day INT NOT NULL DEFAULT 1,
  reputation INT NOT NULL DEFAULT 58,
  career_score INT NOT NULL DEFAULT 0,
  patients_treated INT NOT NULL DEFAULT 0,
  perfect_cases INT NOT NULL DEFAULT 0,
  best_shift_score INT NOT NULL DEFAULT 0,
  career_complete BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS ward_players_career_score_idx
  ON ward_players (career_score DESC);

CREATE INDEX IF NOT EXISTS ward_players_best_shift_idx
  ON ward_players (best_shift_score DESC);

CREATE INDEX IF NOT EXISTS ward_players_name_idx
  ON ward_players (name);
