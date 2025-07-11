import { fastify } from "fastify"

import {
  PopulateMeiliSearchController,
  SearchPostController,
  UpdateMeilisearchController
} from "./controllers"

export const app = fastify()

const populateMeilisearchController = new PopulateMeiliSearchController()
const updateMeilisearchController = new UpdateMeilisearchController()
const searchPostController = new SearchPostController()

app.get("/search-post", (request, reply) => 
  searchPostController.handle(request, reply)
)
app.get("/update-meilisearch", (request, reply) => 
  updateMeilisearchController.handle(request, reply)
)
app.post("/populate-meilisearch", (request, reply) =>
  populateMeilisearchController.handle(request, reply)
)
app.get("/", () => "Hello World")
