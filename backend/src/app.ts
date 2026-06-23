import cors from "@fastify/cors"
import { fastify } from "fastify"

import {
  FetchDocumentsController,
  FetchPostsFromMeilisearchController,
  GetDocumentDetailsController,
  GetPostDetailsFromMeilisearchController,
  PopulateMeiliSearchController,
  SearchDocumentsController,
  SearchDocumentsInstantController,
  SearchPostController,
  SearchPostsFromMeilisearchController,
  UpdateMeilisearchController,
} from "./controllers"

export const app = fastify()

app.register(cors, {
  origin: "http://localhost:5173",
})

// Controllers existentes
const populateMeilisearchController = new PopulateMeiliSearchController()
const updateMeilisearchController = new UpdateMeilisearchController()
const searchPostController = new SearchPostController()
const fetchPostsFromMeilisearchController = new FetchPostsFromMeilisearchController()
const searchPostsFromMeilisearchController = new SearchPostsFromMeilisearchController()
const getPostDetailsFromMeilisearchController = new GetPostDetailsFromMeilisearchController()

// Controllers de documentos
const fetchDocumentsController = new FetchDocumentsController()
const searchDocumentsController = new SearchDocumentsController()
const searchDocumentsInstantController = new SearchDocumentsInstantController()
const getDocumentDetailsController = new GetDocumentDetailsController()

// Rotas existentes
app.get("/post/:postId", (request, reply) =>
  getPostDetailsFromMeilisearchController.handle(request, reply)
)
app.get("/posts-meilisearch/search", (request, reply) =>
  searchPostsFromMeilisearchController.handle(request, reply)
)
app.get("/posts-meilisearch", (request, reply) =>
  fetchPostsFromMeilisearchController.handle(request, reply)
)
app.get("/search-post", (request, reply) =>
  searchPostController.handle(request, reply)
)
app.get("/update-meilisearch", (request, reply) =>
  updateMeilisearchController.handle(request, reply)
)
app.post("/populate-meilisearch", (request, reply) =>
  populateMeilisearchController.handle(request, reply)
)

// Rotas de documentos
app.get("/documents", (request, reply) =>
  fetchDocumentsController.handle(request, reply)
)
app.get("/documents/search", (request, reply) =>
  searchDocumentsController.handle(request, reply)
)
app.get("/documents/instant", (request, reply) =>
  searchDocumentsInstantController.handle(request, reply)
)
app.get("/documents/:id", (request, reply) =>
  getDocumentDetailsController.handle(request, reply)
)

app.get("/", () => "Hello World")
