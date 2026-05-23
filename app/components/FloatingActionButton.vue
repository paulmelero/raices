<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="fixed bottom-8 right-4 z-30 w-14 h-14 pb-1 bg-primary hover:bg-primary-hover text-white rounded-full fab-shadow flex items-center justify-center text-3xl leading-none transition-colors active:scale-95"
    aria-label="Crear anuncio"
    @click="$emit('click')"
  >
    +
  </button>
</template>
