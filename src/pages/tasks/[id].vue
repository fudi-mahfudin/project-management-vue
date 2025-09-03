<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useTasksStore } from '@/stores/loaders/tasks'
import { LoaderCircleIcon, Trash2Icon } from 'lucide-vue-next'

const { id } = useRoute('/tasks/[id]').params

const tasksLoader = useTasksStore()
const { task } = storeToRefs(tasksLoader)
const { getTaskById, updateTask, deleteTask } = tasksLoader

watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${task.value?.name || ''}`
  },
)

await getTaskById(id)
const { getProfilesByIds } = useCollabs()

const collabs = task.value?.collaborators ? await getProfilesByIds(task.value?.collaborators) : []

const deleteLoading = ref(false)
const router = useRouter()
const triggerDelete = async () => {
  deleteLoading.value = true
  await deleteTask()
  deleteLoading.value = false
  router.push({ name: '/tasks/' })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <Table v-if="task">
      <TableRow>
        <TableHead>Name</TableHead>
        <TableCell>
          <AppInPlaceEditText v-model="task.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Description</TableHead>
        <TableCell>
          <AppInPlaceEditTextarea v-model="task.description" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Assignee</TableHead>
        <TableCell>Not yet...</TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableCell class="p-0">
          <RouterLink
            :to="{ name: '/projects/[slug]', params: { slug: task.projects?.slug || '' } }"
            class="p-2 block hover:bg-secondary"
          >
            {{ task.projects?.name }}
          </RouterLink>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Status</TableHead>
        <TableCell>
          <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" />
        </TableCell>
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
              v-for="collab in collabs"
              :key="collab.id"
            >
              <RouterLink
                :to="{ name: '/users/[username]', params: { username: collab.username } }"
                class="w-full h-full flex items-center justify-center"
              >
                <AvatarImage :src="collab.avatar_url || ''" alt="profile image" />
                <AvatarFallback>{{ collab.username.charAt(0).toUpperCase() }}</AvatarFallback>
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
    <Button
      @click="triggerDelete"
      class="self-end mt-3 w-full max-w-40"
      variant="destructive"
      :disabled="deleteLoading"
    >
      <Transition name="scale" mode="out-in">
        <LoaderCircleIcon v-if="deleteLoading" class="mr-1 animate-spin" />
        <Trash2Icon v-else class="mr-1" />
      </Transition>
      Delete Task
    </Button>
  </div>
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
