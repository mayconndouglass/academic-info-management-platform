import { FastifyReply, FastifyRequest } from "fastify"
import { MeiliSearchApiError } from "meilisearch"
import z from "zod"

import { NoResultsFoundError } from "../errors"
import { meiliClient } from "../libs/meili"
import { SearchPostService } from "../services"

export class SearchPostController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const searchQuerySchema = z.object({
      q: z.string().min(1, "O termo de busca é obrigatório")
    })

    const { q } = searchQuerySchema.parse(request.query)

    try {
      const meiliIndex = meiliClient.index("posts")
      const searchPost = new SearchPostService(meiliIndex)
      
      const searchResult = await searchPost.execute(q)

      return reply.status(200).send({ ...searchResult })
    } catch (error) {
      if (error instanceof NoResultsFoundError) {
        return reply.status(400).send({ message: error.message })
      }

      if (error instanceof MeiliSearchApiError) {
        throw new Error("Search failed}")
      }

      throw error
    }
  }
}
