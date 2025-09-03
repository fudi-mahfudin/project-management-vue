<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useTasksStore } from '@/stores/loaders/tasks'
import { columns } from '@/utils/tableColumns/tasksColumns'
import { useMeta } from 'vue-meta'

usePageStore().pageData.title = 'Tasks'

const tasksLoader = useTasksStore()
const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value)

const columnsWithCollabs = columns(groupedCollabs)

useMeta({
  title: 'Tasks | Pulse Project Management',
  description: {
    name: 'description',
    content: 'See all tasks in Pulse.',
  },
})
</script>

<template>
  <DataTable :columns="columnsWithCollabs" :data="tasks" />
</template>
