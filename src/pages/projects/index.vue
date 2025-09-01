<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { RouterLink } from 'vue-router'
import type { Tables } from '@/database/types'
import type { ColumnDef } from '@tanstack/vue-table'

usePageStore().pageData.title = 'Projects'

const projects = ref<Tables<'projects'>[]>([])

const fetchData = async () => {
  const { data, error } = await supabase.from('projects').select()

  projects.value = data ?? []
}

await fetchData()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', {}, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/projects/${row.original.slug}`, class: 'font-medium hover:bg-muted block w-full' },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', {}, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', {}, 'Collaborators'),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, JSON.stringify(row.getValue('collaborators')))
    },
  },
]
</script>

<template>
  <DataTable :columns="columns" :data="projects" />
</template>
