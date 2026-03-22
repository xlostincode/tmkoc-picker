import Fastify from 'fastify'
import { db } from '../db/db.js'

const fastify = Fastify({
    logger: true
})

fastify.get('/', async function handler(request, reply) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TMKOC Picker</title>
        <meta name="description" content="Random TMKOC Episode Picker">
        <meta name="author" content="Vihar Contractor">
        <meta name="keywords" content="TMKOC, Taarak Mehta Ka Ooltah Chashmah, Random Episode, Episode Picker">
    </head>
    <body>
        <h1>Random TMKOC Episode</h1>
        <a href="/random/tmkoc">Get Random Episode</a>
    </body>
    </html>
    `

    reply.header('Content-Type', 'text/html; charset=utf-8').send(html)
})

fastify.get('/random/tmkoc', async function handler(request, reply) {
    const sources = db.getSources()

    const randomSource = sources[Math.floor(Math.random() * sources.length)]

    reply.redirect(randomSource?.url!)
})

try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}