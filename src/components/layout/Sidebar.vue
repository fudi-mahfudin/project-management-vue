<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  BadgeCheckIcon,
  Building2Icon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SidebarLinks from './SidebarLinks.vue'
import { computed } from 'vue'

const links = [
  { title: 'Dashboard', to: '/', icon: HouseIcon },
  { title: 'Projects', to: '/projects', icon: Building2Icon },
  { title: 'My Tasks', to: '/tasks', icon: BadgeCheckIcon },
]

const accountLinks = computed(() => {
  return [
    { title: 'Profile', to: '/users/me', icon: UserIcon },
    { title: 'Sign Out', icon: LogOutIcon },
  ]
})
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width] lg:w-52 w-16"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="size-8">
        <MenuIcon />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="size-8">
            <PlusIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')"> Task </DropdownMenuItem>
          <DropdownMenuItem> Project </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
