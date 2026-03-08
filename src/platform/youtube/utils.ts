function getEpisodeNumberFromTitle(title?: string | null) {
    if (!title) {
        return null;
    }

    const matchers = [
        /episode\s{0,2}(\d+)/i,
        /ep\s{0,2}(\d+)/i,
        /ep\s?-\s?(\d+)/i,
        /episode - (\d+)/i,
        /FE (\d+)/i,
        /(\d+) - Full Episode/i
    ]

    for (const matcher of matchers) {
        const match = title.match(matcher);

        if (match && match[1]) {
            return parseInt(match[1])
        }
    }

    return null;
}

function getEpisodeNumberFromDescription(description?: string | null) {
    if (!description) {
        return null;
    }

    const matchers = [
        /Episodes No - (\d+)/i,
        /Episode No - (\d+)/i,
        /Episode No: (\d+)/i,
        /Episode No -(\d+)/i,
        /Episode - (\d+)/i
    ]

    for (const matcher of matchers) {
        const match = description.match(matcher);

        if (match && match[1]) {
            return parseInt(match[1])
        }
    }

    return null;
}

function getYoutubeURLFromVideoId(videoId: string) {
    return `https://www.youtube.com/watch?v=${videoId}`;
}

export const YoutubeUtils = {
    getEpisodeNumberFromTitle,
    getEpisodeNumberFromDescription,
    getYoutubeURLFromVideoId
}