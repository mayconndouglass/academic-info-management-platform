import { fastify } from "fastify"

import { PopulateMeiliSearchController } from "./controllers"

export const app = fastify()

const populateMeilisearchController = new PopulateMeiliSearchController()

app.post("/populate-meilisearch", (request, reply) =>
  populateMeilisearchController.handle(request, reply)
)
app.get("/", () => "Hello World")
