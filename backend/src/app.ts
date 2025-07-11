import { fastify } from "fastify"

import { PopulateMeiliSearchController } from "./controllers"
import { UpdateMeilisearchController } from "./controllers/update-meilisearch-controller"

export const app = fastify()

const populateMeilisearchController = new PopulateMeiliSearchController()
const updateMeilisearchController = new UpdateMeilisearchController()

app.get("/update-meilisearch", (request, reply) => 
  updateMeilisearchController.handle(request, reply)
)
app.post("/populate-meilisearch", (request, reply) =>
  populateMeilisearchController.handle(request, reply)
)
app.get("/", () => "Hello World")
