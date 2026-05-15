import { POST_TYPES, CATEGORIES } from '~~/shared/types'
import type { CreatePostBody, Post } from '~~/shared/types'

export default defineEventHandler(async (event) => {
  const { DB: db } = event.context.cloudflare.env
  const body = await readBody<CreatePostBody>(event)

  if (!body.title?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'title is required' })
  }
  if (body.title.length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'title must be 200 characters or less' })
  }
  if (body.description && body.description.length > 1000) {
    throw createError({ statusCode: 400, statusMessage: 'description must be 1000 characters or less' })
  }
  if (!POST_TYPES.includes(body.type)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid type' })
  }
  if (!CATEGORIES.includes(body.category)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid category' })
  }
  if (!Array.isArray(body.locations) || body.locations.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'at least one location is required' })
  }
  for (const loc of body.locations) {
    if (typeof loc.lat !== 'number' || typeof loc.lng !== 'number' || !loc.name) {
      throw createError({ statusCode: 400, statusMessage: 'each location must have lat, lng, and name' })
    }
  }

  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  await db
    .prepare(
      'INSERT INTO posts (id, type, title, description, category, locations, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    )
    .bind(id, body.type, body.title.trim(), body.description?.trim() || null, body.category, JSON.stringify(body.locations), now)
    .run()

  return {
    id,
    type: body.type,
    title: body.title.trim(),
    description: body.description?.trim() || null,
    category: body.category,
    locations: body.locations,
    createdAt: now,
  } satisfies Post
})
