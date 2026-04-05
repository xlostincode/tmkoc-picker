import api from "./client";
import { ENDPOINTS, MODES } from "./const";
import type { APIResponse } from "./types";

export const getRandomEpisode = async (fromEp: number, tillEp: number, redirect: boolean) => {
    return api.get(ENDPOINTS.SHOW_TMKOC, {
        searchParams: {
            mode: MODES.RANDOM,
            fromEpisodeNumber: fromEp,
            tillEpisodeNumber: tillEp,
            redirect: redirect,
        },
    }).json() as Promise<APIResponse>
}