<script setup lang="ts">
import { login } from '@/utils/supaAuth'

const formData = ref({
  email: '',
  password: '',
})

const router = useRouter()

const handleLogin = async () => {
  const isLoggedin = await login(formData.value)

  if (isLoggedin) router.push('/')
}
</script>

<template>
  <div
    class="mx-auto w-full flex justify-center items-center p-10 text-center -mt-10 min-h-[90vh] h-full"
  >
    <Card class="max-w-sm w-full mx-auto h-full">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full">Login with Google</Button>
          <Separator label="or" />
        </div>
        <form class="grid gap-4" @submit.prevent="handleLogin">
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
          <Button type="submit" class="w-full">Login</Button>
        </form>

        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="text-primary">Register</RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
