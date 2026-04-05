import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { db } from '../db/db.js'
import api from './routes/api/index.js'
import cors from '@fastify/cors'

const app = Fastify({
    logger: true
})

app.register(cors, {
    origin: '*',
})

const root = path.resolve()

app.register(api, { prefix: '/api' })

app.register(fastifyStatic, {
    root: path.join(root, 'dist/client'),
})

app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith('/api')) {
        return reply.status(404).send({ error: 'Not found' })
    }

    reply.sendFile('index.html')
})

try {
    await app.listen({ port: 3000 })
} catch (err) {
    app.log.error(err)
    process.exit(1)
}