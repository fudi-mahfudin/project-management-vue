<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProjects>([])

const fetchData = async () => {
  const { data, error } = await tasksWithProjectsQuery
  tasks.value = data ?? []
}

await fetchData()
</script>

<template>
  <DataTable :columns="columns" :data="tasks" />
</template>
