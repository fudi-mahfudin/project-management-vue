<script setup lang="ts">
import { register } from '@/utils/supaAuth'

const formData = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const router = useRouter()

const handleRegister = async () => {
  const isRegistered = await register(formData.value)

  if (isRegistered) router.push('/')
}
</script>

<template>
  <div
    class="mx-auto w-full flex justify-center items-center p-10 text-center -mt-10 min-h-[90vh] h-full"
  >
    <Card class="max-w-sm w-full mx-auto h-full">
      <CardHeader>
        <CardTitle class="text-2xl">Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full">Register with Google</Button>
          <Separator label="or" />
        </div>
        <form class="grid gap-4" @submit.prevent="handleRegister">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="alphaofnaps"
              required
              v-model="formData.username"
            />
          </div>
          <div class="grid gap-2">
            <Label for="first_name">First Name</Label>
            <Input
              id="first_name"
              type="text"
              placeholder="Alpha"
              required
              v-model="formData.firstName"
            />
          </div>
          <div class="grid gap-2">
            <Label for="last_name">Last Name</Label>
            <Input
              id="last_name"
              type="text"
              placeholder="Ofnaps"
              required
              v-model="formData.lastName"
            />
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="alphaofnaps@gmail.com"
              required
              v-model="formData.email"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              required
              v-model="formData.password"
            />
          </div>
          <div class="grid gap-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              required
              v-model="formData.confirmPassword"
            />
          </div>
          <Button type="submit" class="w-full">Register</Button>
        </form>

        <div class="mt-4 text-sm text-center">
          Already have an account?
          <RouterLink to="/login" class="text-primary">Login</RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
