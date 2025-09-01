<script setup lang="ts">
import { TriangleAlertIcon } from 'lucide-vue-next'

defineProps<{
  message: string
  customCode: number
  code: string
  statusCode: number
  hint: string | null
  details: string
}>()
</script>

<template>
  <div>
    <TriangleAlertIcon class="error__icon" />
    <h1 class="error__code">{{ customCode || code }}</h1>
    <p class="error__msg" v-if="statusCode">Status Code: {{ statusCode }}</p>
    <p class="error__msg">{{ message }}</p>
    <p v-if="hint">{{ hint }}</p>
    <p v-if="details">{{ details }}</p>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36">Go to Homepage</Button>
      </RouterLink>
    </div>
  </div>
</template>
