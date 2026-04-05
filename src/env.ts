import "dotenv/config";

const requiredEnv = ["DATABASE"];

for (const env of requiredEnv) {
    if (!process.env[env]) {
        throw new Error(`Missing environment variable: ${env}`);
    }
}

export const env = {
    DATABASE: process.env.DATABASE!,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY!,
};