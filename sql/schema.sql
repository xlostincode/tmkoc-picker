-- Enable foreign key support
PRAGMA foreign_keys = ON;

CREATE TABLE shows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);

CREATE TABLE episodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  show_id INTEGER NOT NULL,
  episode_number INTEGER,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (show_id, episode_number),

  FOREIGN KEY (show_id)
  REFERENCES shows(id)
  ON DELETE CASCADE
);

CREATE TABLE sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  episode_id INTEGER NOT NULL,

  platform TEXT NOT NULL
    CHECK (platform IN ('youtube', 'sonyliv')),

  url TEXT NOT NULL,
  external_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (platform, external_id),

  FOREIGN KEY (episode_id)
  REFERENCES episodes(id)
  ON DELETE CASCADE
);

CREATE TABLE source_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id INTEGER NOT NULL,

  views INTEGER,
  likes INTEGER,
  dislikes INTEGER,
  comment_count INTEGER,

  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (source_id)
  REFERENCES sources(id)
  ON DELETE CASCADE
);

CREATE INDEX idx_episodes_show_id
ON episodes(show_id);

CREATE INDEX idx_sources_episode_id
ON sources(episode_id);

CREATE INDEX idx_sources_platform
ON sources(platform);

CREATE INDEX idx_source_stats_source_id
ON source_stats(source_id);

CREATE INDEX idx_source_stats_latest
ON source_stats(source_id, fetched_at DESC);

CREATE TRIGGER update_shows_updated_at
AFTER UPDATE ON shows
FOR EACH ROW
BEGIN
  UPDATE shows
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = OLD.id;
END;

CREATE TRIGGER update_episodes_updated_at
AFTER UPDATE ON episodes
FOR EACH ROW
BEGIN
  UPDATE episodes
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = OLD.id;
END;

CREATE TRIGGER update_sources_updated_at
AFTER UPDATE ON sources
FOR EACH ROW
BEGIN
  UPDATE sources
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = OLD.id;
END;