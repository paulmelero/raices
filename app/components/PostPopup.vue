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
  give: 'bg-badge-give-bg text-badge-give-text',
  need: 'bg-badge-need-bg text-badge-need-text',
  lend: 'bg-badge-lend-bg text-badge-lend-text',
  event: 'bg-badge-event-bg text-badge-event-text',
  test: 'bg-badge-test-bg text-badge-test-text',
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
  <div class="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-40 bg-surface-raised rounded-2xl shadow-xl p-5 border border-border-subtle">
    <div class="flex items-start justify-between gap-3 mb-3">
      <h3 class="text-lg font-bold text-content leading-tight">
        {{ post.title }}
      </h3>
      <button
        class="text-content-muted hover:text-content-secondary text-xl leading-none shrink-0"
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
      <span class="text-xs font-medium px-2 py-1 rounded-full bg-surface-alt text-content-secondary">
        {{ es.categories[post.category] }}
      </span>
    </div>

    <p v-if="post.description" class="text-content-secondary text-sm mb-3 leading-relaxed">
      {{ post.description }}
    </p>

    <div class="text-xs text-content-muted space-y-1">
      <p>
        <span class="font-medium">{{ es.postDetail.locations }}:</span>
        {{ post.locations.map((l) => l.name).join(', ') }}
      </p>
      <p>{{ es.postDetail.createdAt }} {{ formatDate(post.createdAt) }}</p>
    </div>
  </div>
</template>
