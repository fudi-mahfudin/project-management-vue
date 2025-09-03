<script setup lang="ts">
const modelValue = defineModel<string>()

defineEmits(['commit'])
</script>

<template>
  <textarea
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-secondary focus:rounded-md focus:ring-1 focus:ring-amber-500 min-h-10 my-2"
    rows="3"
    v-model="modelValue"
    @blur="$emit('commit')"
  />
</template>
