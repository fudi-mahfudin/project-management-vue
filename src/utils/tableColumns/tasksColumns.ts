import type { ColumnDef } from '@tanstack/vue-table'
import type { TasksWithProjects } from '../supaQueries'
import { RouterLink } from 'vue-router'

export const columns: ColumnDef<TasksWithProjects[0]>[] = [
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
          to: `/projects/${row.original.projects?.id}`,
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
