<script setup lang="ts">
import { projectsQuery } from '@/utils/supaQueries'
import type { Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects>([])

const fetchData = async () => {
  const { data, error, status } = await projectsQuery

  if (error) useErrorStore().setError({ error: error, customCode: status })
  projects.value = data ?? []
}

await fetchData()
</script>

<template>
  <DataTable :columns="columns" :data="projects" />
</template>
