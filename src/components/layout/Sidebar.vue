<script setup lang="ts">
import {
  BadgeCheckIcon,
  Building2Icon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-vue-next'

defineEmits(['taskClicked'])

const { profile } = storeToRefs(useAuthStore())

const links = [
  { title: 'Dashboard', to: '/', icon: HouseIcon },
  { title: 'Projects', to: '/projects', icon: Building2Icon },
  { title: 'My Tasks', to: '/tasks', icon: BadgeCheckIcon },
]

const accountLinks = computed(() => {
  return [
    { title: 'Profile', to: '/users/' + profile.value?.username, icon: UserIcon },
    { title: 'Sign Out', icon: LogOutIcon },
  ]
})

const router = useRouter()

const executeAction = async (linkTitle: string) => {
  if (linkTitle === 'Sign Out') {
    const { logout } = await import('@/utils/supaAuth')
    const isLoggoutOut = await logout()

    if (isLoggoutOut) router.push('/login')
  }
}
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
        <SidebarLinks :links="accountLinks" @actionClicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
