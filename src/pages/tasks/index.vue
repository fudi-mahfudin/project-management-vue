<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import type { Tables } from '@/database/types'

const tasks = ref<Tables<'tasks'>[]>([])

;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  tasks.value = data ?? []
})()
</script>

<template>
  <div>
    <h1>Tasks</h1>
    <RouterLink to="/">Home</RouterLink>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>
