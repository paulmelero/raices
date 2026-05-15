import type { Post, CreatePostBody } from '~~/shared/types'

export function usePosts() {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPosts() {
    loading.value = true
    error.value = null
    try {
      posts.value = await $fetch<Post[]>('/api/posts')
    }
    catch {
      error.value = 'load_failed'
    }
    finally {
      loading.value = false
    }
  }

  async function createPost(body: CreatePostBody): Promise<Post> {
    const post = await $fetch<Post>('/api/posts', {
      method: 'POST',
      body,
    })
    posts.value.unshift(post)
    return post
  }

  return { posts, loading, error, fetchPosts, createPost }
}
