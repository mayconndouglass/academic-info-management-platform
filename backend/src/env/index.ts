import "dotenv/config"

import { treeifyError, z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),

  MEILI_HOST: z.string(),
  MEILI_MASTER_KEY: z.string().min(1),
  WP_BASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error("Invalid environment variables:")
  console.error(treeifyError(_env.error))
  throw new Error("Invalid environment variables")
}

export const env = _env.data
