import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const testingUserEmail = process.env.TESTING_USER_EMAIL
if (!testingUserEmail) {
  console.error('Have you forgot to add TESTING_USER_EMAIL to .env.local?')
  process.exit()
}

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = (stepMessage) => console.log(`\n${stepMessage}\n`)

const PrimaryTestUserExists = async () => {
  logStep('Checking if primary test user exists...')
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', 'testaccount1')
    .single()

  if (error) {
    console.log('Primary test user not found. Will create one.')
    return false
  }

  logStep('Primary test user found.')
  return data.id
}

const createPrimaryTestUser = async () => {
  logStep('Create primary test user...')
  const firstName = 'Test'
  const lastName = 'Account'
  const userName = 'testaccount1'
  const email = testingUserEmail
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: 'Passw0rd',
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        username: userName,
      },
    },
  })

  if (error) logErrorAndExit('User', error)

  if (data) {
    const userId = data.user.id
    await supabase.from('profiles').insert({
      id: userId,
      username: userName,
      full_name: `${firstName} ${lastName}`,
      bio: 'The main testing account',
      avatar_url: `https://i.pravatar.cc/150?u=${userId}`,
    })

    logStep('Primary test user created successfully.')
    return userId
  }
}

async function seedProjects(numEntries = 10, userId) {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name: name,
      slug: name.toLowerCase().replace(' ', '-'),
      description: faker.lorem.paragraph(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([userId]),
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) return console.error('Projects', error)

  return data
}

async function seedTasks(numEntries, projectsIds, userId) {
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(1),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectsIds),
      collaborators: faker.helpers.arrayElements([userId]),
      profile_id: userId,
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) return console.error('Tasks', error)

  return data
}

const seedDatabase = async (numEntriesPerTable) => {
  let userId

  const testUserId = await PrimaryTestUserExists()

  if (!testUserId) {
    const primaryTestUserId = await createPrimaryTestUser()
    userId = primaryTestUserId
  } else {
    userId = testUserId
  }

  const projects = await seedProjects(numEntriesPerTable, userId)
  const projectsIds = projects.map((p) => p.id)
  await seedTasks(numEntriesPerTable, projectsIds, userId)
}

const numEntriesPerTable = 10
seedDatabase(numEntriesPerTable)
