<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, reactive } from 'vue'
import TextField from '@/components/TextField.vue'
import PrimaryBtn from '@/components/PrimaryBtn.vue'

import { useLogin } from '@/presentation/composables/profile/useLogin'
import { useSignUp } from '@/presentation/composables/profile/useSignUp'
import { useRouter } from 'vue-router'


type AuthMode = 'login' | 'signup'

const mode = ref<AuthMode>('login')
const router = useRouter()
const activePromo = ref(0)
const isLoading = ref(false)
const formData = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  role: 'client',
})
const errorMsg = ref()

const promotions = [
  {
    kicker: 'Business registration',
    body: 'Reserve a business name, prepare registration documents, and keep every statutory step visible from one workspace.',
    metric: '48h',
    metricLabel: 'Typical document prep',
    icon: 'registration',
  },
  {
    kicker: 'Bookkeeping',
    body: 'Track expenses, invoices, reconciliations, and reports with a calmer flow for growing teams.',
    metric: '30%',
    metricLabel: 'Less admin follow-up',
    icon: 'bookkeeping',
  },
  {
    kicker: 'Advisory support',
    body: 'Get reminders and practical support for returns, renewals, and records your business depends on.',
    metric: '1:1',
    metricLabel: 'Guided client support',
    icon: 'support',
  },
]

let carouselTimer: ReturnType<typeof window.setInterval> | undefined

const currentPromo = computed(() => promotions[activePromo.value])
const heading = computed(() => (mode.value === 'login' ? 'Welcome back' : 'Create your account'))
const submitLabel = computed(() => (mode.value === 'login' ? 'Sign in' : 'Create account'))

function selectMode(nextMode: AuthMode) {
  mode.value = nextMode
  errorMsg.value = ''
}

function showPromo(index: number) {
  activePromo.value = index
}

function nextPromo() {
  activePromo.value = (activePromo.value + 1) % promotions.length
}

function previousPromo() {
  activePromo.value = (activePromo.value - 1 + promotions.length) % promotions.length
}

async function handleSubmit() {
  isLoading.value = true
  errorMsg.value = ''
  let profile
  if(mode.value === 'login'){
    try{
      profile = await useLogin(formData.email, formData.password)
      if(profile.role === 'client'){
        router.push('/client')
      } else if(profile.role === 'admin' || profile.role === 'staff') {
        router.push('/admin')
      }
    } catch(error){
      console.error('An error has occcured', error)
      errorMsg.value = 'Invalid email or password'
    }
  }else{
    try{
      profile = await useSignUp({email: formData.email, password: formData.password, first_name: formData.firstName, last_name: formData.lastName, phone: formData.phone, role: 'client'})
      if(profile.role === 'client'){
        router.push('/client')
      } else if(profile.role === 'admin' || profile.role === 'staff') {
        router.push('/admin')
      }
    } catch(error){
      console.error('An error has occcured', error)
      errorMsg.value = 'Failed to create account. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  return
}

onMounted(() => {
  carouselTimer = window.setInterval(nextPromo, 6500)
})

onBeforeUnmount(() => {
  if (carouselTimer) {
    window.clearInterval(carouselTimer)
  }
})
</script>

<template>
  <main class="min-h-screen bg-[#f6f2eb] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
    <section class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-stone-300/60 lg:grid-cols-[0.92fr_1.08fr]">
      <div class="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12">
        <div class="mb-10 flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow-lg shadow-emerald-900/20">
            <icon-lucide-landmark class="h-5 w-5" />
          </div>
          <div>
            <p class="text-sm font-semibold uppercase text-emerald-800">Business</p>
            <p class="text-xs font-medium text-stone-500">Registration system</p>
          </div>
        </div>

        <div class="mb-8">
          <p class="mb-3 text-sm font-semibold text-emerald-800">
            {{ mode === 'login' ? 'Access portal' : 'New onboarding' }}
          </p>
          <h1 class="text-4xl font-bold text-stone-950 sm:text-5xl">{{ heading }}</h1>
          <p class="mt-4 max-w-md text-sm leading-6 text-stone-600">
            Access bookkeeping, registrations, compliance updates, and client records from one secure workspace.
          </p>
        </div>

        <div class="mb-7 grid grid-cols-2 rounded-2xl bg-stone-100 p-1">
          <button
            type="button"
            class="cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold transition"
            :class="mode === 'login' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'"
            @click="selectMode('login')"
          >
            Login
          </button>
          <button
            type="button"
            class="cursor-pointer rounded-xl px-4 py-3 text-sm font-semibold transition"
            :class="mode === 'signup' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'"
            @click="selectMode('signup')"
          >
            Sign up
          </button>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div v-if="mode === 'signup'" class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="first-name" class="text-sm font-semibold text-stone-700">First name</label>
              <input
                id="first-name"
                v-model="formData.firstName"
                type="text"
                autocomplete="name"
                class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label for="last-name" class="text-sm font-semibold text-stone-700">Last name</label>
              <input
                id="last-name"
                v-model="formData.lastName"
                type="text"
                autocomplete="name"
                class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div v-if="mode === 'signup'">
              <label for="phone" class="text-sm font-semibold text-stone-700">Phone</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                autocomplete="tel"
                class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                placeholder="081 234 5678"
                required
              />
          </div>

          <TextField
            label="Email address"
            v-model="formData.email"
            type="email"
            autocomplete="email"
            placeholder="example@gmail.com"
            required
          />

          <div>
            <div class="flex items-center justify-between gap-3">
              <label for="password" class="text-sm font-semibold text-stone-700">Password</label>
              <button v-if="mode === 'login'" type="button" class="text-sm font-semibold text-emerald-800 hover:text-emerald-950">
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
              class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder="Enter your password"
              required
            />
          </div>

          <p v-if="errorMsg" class="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {{ errorMsg }}
          </p>

          <primary-btn :loading="isLoading" type="submit" class="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold">
            {{ submitLabel }}
            <icon-lucide-arrow-right class="h-4 w-4" />
          </primary-btn>

        </form>
      </div>

      <aside class="relative hidden min-h-full overflow-hidden bg-[#183d36] p-8 text-white lg:block">
        <div class="absolute inset-x-8 top-8 flex items-center justify-between">
          <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase text-emerald-50 backdrop-blur">
            Growth services
          </span>
          <div class="flex gap-2">
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
              aria-label="Previous promotion"
              @click="previousPromo"
            >
              <icon-lucide-chevron-left class="h-5 w-5" />
            </button>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
              aria-label="Next promotion"
              @click="nextPromo"
            >
              <icon-lucide-chevron-right class="h-5 w-5" />
            </button>
          </div>
        </div>

        <div class="flex h-full flex-col justify-center pt-24">
          <div class="mb-10 grid grid-cols-[auto_1fr] gap-5">
            <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-300 text-emerald-950 shadow-xl shadow-black/20">
              <icon-lucide-building-2 v-if="currentPromo.icon === 'registration'" class="h-8 w-8" />
              <icon-lucide-receipt-text v-else-if="currentPromo.icon === 'bookkeeping'" class="h-8 w-8" />
              <icon-lucide-handshake v-else class="h-8 w-8" />
            </div>
            <div class="pt-1">
              <p class="text-sm font-bold uppercase text-amber-200">{{ currentPromo.kicker }}</p>
              <p class="max-w-xl text-lg leading-8 text-emerald-50/85">{{ currentPromo.body }}</p>
            </div>
          </div>

          <div class="mt-12 grid grid-cols-[0.55fr_1fr] gap-5">
            <div class="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p class="text-5xl font-bold text-amber-200">{{ currentPromo.metric }}</p>
              <p class="mt-3 text-sm font-semibold text-emerald-50/80">{{ currentPromo.metricLabel }}</p>
            </div>
            <div class="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
              <div class="mb-5 flex items-center gap-3">
                <icon-lucide-sparkles class="h-5 w-5 text-amber-200" />
                <p class="text-sm font-bold uppercase text-emerald-50">Popular bundle</p>
              </div>
              <p class="text-2xl font-bold leading-snug">Registration plus monthly bookkeeping support.</p>
            </div>
          </div>

          <div class="mt-10 flex items-center gap-3">
            <button
              v-for="(_, index) in promotions"
              :key="index"
              type="button"
              class="h-2.5 rounded-full transition"
              :class="index === activePromo ? 'w-10 bg-amber-200' : 'w-2.5 bg-white/35 hover:bg-white/60'"
              :aria-label="`Show promotion ${index + 1}`"
              @click="showPromo(index)"
            />
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>
