<script setup lang="ts">
import type { Post, CreatePostBody } from '~~/shared/types';
import es from '~~/shared/i18n/es.json';

useHead({ title: es.appName });

const { lat, lng } = useGeolocation();
const { posts, fetchPosts, createPost } = usePosts();

const showCreateModal = ref(false);
const selectedPost = ref<Post | null>(null);
const createError = ref<string | null>(null);

const center = computed(() => ({ lat: lat.value, lng: lng.value }));

onMounted(() => {
  fetchPosts();
});

async function handleCreated(body: CreatePostBody) {
  createError.value = null;
  try {
    await createPost(body);
    showCreateModal.value = false;
  } catch {
    createError.value = es.errors.createFailed;
  }
}

function handleSelectPost(post: Post) {
  selectedPost.value = post;
}
</script>

<template>
  <div class="h-dvh w-full flex flex-col">
    <header
      class="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-20"
    >
      <h1 class="text-lg font-bold text-gray-900">
        {{ es.appName }}
      </h1>
      <span class="text-xs text-gray-400">Huesca</span>
    </header>

    <div class="relative flex-1 overflow-hidden">
      <ClientOnly>
        <MapView
          :posts="posts"
          :center="center"
          @select-post="handleSelectPost"
        />
      </ClientOnly>

      <PostPopup
        v-if="selectedPost"
        :post="selectedPost"
        @close="selectedPost = null"
      />

      <FloatingActionButton @click="showCreateModal = true" />
    </div>

    <CreatePostModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="handleCreated"
    />

    <div
      v-if="createError"
      class="fixed top-4 left-4 right-4 z-50 bg-red-500 text-white text-sm px-4 py-3 rounded-lg shadow-lg text-center"
    >
      {{ createError }}
    </div>
  </div>
</template>
