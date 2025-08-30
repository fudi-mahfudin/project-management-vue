import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function seedProjects(numEntries = 10) {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name: name,
      slug: name.toLowerCase().replace(' ', '-'),
      description: faker.lorem.paragraph(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) return console.error('Projects', error)

  return data
}

async function seedTasks(numEntries, projectsIds) {
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(1),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) return console.error('Tasks', error)

  return data
}

const projects = await seedProjects(12)
const projectsIds = projects.map((p) => p.id)
await seedTasks(30, projectsIds)
