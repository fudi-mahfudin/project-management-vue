<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Tasks {{ route.params?.id }}</h1>
    <RouterLink to="/tasks">Tasks</RouterLink>
  </div>
</template>
