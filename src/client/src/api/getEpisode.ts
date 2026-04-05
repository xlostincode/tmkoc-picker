import api from "./client.js";
import { ENDPOINTS, MODES } from "./const.js";
import type { APIResponse } from "./types.js";

export type RandomEpisodeParams = {
    mode: typeof MODES.RANDOM
    fromEp: number;
    tillEp: number;
    redirect: boolean;
} | {
    mode: typeof MODES.MOST_LIKED | typeof MODES.LEAST_LIKED | typeof MODES.MOST_VIEWED | typeof MODES.LEAST_VIEWED | typeof MODES.MOST_COMMENTED | typeof MODES.LEAST_COMMENTED
    cutoff: number;
    redirect: boolean;
};

export const getEpisode = async (params: RandomEpisodeParams) => {
    if (params.mode === MODES.RANDOM) {
        return api.get(ENDPOINTS.SHOW_TMKOC, {
            searchParams: {
                mode: params.mode,
                fromEpisodeNumber: params.fromEp,
                tillEpisodeNumber: params.tillEp,
                redirect: params.redirect,
            },
        }).json() as Promise<APIResponse>
    } else {
        return api.get(ENDPOINTS.SHOW_TMKOC, {
            searchParams: {
                mode: params.mode,
                cutoff: params.cutoff,
                redirect: params.redirect,
            },
        }).json() as Promise<APIResponse>
    }
}