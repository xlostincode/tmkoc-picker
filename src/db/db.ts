import Database from "better-sqlite3";
import path from "path";
import { env } from "../env.js";

const dbPath = path.join(process.cwd(), env.DATABASE);
const _db = new Database(dbPath);

function upsertShow(slug: string, name: string) {
    const row = _db.prepare(`
        INSERT INTO shows (slug, name) 
        VALUES (?, ?)
        ON CONFLICT (slug) DO UPDATE SET
            name = excluded.name,
            updated_at = CURRENT_TIMESTAMP
        RETURNING id
    `).get(slug, name);

    return row as { id: number }
}

function upsertEpisode(showId: number, episodeNumber: number | null, title: string | null, description: string | null) {
    const row = _db.prepare(`
        INSERT INTO episodes (show_id, episode_number, title, description) 
        VALUES (?, ?, ?, ?)
        ON CONFLICT (show_id, episode_number) DO UPDATE SET
            episode_number = COALESCE(excluded.episode_number, episodes.episode_number),
            title = COALESCE(excluded.title, episodes.title),
            description = COALESCE(excluded.description, episodes.description),
            updated_at = CURRENT_TIMESTAMP
        RETURNING id
    `).get(showId, episodeNumber, title, description);

    return row as { id: number };
}

function insertSourceStats(sourceId: number, views: number, likes: number, dislikes: number, commentCount: number) {
    const row = _db.prepare(`
        INSERT INTO source_stats (source_id, views, likes, dislikes, comment_count)
        VALUES (?, ?, ?, ?, ?)
        RETURNING id
    `).get(sourceId, views, likes, dislikes, commentCount);

    return row as { id: number };
}

function upsertSource(episodeId: number, platform: string, url: string, externalId: string) {
    const row = _db.prepare(`
        INSERT INTO sources (episode_id, platform, url, external_id) 
        VALUES (?, ?, ?, ?)
        ON CONFLICT (platform, external_id) DO UPDATE SET
            url = excluded.url,
            updated_at = CURRENT_TIMESTAMP
        RETURNING id
    `).get(episodeId, platform, url, externalId);

    return row as { id: number };
}

function getShows() {
    return _db.prepare(`SELECT * FROM shows`).all() as {
        id: number;
        slug: string;
        name: string;
        created_at: string;
        updated_at: string;
    }[];
}

function getSourceByPlatformAndExternalId(platform: string, externalId: string) {
    return _db.prepare(`SELECT * FROM sources WHERE platform = ? AND external_id = ?`).get(platform, externalId) as {
        id: number;
        episode_id: number;
        platform: string;
        url: string;
        external_id: string;
        created_at: string;
        updated_at: string;
    } | null;
}

function getEpisodes() {
    return _db.prepare(`SELECT * FROM episodes`).all() as {
        id: number;
        show_id: number;
        episode_number: number | null;
        title: string | null;
        description: string | null;
        created_at: string;
        updated_at: string;
    }[];
}

export const db = {
    db: _db,
    upsertShow,
    upsertEpisode,
    upsertSource,
    insertSourceStats,
    getSourceByPlatformAndExternalId,
    getShows,
    getEpisodes
}