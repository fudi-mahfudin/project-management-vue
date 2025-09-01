<script setup lang="ts">
import { taskQuery } from '@/utils/supaQueries'
import type { Task } from '@/utils/supaQueries'

const route = useRoute('/tasks/[id]')
const task = ref<Task | null>(null)

watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${task.value?.name || ''}`
  },
)

const getTask = async () => {
  const { data, error } = await taskQuery(route.params.id)

  if (error) console.log(error)
  task.value = data
}

await getTask()
</script>

<template>
  <Table v-if="task">
    <TableRow>
      <TableHead>Name</TableHead>
      <TableCell>{{ task.name }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Description</TableHead>
      <TableCell>{{ task.description }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Assignee</TableHead>
      <TableCell>Not yet...</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableCell>{{ task.projects?.name }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Status</TableHead>
      <TableCell>{{ task.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Due Date</TableHead>
      <TableCell>{{ task.due_date }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Collaborators</TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in task.collaborators"
            :key="collab"
          >
            <RouterLink to="" class="w-full h-full flex items-center justify-center">
              <AvatarImage src="" alt="" />
              <AvatarFallback>AC</AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
    <TableRow class="hover:bg-transparent">
      <TableHead class="align-top pt-4">Comments</TableHead>
      <TableCell>Comments...</TableCell>
    </TableRow>
  </Table>
</template>

<style scoped>
@reference '@/index.css';
th {
  @apply w-[100px];
}
h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}
.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md dark:bg-slate-900 h-80;
}
</style>
