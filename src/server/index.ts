import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { db } from '../db/db.js'

const app = Fastify({
    logger: true
})

const root = path.resolve()

app.register(fastifyStatic, {
    root: path.join(root, 'dist/client'),
})

app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith('/api')) {
        return reply.status(404).send({ error: 'Not found' })
    }

    reply.sendFile('index.html')
})

app.get('/random/tmkoc', async function handler(request, reply) {
    const sources = db.getSources()

    const randomSource = sources[Math.floor(Math.random() * sources.length)]

    reply.redirect(randomSource?.url!)
})

try {
    await app.listen({ port: 3000 })
} catch (err) {
    app.log.error(err)
    process.exit(1)
}