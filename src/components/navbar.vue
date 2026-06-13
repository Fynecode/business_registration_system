<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLogout } from '@/presentation/composables/useLogout'

const isOpen = ref(false)
const route = useRoute()

const isActive = (path: string) => route.path === path || route.path.startsWith(path + '/')
const isExactActive = (path: string) => route.path === path

function expandNav() {
  isOpen.value = true
}

function collapseNav() {
  isOpen.value = false
}

function toggleNav() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav
    class="fixed left-0 top-0 z-30 h-screen border-r border-white/10 bg-[#183d36] text-white shadow-2xl shadow-emerald-950/30 transition-[width] duration-300 ease-out"
    :class="isOpen ? 'w-72' : 'w-20'"
    @mouseenter="expandNav"
    @mouseleave="collapseNav"
  >
    <div class="flex h-full flex-col px-3 py-5">
      <div class="mb-8 flex items-center gap-3 px-1">
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950 shadow-lg shadow-black/15">
          <icon-lucide-landmark class="h-6 w-6" />
        </div>

        <div v-if="isOpen" class="min-w-0">
          <p class="truncate text-sm font-bold uppercase text-amber-100">Business</p>
          <p class="truncate text-xs font-medium text-emerald-50/65">Registration system</p>
        </div>
      </div>

      <ul class="flex flex-1 flex-col gap-2">
        <li>
          <router-link
            to="/client"
            class="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
          >
            <span
              :class="[
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                isExactActive('/client') ? 'bg-white text-emerald-950 shadow-lg shadow-black/10' : 'bg-white/10 text-amber-100 group-hover:bg-white/15',
              ]"
            >
              <icon-lucide-layout-dashboard class="h-5 w-5" />
            </span>
            <span v-if="isOpen" class="truncate">Dashboard</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/client/register"
            class="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
          >
            <span
              :class="[
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                isActive('/client/register') ? 'bg-white text-emerald-950 shadow-lg shadow-black/10' : 'bg-white/10 text-amber-100 group-hover:bg-white/15',
              ]"
            >
              <icon-lucide-building-2 class="h-5 w-5" />
            </span>
            <span v-if="isOpen" class="truncate">Business registration</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/client"
            class="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-100 transition group-hover:bg-white/15">
              <icon-lucide-receipt-text class="h-5 w-5" />
            </span>
            <span v-if="isOpen" class="truncate">Bookkeeping</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/client"
            class="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-100 transition group-hover:bg-white/15">
              <icon-lucide-messages-square class="h-5 w-5" />
            </span>
            <span v-if="isOpen" class="truncate">Support</span>
          </router-link>
        </li>
      </ul>

      <div class="border-t border-white/10 pt-4">
        <router-link
          to="/client/profile"
          class="group mb-2 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
        >
          <span
            :class="[
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
              isActive('/client/profile') ? 'bg-white text-emerald-950 shadow-lg shadow-black/10' : 'bg-white/10 text-amber-100 group-hover:bg-white/15',
            ]"
          >
            <icon-lucide-user-round class="h-5 w-5" />
          </span>
          <span v-if="isOpen" class="truncate">Profile</span>
        </router-link>

        <router-link
          @click="useLogout()"
          to="/login"
          class="group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/10"
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-400/15 text-red-200 transition group-hover:bg-red-400/25">
            <icon-lucide-log-out class="h-5 w-5" />
          </span>
          <span v-if="isOpen" class="truncate">Logout</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>
