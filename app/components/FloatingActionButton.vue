<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="fixed bottom-8 right-4 z-30 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center text-3xl leading-none transition-colors active:scale-95"
    aria-label="Crear anuncio"
    @click="$emit('click')"
  >
    +
  </button>
</template>
