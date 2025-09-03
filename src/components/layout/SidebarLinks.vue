<script setup lang="ts">
import { menuKey, type MenuInjectionOptions } from '@/utils/injectionKeys'

interface Props {
  title: string
  to?: string
  icon?: object
}

defineProps<{ links: Props[] }>()

const emits = defineEmits<{
  actionClicked: [string]
}>()

const emitActionClicked = (linkTitle: string) => {
  emits('actionClicked', linkTitle)
}

const { menuOpen } = inject(menuKey) as MenuInjectionOptions
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      class="nav-link"
      :class="{ 'justify-center': !menuOpen }"
    >
      <component :is="link.icon" />
      <span class="text-nowrap" :class="{ hidden: !menuOpen }">{{ link.title }}</span>
    </RouterLink>

    <div
      v-else
      class="nav-link cursor-pointer"
      @click="emitActionClicked(link.title)"
      :class="{ 'justify-center': !menuOpen }"
    >
      <component :is="link.icon" />
      <span class="text-nowrap" :class="{ hidden: !menuOpen }">{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
@reference '@/index.css';
.nav-link {
  @apply flex items-center gap-6 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
.router-link-exact-active {
  @apply text-primary bg-muted;
}
</style>
