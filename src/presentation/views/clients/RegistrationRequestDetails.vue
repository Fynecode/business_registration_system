<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CalendarArrowDownIcon } from 'lucide-vue-next'
import navbar from '@/components/navbar.vue'
import SectionCard from '@/components/SectionCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import PrimaryBtn from '@/components/PrimaryBtn.vue'
import { useGetRequestById } from '@/presentation/composables/request/useGetRequestById'
import type { BusinessRequest } from '@/domain/businessRequest/business.request.types'
import { useAuthStore } from '@/presentation/stores/auth.store'

const route = useRoute()
const router = useRouter()
const requestId = computed(() => route.params.id as string)
const request = ref<BusinessRequest | null>(null)
const requestsLoading = ref(false)
const requestsError = ref('')
const profile = useAuthStore()

const requestTitle = computed(() => {
  const firstName = request.value?.proposedNames?.[0]
  return firstName ? `${firstName} Request Details` : 'Registration Request Details'
})

function formatDate(value: Date | string) {
  if (!value) return 'Unavailable'

  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Unavailable'
  }

  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatBusinessType(type: BusinessRequest['businessType']) {
  return type?.replaceAll('_', ' ') ?? 'Unknown'
}

async function loadBusinessRequest() {
  requestsLoading.value = true
  requestsError.value = ''

  try {
    request.value = await useGetRequestById(requestId.value)
  } catch (error) {
    requestsError.value = 'Could not load the registration request details.'
  } finally {
    requestsLoading.value = false
  }
}

onMounted(() => {
  loadBusinessRequest()
})
</script>

<template>
  <navbar />

  <main class="min-h-screen bg-[#f6f2eb] pl-20 text-stone-950">
    <div class="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
      <header class="mb-8 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-stone-300/40">
        <div class="grid gap-6 bg-[#183d36] px-6 py-8 text-white lg:grid-cols-[1fr_0.5fr] lg:px-8">
          <div class="">
            <p class="text-sm font-bold uppercase text-amber-200">Request details</p>
            <h1 class="mt-2 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{{ requestTitle }}</h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/75">
              Review the full request summary, status, client details, and supporting documents in one place.
            </p>
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-sm font-bold uppercase text-amber-200">Request number</p>
                <p class="mt-2 text-lg font-bold text-white">{{ request?.requestNumber ?? '—' }}</p>
              </div>
              <div>
                <StatusBadge :status="request?.status ?? 'draft'" />
              </div>
            </div>
            <p class="mt-4 text-sm text-emerald-50/80">
              Loaded from your request history. Use the actions panel to navigate back to your dashboard.
            </p>
          </div>
        </div>
      </header>

      <div class="grid gap-6 lg:grid-cols-[1.8fr_0.9fr]">
        <div class="space-y-6">
          <div v-if="requestsLoading" class="rounded-[2rem] bg-stone-50 p-10 text-center text-stone-500 shadow-xl shadow-stone-200/80">
            Loading request details...
          </div>

          <div v-else-if="requestsError" class="rounded-[2rem] bg-red-50 p-6 text-sm font-semibold text-red-700 shadow-sm">
            {{ requestsError }}
          </div>

          <template v-else>
            <SectionCard>
              <SectionHeader
                kicker="Overview"
                title="Request summary"
                description="A quick snapshot of the registration request status and metadata."
              />

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Business type</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ formatBusinessType(request?.businessType ?? 'pty_ltd') }}</p>
                </div>

                <div class="rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Submitted</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ request ? formatDate(request.createdAt) : 'Unavailable' }}</p>
                </div>

                <div class="rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Last updated</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ request ? formatDate(request.updatedAt) : '-' }}</p>
                </div>

                <div class="rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Reviewer</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ request?.reviewedBy ?? 'Not assigned' }}</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard>
              <SectionHeader
                kicker="Proposal"
                title="Proposed business names"
                description="The name options included with this request."
              />

              <div class="grid gap-4">
                <template v-for="(name, index) in request?.proposedNames ?? []" :key="index">
                  <div class="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                    <p class="text-sm text-stone-500">Choice {{ index + 1 }}</p>
                    <p class="mt-2 text-base font-bold text-stone-950">{{ name || 'Not provided' }}</p>
                  </div>
                </template>
              </div>
            </SectionCard>

            <SectionCard>
              <SectionHeader
                kicker="Contact"
                title="Client and address details"
                description="Who submitted the request and where the business is located."
              />

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-3 rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Email</p>
                  <p class="text-base font-bold text-stone-950">{{ request?.email? 'Not provided' : profile?.profile?.email  }}</p>
                </div>
                <div class="space-y-3 rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Phone</p>
                  <p class="text-base font-bold text-stone-950">{{ request?.phone ? 'Not provided' : profile?.profile?.phone }}</p>
                </div>
                <div class="sm:col-span-2 rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Address</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ request?.address? 'Not provided' : 'Not provided' }}</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard>
              <SectionHeader
                kicker="Documents"
                title="Supporting documents"
                description="Any files attached to the request."
              />

              <div class="space-y-3">
                <div v-if="request?.documents?.length" class="grid gap-3">
                  <div
                    v-for="document in request.documents"
                    :key="document.publicId"
                    class="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4"
                  >
                    <p class="text-sm font-bold text-stone-950">{{ document.fileName }}</p>
                    <p class="mt-1 text-sm text-stone-500">{{ document.mimeType || 'Document' }}</p>
                  </div>
                </div>
                <div v-else class="rounded-[1.5rem] border border-dashed border-stone-200 bg-stone-50 p-6 text-stone-500">
                  No supporting documents were added to this request.
                </div>
              </div>
            </SectionCard>
          </template>
        </div>

        <aside class="grid max-h-screen gap-6 sticky">
          <SectionCard class="row-span-2 ">
            <SectionHeader title="Timeline" :icon="CalendarArrowDownIcon" />
            <div class=" border border-emerald-700 p-2 rounded-lg max-h-full w-full overflow-y-scroll">
              <p class="text-[16px] text-stone-400">
                <strong class="text-stone-500">Created at:</strong> {{ request ? formatDate(request.createdAt) : 'Unavailable' }}
              </p>
            </div>
          </SectionCard>

          <SectionCard class="">
            <SectionHeader title="Quick actions" />
            <div class="space-y-3">
              <PrimaryBtn class="w-full" type="button" @click="router.push('/client')">Back to dashboard</PrimaryBtn>
              <button
                class="inline-flex w-full items-center justify-center rounded-2xl bg-stone-100 px-4 py-3 text-sm font-bold text-stone-900 transition hover:bg-stone-200"
                type="button"
                @click="window.history.back()"
              >
                Return to previous page
              </button>
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  </main>
</template>