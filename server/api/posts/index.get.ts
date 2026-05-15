import type { Post } from '~~/shared/types'

interface PostRow {
  id: string
  type: string
  title: string
  description: string | null
  category: string
  locations: string
  created_at: string
}

export default defineEventHandler(async (event) => {
  const { DB: db } = event.context.cloudflare.env

  const { results } = await db
    .prepare('SELECT * FROM posts ORDER BY created_at DESC')
    .all()

  return (results as unknown as PostRow[]).map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    description: row.description ?? null,
    category: row.category,
    locations: JSON.parse(row.locations),
    createdAt: row.created_at,
  })) as Post[]
})
