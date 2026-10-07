<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import navbar from '@/components/navbar.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import { useGetAllRequests } from '@/presentation/composables/request/useGetAllRequests'
import { useGetRequestByStatus } from '@/presentation/composables/request/useGetRequestByStatus'
import { useGetAllBusinesses } from '@/presentation/composables/business/useGetAllBusinesses'
import { useRouter } from 'vue-router'
import type { BusinessRequest } from '@/domain/businessRequest/business.request.types'
import type { Business } from '@/domain/business/business.types'

type TabView = 'businesses' | 'requests'

const activeTab = ref<TabView>('businesses')
const businesses = ref<Business[]>([])
const allRequests = ref<BusinessRequest[]>([])
const router = useRouter()
const loading = ref(false)
const error = ref('')

const pendingRequests = computed(() => 
  allRequests.value.filter(r => r.status === 'submitted' || r.status === 'in_review').length
)
const approvedRequests = computed(() => 
  allRequests.value.filter(r => r.status === 'approved').length
)
const rejectedRequests = computed(() => 
  allRequests.value.filter(r => r.status === 'rejected').length
)
const totalRequests = computed(() => allRequests.value.length)

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

function getStatusColor(status: string) {
  const statusMap: Record<string, string> = {
    'draft': 'gray',
    'submitted': 'blue',
    'in_review': 'yellow',
    'approved': 'green',
    'rejected': 'red',
    'registered': 'emerald',
  }
  return statusMap[status] || 'gray'
}

async function loadData() {
  loading.value = true
  error.value = ''
  
  try {
    const requestsData = await useGetAllRequests()
    const businessesData = await useGetAllBusinesses()

    console.log('Request data:',requestsData)
    
    allRequests.value = requestsData || []

    console.log('All requests:',allRequests.value)
    businesses.value = businessesData || []
  } catch (err: any) {
    error.value = err?.message || 'Failed to load data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <navbar />

  <main class="min-h-screen bg-[#f6f2eb] pl-20 text-stone-950">
    <div class="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
      <!-- Header -->
      <header class="mb-8 rounded-[2rem] bg-white px-5 py-5 shadow-xl shadow-stone-300/40 sm:px-7">
        <p class="text-sm font-bold uppercase text-emerald-800">Admin dashboard</p>
        <h1 class="mt-2 text-3xl font-bold text-stone-950 sm:text-4xl">Registrations Overview</h1>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
          Monitor all business registration requests and approved businesses from one central dashboard.
        </p>
      </header>

      <!-- Metrics Row -->
      <section class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-900">
              <icon-lucide-clock class="h-5 w-5" />
            </span>
            <div>
              <p class="text-sm font-semibold text-stone-500">Pending</p>
              <p class="text-3xl font-bold text-stone-950">{{ pendingRequests }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-900">
              <icon-lucide-check-circle-2 class="h-5 w-5" />
            </span>
            <div>
              <p class="text-sm font-semibold text-stone-500">Approved</p>
              <p class="text-3xl font-bold text-stone-950">{{ approvedRequests }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-900">
              <icon-lucide-x-circle class="h-5 w-5" />
            </span>
            <div>
              <p class="text-sm font-semibold text-stone-500">Rejected</p>
              <p class="text-3xl font-bold text-stone-950">{{ rejectedRequests }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-[2rem] bg-white p-6 shadow-xl shadow-stone-300/40">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900">
              <icon-lucide-file-text class="h-5 w-5" />
            </span>
            <div>
              <p class="text-sm font-semibold text-stone-500">Total</p>
              <p class="text-3xl font-bold text-stone-950">{{ totalRequests }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tabs Section -->
      <section class="rounded-[2rem] bg-white shadow-xl shadow-stone-300/40">
        <!-- Tab Navigation -->
        <div class="border-b border-stone-200">
          <div class="flex">
            <button
              type="button"
              @click="activeTab = 'businesses'"
              :class="activeTab === 'businesses' 
                ? 'border-b-2 border-emerald-900 text-emerald-900 font-bold' 
                : 'text-stone-500 hover:text-stone-900'"
              class="flex-1 px-6 py-4 text-sm font-semibold transition"
            >
              Registered Businesses
            </button>
            <button
              type="button"
              @click="activeTab = 'requests'"
              :class="activeTab === 'requests'
                ? 'border-b-2 border-emerald-900 text-emerald-900 font-bold'
                : 'text-stone-500 hover:text-stone-900'"
              class="flex-1 px-6 py-4 text-sm font-semibold transition-all"
            >
              Registration Requests
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Businesses Tab -->
          <div v-if="activeTab === 'businesses'">
            <div v-if="loading" class="text-center py-12">
              <icon-lucide-loader-circle class="h-8 w-8 animate-spin text-emerald-900 mx-auto mb-3" />
              <p class="text-stone-600">Loading businesses...</p>
            </div>

            <div v-else-if="businesses.length === 0" class="text-center py-12">
              <icon-lucide-briefcase-business class="h-12 w-12 text-stone-300 mx-auto mb-3" />
              <p class="text-stone-600">No registered businesses yet</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-stone-200 text-left">
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Business Name</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Registration Number</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Type</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Email</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Date Registered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="business in businesses" :key="business.id" class="border-b border-stone-200 hover:bg-stone-50 transition">
                    <td class="px-4 py-3 text-sm font-medium text-stone-900">{{ business.name }}</td>
                    <td class="px-4 py-3 text-sm text-stone-600">{{ business.registrationNumber }}</td>
                    <td class="px-4 py-3 text-sm text-stone-600 capitalize">{{ business.businessType.replaceAll('_', ' ') }}</td>
                    <td class="px-4 py-3 text-sm text-stone-600">{{ business.email || '-' }}</td>
                    <td class="px-4 py-3 text-sm text-stone-600">{{ formatDate(business.createdAt) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Requests Tab -->
          <div v-if="activeTab === 'requests'">
            <div v-if="loading" class="text-center py-12">
              <icon-lucide-loader-circle class="h-8 w-8 animate-spin text-emerald-900 mx-auto mb-3" />
              <p class="text-stone-600">Loading requests...</p>
            </div>

            <div v-else-if="allRequests.length === 0" class="text-center py-12">
              <icon-lucide-file-clock class="h-12 w-12 text-stone-300 mx-auto mb-3" />
              <p class="text-stone-600">No registration requests yet</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-stone-200 text-left">
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Request Number</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Business Name</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Type</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Status</th>
                    <th class="px-4 py-3 text-sm font-semibold text-stone-600">Date Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="request in allRequests" :key="request.id" @click="router.push(`/client/registration-request/${request.id}`)" class="border-b border-stone-200 hover:bg-stone-50 cursor-pointer transition">
                    <td class="px-4 py-3 text-sm font-medium text-stone-900">{{ request.requestNumber }}</td>
                    <td class="px-4 py-3 text-sm text-stone-600">{{ request.proposedNames[0] || 'Unnamed' }}</td>
                    <td class="px-4 py-3 text-sm text-stone-600 capitalize">{{ request.businessType.replaceAll('_', ' ') }}</td>
                    <td class="px-4 py-3 text-sm">
                      <StatusBadge :status="request.status" />
                    </td>
                    <td class="px-4 py-3 text-sm text-stone-600">{{ formatDate(request.createdAt) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>