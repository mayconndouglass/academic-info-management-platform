import { fastify } from "fastify"

const server = fastify()

server.get("/", () => "Hello World")

server.listen({ port: 3333 }, () => console.log("Server running"))
