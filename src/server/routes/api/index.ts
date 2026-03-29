import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { SHOWS } from "../../../const.js";
import { db } from "../../../db/db.js";
import { Utils } from "../../utils.js";

// Figure out a way to get these from DB
const MAX_EPISODE_NUMBER = 4633
const MIN_EPISODE_NUMBER = 1

const FILTER_MODES = {
    RANDOM: 'random',
    MOST_LIKED: 'most_liked',
    LEAST_LIKED: 'least_liked',
    MOST_VIEWED: 'most_viewed',
    LEAST_VIEWED: 'least_viewed',
    MOST_COMMENTED: 'most_commented',
    LEAST_COMMENTED: 'least_commented',
}

const DEFAULT_REDIRECT = false

type ApiQuerystring = {
    mode: typeof FILTER_MODES.RANDOM
    redirect?: string
    fromEpisodeNumber?: string
    tillEpisodeNumber?: string
    cutoff?: string
}

const api: FastifyPluginAsync = async (fastify, options) => {
    function handleRandomMode(request: FastifyRequest<{ Querystring: ApiQuerystring }>, reply: FastifyReply) {
        const redirect = JSON.parse(request.query.redirect || String(DEFAULT_REDIRECT))
        const fromEp = Utils.parseNumber(request.query.fromEpisodeNumber, MIN_EPISODE_NUMBER)
        const tillEp = Utils.parseNumber(request.query.tillEpisodeNumber, MAX_EPISODE_NUMBER)

        const randomEp = Utils.randomInRange(fromEp, tillEp)

        const episode = db.getEpisodeByNumber(randomEp)

        if (redirect && episode) {
            reply.redirect(episode.url)
        } else {
            return { mode: FILTER_MODES.RANDOM, episode: episode }
        }
    }

    function handleMostLikedMode(request: FastifyRequest<{ Querystring: ApiQuerystring }>, reply: FastifyReply) {
        const redirect = JSON.parse(request.query.redirect || String(DEFAULT_REDIRECT))
        const cutoff = Utils.parseNumber(request.query.cutoff, Math.floor(MAX_EPISODE_NUMBER / 2))

        const episode = db.getPopularEpisode(cutoff)

        if (redirect && episode) {
            reply.redirect(episode.url)
        } else {
            return { mode: FILTER_MODES.MOST_LIKED, episode: episode }
        }
    }

    function handleLeastLikedMode(request: FastifyRequest<{ Querystring: ApiQuerystring }>, reply: FastifyReply) {
        const redirect = JSON.parse(request.query.redirect || String(DEFAULT_REDIRECT))
        const cutoff = Utils.parseNumber(request.query.cutoff, Math.floor(MAX_EPISODE_NUMBER / 2))

        const episode = db.getUnpopularEpisode(cutoff)

        if (redirect && episode) {
            reply.redirect(episode.url)
        } else {
            return { mode: FILTER_MODES.LEAST_LIKED, episode: episode }
        }
    }

    function handleMostViewedMode(request: FastifyRequest<{ Querystring: ApiQuerystring }>, reply: FastifyReply) {
        const redirect = JSON.parse(request.query.redirect || String(DEFAULT_REDIRECT))
        const cutoff = Utils.parseNumber(request.query.cutoff, Math.floor(MAX_EPISODE_NUMBER / 2))

        const episode = db.getMostViewedEpisode(cutoff)

        if (redirect && episode) {
            reply.redirect(episode.url)
        } else {
            return { mode: FILTER_MODES.MOST_VIEWED, episode: episode }
        }
    }

    function handleLeastViewedMode(request: FastifyRequest<{ Querystring: ApiQuerystring }>, reply: FastifyReply) {
        const redirect = JSON.parse(request.query.redirect || String(DEFAULT_REDIRECT))
        const cutoff = Utils.parseNumber(request.query.cutoff, Math.floor(MAX_EPISODE_NUMBER / 2))

        const episode = db.getLeastViewedEpisode(cutoff)

        if (redirect && episode) {
            reply.redirect(episode.url)
        } else {
            return { mode: FILTER_MODES.LEAST_VIEWED, episode: episode }
        }
    }

    function handleMostCommentedMode(request: FastifyRequest<{ Querystring: ApiQuerystring }>, reply: FastifyReply) {
        const redirect = JSON.parse(request.query.redirect || String(DEFAULT_REDIRECT))
        const cutoff = Utils.parseNumber(request.query.cutoff, Math.floor(MAX_EPISODE_NUMBER / 2))

        const episode = db.getMostCommentedEpisode(cutoff)

        if (redirect && episode) {
            reply.redirect(episode.url)
        } else {
            return { mode: FILTER_MODES.MOST_COMMENTED, episode: episode }
        }
    }

    function handleLeastCommentedMode(request: FastifyRequest<{ Querystring: ApiQuerystring }>, reply: FastifyReply) {
        const redirect = JSON.parse(request.query.redirect || String(DEFAULT_REDIRECT))
        const cutoff = Utils.parseNumber(request.query.cutoff, Math.floor(MAX_EPISODE_NUMBER / 2))

        const episode = db.getLeastCommentedEpisode(cutoff)

        if (redirect && episode) {
            reply.redirect(episode.url)
        } else {
            return { mode: FILTER_MODES.LEAST_COMMENTED, episode: episode }
        }
    }

    fastify.get<{ Querystring: ApiQuerystring }>(`/shows/${SHOWS.TMKOC.SLUG}`, async function handler(request, reply) {
        const mode = request.query.mode || FILTER_MODES.RANDOM

        switch (mode) {
            case FILTER_MODES.RANDOM:
                return handleRandomMode(request, reply)
            case FILTER_MODES.MOST_LIKED:
                return handleMostLikedMode(request, reply)
            case FILTER_MODES.LEAST_LIKED:
                return handleLeastLikedMode(request, reply)
            case FILTER_MODES.MOST_VIEWED:
                return handleMostViewedMode(request, reply)
            case FILTER_MODES.LEAST_VIEWED:
                return handleLeastViewedMode(request, reply)
            case FILTER_MODES.MOST_COMMENTED:
                return handleMostCommentedMode(request, reply)
            case FILTER_MODES.LEAST_COMMENTED:
                return handleLeastCommentedMode(request, reply)
            default:
                return reply
                    .code(400)
                    .send({ error: 'Unsupported filter mode. Use one of: ' + Object.values(FILTER_MODES).join(', ') })
        }
    })
}

export default api;