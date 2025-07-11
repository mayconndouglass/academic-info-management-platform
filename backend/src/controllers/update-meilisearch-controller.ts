import { FastifyReply, FastifyRequest } from "fastify"

import { env } from "../env"
import { FetchPageError, MeiliTaskFailedError } from "../errors"
import { meiliClient } from "../libs/meili"
import {
  FetchRecentUespiPostsService,
  UpdateMeilisearchWithRecentPostsService
} from "../services"

//TODO: Falta testar !!!!!!

export class UpdateMeilisearchController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const fetchRecentPosts = new FetchRecentUespiPostsService(env.WP_BASE_URL)
      const updateMeiliSearch = new UpdateMeilisearchWithRecentPostsService(
        meiliClient.index("posts"),
        fetchRecentPosts
      )

      updateMeiliSearch.execute()
    } catch (error) {
      if (error instanceof FetchPageError) {
        return reply.status(502).send({ message: error.message })
      }

      if (error instanceof MeiliTaskFailedError) {
        return reply.status(500).send({ message: error.message })
      }

      throw error
    }
  }
}
