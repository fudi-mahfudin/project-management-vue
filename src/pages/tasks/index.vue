<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { RouterLink } from 'vue-router'
import type { Tables } from '@/database/types'
import type { ColumnDef } from '@tanstack/vue-table'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<Tables<'tasks'>[]>([])

const fetchData = async () => {
  const { data, error } = await supabase.from('tasks').select(`
    *,
    projects(id, name, slug)
  `)
  tasks.value = data ?? []
}

await fetchData()

const columns: ColumnDef<Tables<'tasks'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', {}, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/tasks/${row.original.id}`, class: 'font-medium hover:bg-muted block w-full' },
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
    accessorKey: 'due_date',
    header: () => h('div', {}, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'font-medium' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'projects.name',
    header: () => h('div', {}, 'Project'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.projects?.id}`,
          class: 'font-medium hover:bg-muted block w-full',
        },
        () => row.original.projects?.name,
      )
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
  <DataTable :columns="columns" :data="tasks" />
</template>
