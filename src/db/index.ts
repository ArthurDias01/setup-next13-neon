import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { z } from 'zod'

neonConfig.fetchConnectionCache = true

export const databaseURL = z
  .string()
  .url()
  .parse(
    process.env.NODE_ENV === 'production'
      ? process.env.DATABASE_URL
      : process.env.DEV_DATABASE_URL,
  )

const sql = neon(databaseURL)
export const db = drizzle(sql)
