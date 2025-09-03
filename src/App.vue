<script setup lang="ts">
import { RouterView } from 'vue-router'

const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(() => {
  useAuthStore().trackAuthChanges()
})

const { user } = storeToRefs(useAuthStore())
const AuthLayout = defineAsyncComponent(() => import('@/components/layout/main/AuthLayout.vue'))
const GuestLayout = defineAsyncComponent(() => import('@/components/layout/main/GuestLayout.vue'))
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
    <AppErrorPage v-if="errorStore.activeError" />

    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>

<style scoped></style>
