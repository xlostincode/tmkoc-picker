import { db } from "../../db/db.js";
import { env } from "../../env.js";
import { google, youtube_v3 } from "googleapis";
import { YoutubeUtils } from "./utils.js";
import { PLATFORMS } from "../../const.js";
import type { PlaylistItemsListResponse } from "./types.js";

const playlistIds = process.argv[2];
const slug = process.argv[3];

if (!playlistIds || !slug) {
    console.error("Usage: youtube-fetch-playlist <PLAYLIST_IDS> <SLUG>");
    process.exit(1);
}

const youtube = google.youtube({
    version: "v3",
    auth: env.YOUTUBE_API_KEY,
});

async function fetchPlaylist(playlistId: string): Promise<void> {
    const shows = db.getShows();
    const show = shows.find((show) => show.slug === slug);

    if (!show) {
        console.error(`Show with slug ${slug} not found`);
        process.exit(1);
    }

    let nextPageToken: string | null = null;

    do {
        console.log("Fetching page", nextPageToken)
        const res = await youtube.playlistItems.list({
            playlistId: playlistId,
            part: ["snippet", "contentDetails"],
            maxResults: 50,
            pageToken: nextPageToken!,
        }) as PlaylistItemsListResponse;

        if (!res.ok) {
            console.error("Request failed:", "Status", res.status, "Message", res.statusText);
            continue
        }

        const videoIdToSourceMap = new Map<string, number>()

        db.db.transaction(() => {
            res.data.items?.forEach((item: youtube_v3.Schema$PlaylistItem) => {
                console.log(item.snippet?.title)
                let episodeNumber = YoutubeUtils.getEpisodeNumberFromTitle(item.snippet?.title);

                if (!episodeNumber) {
                    episodeNumber = YoutubeUtils.getEpisodeNumberFromDescription(item.snippet?.description)
                }

                const source = db.getSourceByPlatformAndExternalId(PLATFORMS.YOUTUBE, item.contentDetails!.videoId!);
                let episodeId: number | null = null

                if (source) {
                    episodeId = source.episode_id;
                    console.log("Source already exists:", item.snippet?.title);
                } else {
                    const episode = db.upsertEpisode(show.id, episodeNumber, item.snippet?.title || null, item.snippet?.description || null)
                    episodeId = episode.id
                }

                const updatedSource = db.upsertSource(
                    episodeId!,
                    PLATFORMS.YOUTUBE,
                    YoutubeUtils.getYoutubeURLFromVideoId(item.contentDetails!.videoId!),
                    item.contentDetails!.videoId!
                );

                console.log(item.contentDetails!.videoId!, updatedSource.id)
                videoIdToSourceMap.set(item.contentDetails!.videoId!, updatedSource.id)

                console.log("Episode added:", item.snippet?.title);
            });
        })()

        const videosStatistics = await youtube.videos.list({
            part: ["statistics"],
            id: Array.from(videoIdToSourceMap.keys()),
        })

        db.db.transaction(() => {
            videosStatistics.data.items?.forEach((item: youtube_v3.Schema$Video) => {
                db.insertSourceStats(
                    videoIdToSourceMap.get(item.id!)!,
                    Number(item.statistics?.viewCount!),
                    Number(item.statistics?.likeCount!),
                    Number(item.statistics?.dislikeCount!),
                    Number(item.statistics?.commentCount!)
                );
            });
        })()

        nextPageToken = res.data.nextPageToken || null;
    } while (nextPageToken);

    console.log("Playlist fetched successfully");
}


const parsedPlaylistIds = playlistIds.split(",")

for (const playlistId of parsedPlaylistIds) {
    console.log("Fetching", playlistId)
    await fetchPlaylist(playlistId).then(console.log);
}