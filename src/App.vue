<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthLayout from '@/components/layout/main/AuthLayout.vue'

const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />

    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>

<style scoped></style>
