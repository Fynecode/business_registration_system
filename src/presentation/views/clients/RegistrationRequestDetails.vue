<script setup lang="ts">

import { useGetRequestById } from '@/presentation/composables/request/useGetRequestById'
import { onMounted, ref } from 'vue'

const param = useRoute().params.id
const request = ref()
const requestsLoading = ref(false)
const requestsError = ref('')

async function loadBusinessRequests() {
  requestsLoading.value = true
  requestsError.value = ''

  try {
    request.value = await useGetRequestById(param as string)
    console.log('Loaded request:', request.value)
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
    <main class="p-4 bg-[#f6f2eb] min-h-screen text-stone-950">
        <header class="mb-8 flex flex-col gap-5 rounded-[2rem] bg-white px-5 py-5 shadow-xl shadow-stone-300/40 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
                <p class="text-sm font-bold uppercase text-emerald-800">Registration Request</p>
                <h1 class="mt-2 text-3xl font-bold text-stone-950 sm:text-4xl">{{ request?.proposedNames?.[0] || 'Unknown' }} Request Details</h1>
                <p class="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                    View the details of your business registration request, including status updates, submitted information, and next steps.
                </p>
            </div>

            <router-link to="/client" class="inline-flex items-center gap-2 hover:gap-3 transition-all rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 transition">
                <icon-lucide-arrow-left class="h-4 w-4" />
                Back to Dashboard
            </router-link>
        </header>
        
        <section>
        <div class="p-4 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4">Basic Information</h2>
            <p><strong>Proposed Name:</strong> {{ request?.proposedNames?.[0] || 'N/A' }}</p>
            <p><strong>Status:</strong> {{ request?.status || 'N/A' }}</p>
            <p><strong>Submitted At:</strong> {{ request ? new Date(request.createdAt).toLocaleString() : 'N/A' }}</p>
            <!-- Add more fields as necessary -->
        </div>
    </section>
    </main>
    
    
</template>