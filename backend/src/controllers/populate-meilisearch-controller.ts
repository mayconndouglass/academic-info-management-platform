import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

import { env } from "../env"
import { FetchPageError, MeiliTaskFailedError } from "../errors"
import { meiliClient } from "../libs/meili"
import { PopulateMeiliSearchService } from "../services"

export class PopulateMeiliSearchController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const populateMeilisearchBodySchema = z.object({
      start: z.number(),
      end: z.number()
    })

    const { start, end } = populateMeilisearchBodySchema.parse(request.body)

    try {
      const populateMeilisearch = new PopulateMeiliSearchService(
        env.WP_BASE_URL,
        meiliClient.index("posts")
      )

      await populateMeilisearch.execute(start, end)
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
