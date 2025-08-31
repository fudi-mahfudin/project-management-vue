<script setup lang="ts">
interface Props {
  title: string
  to?: string
  icon?: object
}

defineProps<{ links: Props[] }>()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink v-if="link.to" :to="link.to" class="nav-link">
      <component :is="link.icon" />
      <span class="text-nowrap lg:block hidden">{{ link.title }}</span>
    </RouterLink>

    <div v-else class="nav-link cursor-pointer">
      <component :is="link.icon" />
      <span class="text-nowrap lg:block hidden">{{ link.title }}</span>
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
