import {
  type Task,
  type TasksWithProjects,
  deleteTaskQuery,
  taskByIdQuery,
  tasksWithProjectsQuery,
  updateTaskQuery,
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects>([])
  const task = ref<Task | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadTasks = useMemoize(async (_key: string) => await tasksWithProjectsQuery)
  const loadTaskById = useMemoize(async (id: string) => await taskByIdQuery(id))

  interface ValidateCacheParams {
    resultRef: typeof tasks | typeof task
    query: typeof tasksWithProjectsQuery | typeof taskByIdQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTaskById
  }

  const validateCache = ({ resultRef, query, key, loaderFn }: ValidateCacheParams) => {
    if (resultRef.value && Array.isArray(resultRef.value) && resultRef.value.length) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(resultRef.value) === JSON.stringify(data)) {
          // Cache still equal
          return
        } else {
          // Cache is stale, update cache
          loaderFn.delete(key)
          if (!error && data) resultRef.value = data
        }
      })
    }
  }

  const getTasks = async () => {
    tasks.value = []
    const { data, error, status } = await loadTasks('tasks-list')

    if (error) useErrorStore().setError({ error: error, customCode: status })
    tasks.value = data ?? []

    validateCache({
      resultRef: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks-list',
      loaderFn: loadTasks,
    })
  }

  const getTaskById = async (id: string) => {
    task.value = null
    const { data, error, status } = await loadTaskById(id)

    if (error) useErrorStore().setError({ error: error, customCode: status })
    task.value = data

    validateCache({
      resultRef: task,
      query: taskByIdQuery,
      key: id,
      loaderFn: loadTaskById,
    })
  }

  const updateTask = async () => {
    if (!task.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    await updateTaskQuery(taskProperties, task.value.id)
  }

  const deleteTask = async () => {
    if (!task.value) return
    await deleteTaskQuery(task.value.id)
  }

  return { tasks, getTasks, task, getTaskById, updateTask, deleteTask }
})
