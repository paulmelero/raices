<script setup lang="ts">
import { POST_TYPES, CATEGORIES } from '~~/shared/types'
import type { PostType, Category, CreatePostBody } from '~~/shared/types'
import { TOWNS } from '~~/shared/towns'
import es from '~~/shared/i18n/es.json'

const emit = defineEmits<{
  close: []
  created: [body: CreatePostBody]
}>()

const type = ref<PostType | ''>('')
const title = ref('')
const description = ref('')
const category = ref<Category | ''>('')
const selectedTownIds = ref<string[]>([])
const errors = ref<Record<string, string>>({})
const submitting = ref(false)

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!type.value) e.type = es.errors.requiredType
  if (!title.value.trim()) e.title = es.errors.requiredTitle
  if (title.value.length > 200) e.title = es.errors.titleTooLong
  if (description.value.length > 1000) e.description = es.errors.descriptionTooLong
  if (!category.value) e.category = es.errors.requiredCategory
  if (selectedTownIds.value.length === 0) e.locations = es.errors.requiredLocation
  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return
  submitting.value = true

  const locations = TOWNS.filter((t) => selectedTownIds.value.includes(t.id))

  emit('created', {
    type: type.value as PostType,
    title: title.value.trim(),
    description: description.value.trim() || undefined,
    category: category.value as Category,
    locations,
  })
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="emit('close')" />
    <div class="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto p-6 shadow-xl">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-bold text-gray-900">
          {{ es.createPost.title }}
        </h2>
        <button
          class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          @click="emit('close')"
        >
          &times;
        </button>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <!-- Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ es.createPost.fieldType }}</label>
          <select
            v-model="type"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="" disabled>
              {{ es.createPost.selectType }}
            </option>
            <option v-for="t in POST_TYPES" :key="t" :value="t">
              {{ es.postTypes[t] }}
            </option>
          </select>
          <p v-if="errors.type" class="text-red-500 text-sm mt-1">
            {{ errors.type }}
          </p>
        </div>

        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ es.createPost.fieldTitle }}</label>
          <input
            v-model="title"
            type="text"
            maxlength="200"
            :placeholder="es.createPost.placeholderTitle"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">
            {{ errors.title }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ es.createPost.fieldDescription }}</label>
          <textarea
            v-model="description"
            maxlength="1000"
            rows="3"
            :placeholder="es.createPost.placeholderDescription"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">
            {{ errors.description }}
          </p>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ es.createPost.fieldCategory }}</label>
          <select
            v-model="category"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="" disabled>
              {{ es.createPost.selectCategory }}
            </option>
            <option v-for="c in CATEGORIES" :key="c" :value="c">
              {{ es.categories[c] }}
            </option>
          </select>
          <p v-if="errors.category" class="text-red-500 text-sm mt-1">
            {{ errors.category }}
          </p>
        </div>

        <!-- Locations -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ es.createPost.fieldLocations }}</label>
          <div class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
            <label
              v-for="town in TOWNS"
              :key="town.id"
              class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                v-model="selectedTownIds"
                type="checkbox"
                :value="town.id"
                class="rounded border-gray-300 text-green-600 focus:ring-green-500"
              >
              {{ town.name }}
            </label>
          </div>
          <p v-if="errors.locations" class="text-red-500 text-sm mt-1">
            {{ errors.locations }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 pt-2">
          <button
            type="button"
            class="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            @click="emit('close')"
          >
            {{ es.createPost.cancel }}
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="flex-1 py-2.5 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {{ submitting ? '...' : es.createPost.submit }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
