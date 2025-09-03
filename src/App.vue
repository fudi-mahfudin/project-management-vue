<script setup lang="ts">
import { LoaderCircleIcon } from 'lucide-vue-next'
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
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="errorStore.activeError" />

      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <Suspense v-if="Component" :timeout="0">
            <Component :is="Component" :key="route.name"></Component>
            <template #fallback>
              <div
                class="absolute top-0 left-0 bg-gray-100 bg-opacity-30 z-50 h-screen w-full flex justify-center items-center"
              >
                <LoaderCircleIcon class="size-16 animate-spin" />
              </div>
            </template>
          </Suspense>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>

<style scoped></style>
