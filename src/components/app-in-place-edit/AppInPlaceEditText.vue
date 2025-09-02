<script setup lang="ts">
const modelValue = defineModel()

defineEmits(['commit'])
</script>

<template>
  <input
    type="text"
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-secondary focus:rounded-md focus:ring-1 focus:ring-amber-500"
    v-model="modelValue"
    @blur="$emit('commit')"
    @keypress.enter="($event.target as HTMLInputElement).blur()"
  />
</template>
