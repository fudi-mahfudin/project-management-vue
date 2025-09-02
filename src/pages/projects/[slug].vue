<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useProjectsStore } from '@/stores/loaders/projects'

const { slug } = useRoute('/projects/[slug]').params

const projectsLoader = useProjectsStore()
const { project } = storeToRefs(projectsLoader)
const { getProjectBySlug, updateProject } = projectsLoader

watch(
  () => project.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
  },
)

await getProjectBySlug(slug)

const { getProfilesByIds } = useCollabs()

const collabs = project.value?.collaborators
  ? await getProfilesByIds(project.value?.collaborators)
  : []
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead>Name</TableHead>
      <TableCell>
        <AppInPlaceEditText v-model="project.name" @commit="updateProject" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Description</TableHead>
      <AppInPlaceEditTextarea v-model="project.description" @commit="updateProject" />
    </TableRow>
    <TableRow>
      <TableHead>Status</TableHead>
      <AppInPlaceEditStatus v-model="project.status" @commit="updateProject" />
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
  </Table>

  <section v-if="project" class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in project.tasks" :key="task.id">
              <TableCell class="p-0">
                <RouterLink
                  :to="{ name: '/tasks/[id]', params: { id: task.id } }"
                  class="hover:bg-secondary block p-4"
                >
                  {{ task.name }}
                </RouterLink>
              </TableCell>
              <TableCell>
                <AppInPlaceEditStatus readonly :modelValue="task.status" />
              </TableCell>
              <TableCell>{{ task.due_date }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </section>
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
