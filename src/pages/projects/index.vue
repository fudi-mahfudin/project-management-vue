<script setup lang="ts">
import { useCollabs } from '@/composables/collabs'
import { useProjectsStore } from '@/stores/loaders/projects'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { useMeta } from 'vue-meta'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(projects.value)

const columnsWithCollabs = columns(groupedCollabs)

useMeta({
  title: 'Projects | Pulse Project Management',
  description: {
    name: 'description',
    content: 'See all projects in Pulse.',
  },
})
</script>

<template>
  <DataTable :columns="columnsWithCollabs" :data="projects" />
</template>
