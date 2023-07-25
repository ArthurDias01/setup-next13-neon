import type { Config } from 'drizzle-kit'
import { config } from 'dotenv'
import { z } from 'zod'

config({
  path: '.env.local',
})

const databaseURL = z.string().url().parse(process.env.DATABASE_URL)

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: databaseURL,
  },
} satisfies Config
