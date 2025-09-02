import { type Project, type Projects, projectBySlugQuery, projectsQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)
  const loadProjects = useMemoize(async (_key: string) => await projectsQuery)
  const loadProjectBySlug = useMemoize(async (slug: string) => await projectBySlugQuery(slug))

  interface ValidateCacheParams {
    resultRef: typeof projects | typeof project
    query: typeof projectsQuery | typeof projectBySlugQuery
    key: string
    loaderFn: typeof loadProjects | typeof loadProjectBySlug
  }

  const validateCache = ({ resultRef, query, key, loaderFn }: ValidateCacheParams) => {
    if (resultRef.value) {
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

  const getProjects = async () => {
    projects.value = null
    const { data, error, status } = await loadProjects('projects-list')

    if (error) useErrorStore().setError({ error: error, customCode: status })
    projects.value = data ?? []

    validateCache({
      resultRef: projects,
      query: projectsQuery,
      key: 'projects-list',
      loaderFn: loadProjects,
    })
  }

  const getProjectBySlug = async (slug: string) => {
    project.value = null
    const { data, error, status } = await loadProjectBySlug(slug)

    if (error) useErrorStore().setError({ error: error, customCode: status })
    project.value = data

    validateCache({
      resultRef: project,
      query: projectBySlugQuery,
      key: slug,
      loaderFn: loadProjectBySlug,
    })
  }

  return {
    projects,
    getProjects,
    project,
    getProjectBySlug,
  }
})
