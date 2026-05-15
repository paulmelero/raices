<script setup lang="ts">
import type { Post, PostType } from '~~/shared/types'
import es from '~~/shared/i18n/es.json'

defineProps<{
  post: Post
}>()

const emit = defineEmits<{
  close: []
}>()

const TYPE_BADGE_CLASSES: Record<PostType, string> = {
  give: 'bg-green-100 text-green-800',
  need: 'bg-orange-100 text-orange-800',
  lend: 'bg-blue-100 text-blue-800',
  event: 'bg-purple-100 text-purple-800',
  test: 'bg-gray-100 text-gray-800',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-40 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
    <div class="flex items-start justify-between gap-3 mb-3">
      <h3 class="text-lg font-bold text-gray-900 leading-tight">
        {{ post.title }}
      </h3>
      <button
        class="text-gray-400 hover:text-gray-600 text-xl leading-none shrink-0"
        @click="emit('close')"
      >
        &times;
      </button>
    </div>

    <div class="flex gap-2 mb-3">
      <span
        class="text-xs font-medium px-2 py-1 rounded-full"
        :class="TYPE_BADGE_CLASSES[post.type]"
      >
        {{ es.postTypes[post.type] }}
      </span>
      <span class="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
        {{ es.categories[post.category] }}
      </span>
    </div>

    <p v-if="post.description" class="text-gray-600 text-sm mb-3 leading-relaxed">
      {{ post.description }}
    </p>

    <div class="text-xs text-gray-500 space-y-1">
      <p>
        <span class="font-medium">{{ es.postDetail.locations }}:</span>
        {{ post.locations.map((l) => l.name).join(', ') }}
      </p>
      <p>{{ es.postDetail.createdAt }} {{ formatDate(post.createdAt) }}</p>
    </div>
  </div>
</template>
