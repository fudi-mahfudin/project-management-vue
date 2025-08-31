<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { MoonIcon, SearchIcon, SunIcon } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const profile = {
  avatar_url: 'https://github.com/andrewbale.png',
  full_name: 'Andrew Bale',
}

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center">
    <form class="relative h-fit w-full max-w-96">
      <SearchIcon class="absolute top-1/2 -translate-y-1/2 left-2.5 text-muted-foreground size-4" />
      <Input class="w-full pl-8 bg-background" type="text" placeholder="Search..." />
    </form>

    <div class="flex justify-center items-center gap-1">
      <Button @click="toggleDark()" class="size-8">
        <Transition name="scale" mode="out-in">
          <SunIcon v-if="isDark" />
          <MoonIcon v-else />
        </Transition>
      </Button>
      <div class="w-8">
        <DropdownMenu v-if="profile">
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                :src="profile.avatar_url || ''"
                :alt="`${profile.full_name} profile picture`"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
