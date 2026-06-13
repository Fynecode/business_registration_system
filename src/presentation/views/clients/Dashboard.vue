<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import navbar from '@/components/navbar.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import EmptyState from '@/components/EmptyState.vue'
import NotificationDropdown from '@/components/NotificationDropdown.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { Building2, ReceiptText } from 'lucide-vue-next'

import { useAuthStore } from '@/presentation/stores/auth.store'
import { useGetRequestByClientId } from '@/presentation/composables/request/useGetRequestByClientId'
import type { BusinessRequest } from '@/domain/businessRequest/business.request.types'

type PortfolioView = 'requests' | 'businesses'

const authStore = useAuthStore()
const router = useRouter()

const alerts = ref([
  { id: '1', title: 'Policy update', message: 'New filing deadlines announced. Check your dashboard for details.' },
  { id: '2', title: 'Support', message: 'Your registration request has been reviewed by staff.' },
])

const promotions = [
  {
    kicker: 'Business registration',
    title: 'Formalize your next business move.',
    body: 'Reserve a business name, prepare registration documents, and keep every statutory step visible from one workspace.',
    metric: '48h',
    metricLabel: 'Typical document prep',
    icon: Building2,
  },
  {
    kicker: 'Bookkeeping',
    title: 'Keep your books calm and current.',
    body: 'Track expenses, invoices, reconciliations, and reports with a calmer flow for growing teams.',
    metric: '30%',
    metricLabel: 'Less admin follow-up',
    icon: ReceiptText,
  },
]

const activePortfolioView = ref<PortfolioView>('businesses')
const businessRequests = ref<BusinessRequest[]>([])
const requestsLoading = ref(false)
const requestsError = ref('')

const businesses = computed(() => (authStore.profile as any)?.businesses ?? [])
const firstName = computed(() => authStore.profile?.first_name || 'there')
const hasBusinesses = computed(() => businesses.value.length > 0)
const visibleRequests = computed(() => businessRequests.value.filter((request) => request.status !== 'registered'))
const hasVisibleRequests = computed(() => visibleRequests.value.length > 0)
const registeredRequestCount = computed(() => businessRequests.value.filter((request) => request.status === 'registered').length)

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable'
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function formatBusinessType(type: BusinessRequest['businessType']) {
  return type.replaceAll('_', ' ')
}

function requestPrimaryName(request: BusinessRequest) {
  return request.proposedNames.find(Boolean) || 'Unnamed request'
}

async function loadBusinessRequests() {
  requestsLoading.value = true
  requestsError.value = ''

  try {
    businessRequests.value = await useGetRequestByClientId(authStore.profile?.id ?? null)

    if (!hasBusinesses.value && visibleRequests.value.length > 0) {
      activePortfolioView.value = 'requests'
    }
  } catch (error) {
    requestsError.value = 'Could not load your registration requests.'
  } finally {
    requestsLoading.value = false
  }
}

onMounted(() => {
  loadBusinessRequests()
})
</script>

<template>
  <navbar />

  <main class="min-h-screen bg-[#f6f2eb] pl-20 text-stone-950">
    <div class="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
      <header class="mb-8 flex flex-col gap-5 rounded-[2rem] bg-white px-5 py-5 shadow-xl shadow-stone-300/40 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p class="text-sm font-bold uppercase text-emerald-800">Client dashboard</p>
          <h1 class="mt-2 text-3xl font-bold text-stone-950 sm:text-4xl">Welcome, {{ firstName }}</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            Keep an eye on your businesses, registration requests, bookkeeping support, and important client messages.
          </p>
        </div>

        <NotificationDropdown 
          :notifications="alerts"
        ></NotificationDropdown>
      </header>

      <section class="mb-8 grid gap-5 lg:grid-cols-[1.5fr_0.7fr]">

        <HeroBanner 
          :slides="promotions"
        />

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <div class="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
            <div class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900">
                <icon-lucide-file-clock class="h-5 w-5" />
              </span>
              <div>
                <p class="text-sm font-semibold text-stone-500">Registration requests</p>
                <p class="text-3xl font-bold text-stone-950">{{ visibleRequests.length }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
            <div class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900">
                <icon-lucide-briefcase-business class="h-5 w-5" />
              </span>
              <div>
                <p class="text-sm font-semibold text-stone-500">Registered businesses</p>
                <p class="text-3xl font-bold text-stone-950">{{ businesses.length + registeredRequestCount }}</p>
              </div>
            </div>
          </div>

          <router-link
            to="/client/register"
            class="group flex items-center justify-between rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-stone-300/60 sm:col-span-2 lg:col-span-1"
          >
            <div>
              <p class="text-sm font-bold uppercase text-emerald-800">Next step</p>
              <p class="mt-2 text-lg font-bold text-stone-950">Start a request</p>
              <p class="mt-1 text-sm text-stone-500">Send a registration request for review.</p>
            </div>
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950 transition group-hover:translate-x-1">
              <icon-lucide-arrow-right class="h-5 w-5" />
            </span>
          </router-link>
        </div>
      </section>

      <section class="rounded-[2rem] bg-white p-5 shadow-xl shadow-stone-300/40 sm:p-6">
        <div class="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-sm font-bold uppercase text-emerald-800">Portfolio</p>
            <h2 class="mt-1 text-2xl font-bold text-stone-950">
              {{ activePortfolioView === 'requests' ? 'Registration requests' : 'Registered businesses' }}
            </h2>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div class="grid grid-cols-2 rounded-2xl bg-stone-100 p-1">
              <button
                type="button"
                class="cursor-pointer rounded-xl px-4 py-3 text-sm font-bold transition"
                :class="activePortfolioView === 'requests' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'"
                @click="activePortfolioView = 'requests'"
              >
                Requests {{ visibleRequests.length }}
              </button>
              <button
                type="button"
                class="cursor-pointer rounded-xl px-4 py-3 text-sm font-bold transition"
                :class="activePortfolioView === 'businesses' ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'"
                @click="activePortfolioView = 'businesses'"
              >
                Businesses {{ businesses.length + registeredRequestCount }}
              </button>
            </div>

            <router-link
              to="/client/register"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-900 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800"
            >
              <icon-lucide-plus class="h-4 w-4" />
              New request
            </router-link>
          </div>
        </div>

        <div v-if="activePortfolioView === 'requests'">
          <div v-if="requestsLoading" class="rounded-[1.5rem] bg-stone-50 px-5 py-10 text-center">
            <p class="text-sm font-semibold text-stone-500">Loading registration requests...</p>
          </div>

          <div v-else-if="requestsError" class="rounded-[1.5rem] bg-red-50 px-5 py-6 text-sm font-semibold text-red-700">
            {{ requestsError }}
          </div>

          <EmptyState
              v-if="!hasVisibleRequests"
              :icon="Building2"
              title="No registered businesses yet"
              description="Start your first registration request to track documents, updates, and bookkeeping support here."
            >

              <template #actions>
                <router-link
                  to="/client/register"
                  class="btn btn-primary"
                >
                    Start request
                    <icon-lucide-arrow-right class="h-4 w-4" />
                </router-link>
              </template>
            </EmptyState>

          <ul v-else class="grid gap-3">
            <li v-for="request in visibleRequests" :key="request.id" class="cursor-pointer" @click="router.push(`/client/registration-request/${request.id}`)">
              <article class="rounded-[1.5rem] border border-stone-100 bg-stone-50 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/50">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex min-w-0 items-center gap-4">
                    <span class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-900 shadow-sm">
                      <icon-lucide-file-clock class="h-5 w-5" />
                    </span>
                    <div class="min-w-0">
                      <p class="truncate font-bold text-stone-950">{{ requestPrimaryName(request) }}</p>
                      <p class="mt-1 text-xs font-medium capitalize text-stone-500">
                        {{ formatBusinessType(request.businessType) }} request - {{ formatDate(request.createdAt) }}
                      </p>
                    </div>
                  </div>

                  <StatusBadge :status="request.status"></StatusBadge>
                </div>
              </article>
            </li>
          </ul>
        </div>

        <div v-else>

            <EmptyState
              v-if="!hasBusinesses && registeredRequestCount === 0"
              :icon="Building2"
              title="No registered businesses yet"
              description="Start your first registration request to track documents, updates, and bookkeeping support here."
            >

              <template #actions>
                <router-link
                  to="/client/register"
                  class="btn btn-primary"
                >
                    Start request
                    <icon-lucide-arrow-right class="h-4 w-4" />
                </router-link>
              </template>
            </EmptyState>

          <ul v-else class="grid gap-3">
            <li v-for="business in businesses" :key="business.id">
              <router-link
                :to="`/client/business/${business.id}`"
                class="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-stone-100 bg-stone-50 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/50"
              >
                <div class="flex min-w-0 items-center gap-4">
                  <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-900 shadow-sm">
                    <icon-lucide-building-2 class="h-5 w-5" />
                  </span>
                  <div class="min-w-0">
                    <p class="truncate font-bold text-stone-950">{{ business.name }}</p>
                    <p class="mt-1 truncate text-xs font-medium text-stone-500">{{ business.registrationNumber || 'Registration pending' }}</p>
                  </div>
                </div>

                <icon-lucide-chevron-right class="h-5 w-5 shrink-0 text-stone-400 transition group-hover:translate-x-1 group-hover:text-emerald-900" />
              </router-link>
            </li>

            <li v-for="request in registeredRequests" :key="request.id">
              <article class="flex items-center justify-between gap-4 rounded-[1.5rem] border border-emerald-100 bg-emerald-50/50 p-4">
                <div class="flex min-w-0 items-center gap-4">
                  <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-900 shadow-sm">
                    <icon-lucide-building-2 class="h-5 w-5" />
                  </span>
                  <div class="min-w-0">
                    <p class="truncate font-bold text-stone-950">{{ requestPrimaryName(request) }}</p>
                    <p class="mt-1 truncate text-xs font-medium text-stone-500">Registered from request {{ request.requestNumber || 'pending number' }}</p>
                  </div>
                </div>

                <StatusBadge status="registered"></StatusBadge>
              </article>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </main>
</template>