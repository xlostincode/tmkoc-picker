import { useMutation } from '@tanstack/react-query';
import { getEpisode, type RandomEpisodeParams } from '../api/getEpisode.js';

export const useEpisode = () => {
    return useMutation({
        mutationFn: async (params: RandomEpisodeParams) =>
            getEpisode(params),
    });
};
