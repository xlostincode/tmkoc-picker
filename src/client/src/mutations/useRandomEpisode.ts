import { useMutation } from '@tanstack/react-query';
import { getRandomEpisode } from '../api/getRandomEpisode';

type RandomEpisodeParams = {
    fromEp: number;
    tillEp: number;
    redirect: boolean;
};

export const useRandomEpisode = () => {
    return useMutation({
        mutationFn: async ({ fromEp, tillEp, redirect }: RandomEpisodeParams) =>
            getRandomEpisode(fromEp, tillEp, redirect),
    });
};
