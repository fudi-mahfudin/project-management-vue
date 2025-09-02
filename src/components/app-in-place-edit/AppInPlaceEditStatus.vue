<script setup lang="ts">
import { CircleCheckIcon, CircleDotIcon } from 'lucide-vue-next'

const modelValue = defineModel<'in-progress' | 'completed'>()

const emit = defineEmits(['commit'])

const { readonly = false } = defineProps<{ readonly?: boolean }>()

const toggleValue = () => {
  if (readonly) return

  modelValue.value = modelValue.value === 'in-progress' ? 'completed' : 'in-progress'
  emit('commit')
}
</script>

<template>
  <div class="h-10 flex items-center" :class="{ 'cursor-pointer': !readonly }" @click="toggleValue">
    <Transition mode="out-in">
      <CircleCheckIcon v-if="modelValue === 'completed'" class="text-green-500" />
      <CircleDotIcon v-else class="text-gray-500" />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.2s;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.5);
}
</style>
