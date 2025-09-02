import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/Auth'

export async function register(formData: RegisterForm) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.log(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: `${formData.firstName} ${formData.lastName}`,
    })

    if (error) return console.log('Profile err: ', error)
  }

  return true
}

export async function login(formData: LoginForm) {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.log(error)

  return true
}
