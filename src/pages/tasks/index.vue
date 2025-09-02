<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useTasksStore } from '@/stores/loaders/tasks'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasksLoader = useTasksStore()
const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value)

const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
  <DataTable :columns="columnsWithCollabs" :data="tasks" />
</template>
