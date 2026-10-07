<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CalendarArrowDownIcon, DownloadCloud } from 'lucide-vue-next'
import navbar from '@/components/navbar.vue'
import SectionCard from '@/components/SectionCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import PrimaryBtn from '@/components/PrimaryBtn.vue'
import { useGetRequestDetails } from '@/presentation/composables/request/useGetRequestDetails'
import { approveRequestUseCase, rejectRequestUseCase, updateRequestStatusUseCase } from '@/services/business-request.services'
import type { RegistrationRequestDetails } from '@/domain/businessRequest/registration-request-details.type'
import { useAuthStore } from '@/presentation/stores/auth.store'
import { useDownloadDocument } from '@/presentation/composables/document/useDownloadDocument'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const requestId = computed(() => route.params.id as string)
const request = ref<RegistrationRequestDetails | null>()
const requestsLoading = ref(false)
const requestsError = ref('')
const showRegisterConfirmation = ref(false)
const showRejectModal = ref(false)
const rejectReason = ref('')
const actionLoading = ref(false)

const isAdminOrStaff = computed(() => {
  return authStore.profile?.role === 'admin' || authStore.profile?.role === 'staff'
})

const dashboardRoute = computed(() => (isAdminOrStaff.value ? '/admin' : '/client'))

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

function formatBusinessType(type: RegistrationRequestDetails['request']['businessType']) {
  return type?.replaceAll('_', ' ') ?? 'Unknown'
}

async function loadBusinessRequest() {
  requestsLoading.value = true
  requestsError.value = ''

  try {
    request.value = await useGetRequestDetails(requestId.value)
    console.log(request.value)
  } catch (error) {
    requestsError.value = 'Could not load the registration request details.'
  } finally {
    requestsLoading.value = false
  }
}

async function approveRequest() {
  if (!request.value || !isAdminOrStaff.value) return

  try {
    actionLoading.value = true
    request.value.request = await approveRequestUseCase.execute(request.value.request?.id, authStore.profile?.id ?? '')
  } catch (error) {
    requestsError.value = 'Unable to approve the request.'
  } finally {
    actionLoading.value = false
  }
}

function openRegisterConfirmation() {
  showRegisterConfirmation.value = true
}

async function registerRequest() {
  if (!request.value || !isAdminOrStaff.value) return

  try {
    actionLoading.value = true
    request.value.request = await updateRequestStatusUseCase.execute(
      request.value.request.id,
      'registered',
      authStore.profile?.id ?? ''
    )
    showRegisterConfirmation.value = false
  } catch (error) {
    requestsError.value = 'Unable to register the request.'
  } finally {
    actionLoading.value = false
  }
}

function openRejectModal() {
  rejectReason.value = ''
  showRejectModal.value = true
}

function closeRejectModal() {
  showRejectModal.value = false
}

async function rejectRequest() {
  if (!request.value || !isAdminOrStaff.value) return
  if (!rejectReason.value.trim()) {
    requestsError.value = 'Please enter a reason for rejection.'
    return
  }

  try {
    actionLoading.value = true
    request.value.request = await rejectRequestUseCase.execute(request.value.request.id, authStore.profile?.id ?? '', rejectReason.value.trim())
    showRejectModal.value = false
  } catch (error) {
    requestsError.value = 'Unable to reject the request.'
  } finally {
    actionLoading.value = false
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
            <h1 class="mt-2 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl text-slate-200"><span class="text-white">{{ request?.proposedNames?.[0] }}</span> Request Details</h1>
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
                  <p class="text-sm font-semibold text-stone-500">Reviewer number</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ request?.reviewer ? `${request.reviewer.phone} ` : 'Not assigned' }}</p>
                </div>

                <div class="rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Reviewer name</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ request?.reviewer ? `${request.reviewer.first_name} ${request.reviewer.last_name}` : 'Not assigned' }}</p>
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
                    <p class="text-sm text-stone-500">Choice {{ Number(index) + 1 }}</p>
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
                  <p class="text-base font-bold text-stone-950">{{ request?.email ?? authStore?.profile.email ?? 'Not provided' }}</p>
                </div>
                <div class="space-y-3 rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Phone</p>
                  <p class="text-base font-bold text-stone-950">{{ request?.phone ?? authStore?.profile.phone ?? 'Not provided' }}</p>
                </div>
                <div class="sm:col-span-2 rounded-[1.5rem] bg-stone-50 p-5">
                  <p class="text-sm font-semibold text-stone-500">Address</p>
                  <p class="mt-2 text-base font-bold text-stone-950">{{ request?.address ?? 'Not provided' }}</p>
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
                    class="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 flex flex-row justify-between items-center"
                  >
                  <div>
                    <p class="text-sm font-bold text-stone-950">{{ document.fileName }}</p>
                    <p class="mt-1 text-sm text-stone-500">{{ document.mimeType || 'Document' }}</p>
                  </div>
                    <button class="cursor-pointer" @click="useDownloadDocument(document)">
                      <DownloadCloud class="size-6 text-stone-500 hover:text-emerald-900 transition-all" />
                    </button>
                  </div>
                </div>
                <div v-else class="rounded-[1.5rem] border border-dashed border-stone-200 bg-stone-50 p-6 text-stone-500">
                  No supporting documents were added to this request.
                </div>
              </div>
            </SectionCard>
          </template>
        </div>

        <aside class="grid max-h-screen gap-6 sticky top-6">
          <SectionCard>
            <SectionHeader title="Timeline" :icon="CalendarArrowDownIcon" />
            <div class="border border-emerald-700 p-4 rounded-lg max-h-full w-full overflow-y-auto">
              <p class="text-sm font-semibold text-stone-700">Created at</p>
              <p class="mt-2 text-base font-bold text-stone-950">{{ request ? formatDate(request.createdAt) : 'Unavailable' }}</p>

              <div class="mt-5 rounded-[1.5rem] bg-stone-50 p-4">
                <p class="text-sm font-semibold text-stone-500">Current status</p>
                <div class="mt-3">
                  <StatusBadge :status="request?.status ?? 'draft'" />
                </div>
              </div>

              <div v-if="request?.rejectedReason" class="mt-5 rounded-[1.5rem] bg-red-50 p-4 text-sm text-red-700">
                <p class="font-semibold">Rejection reason</p>
                <p class="mt-2">{{ request?.rejectedReason }}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard v-if="isAdminOrStaff && request">
            <SectionHeader title="Quick actions" />
            <div class="space-y-3">
              <PrimaryBtn class="w-full" type="button" @click="router.push(dashboardRoute)">Back to dashboard</PrimaryBtn>
              <button
                class="inline-flex w-full items-center justify-center rounded-2xl bg-stone-100 px-4 py-3 text-sm font-bold text-stone-900 transition hover:bg-stone-200"
                type="button"
                @click="window.history.back()"
              >
                Return to previous page
              </button>
              <div class="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p class="mb-3 text-sm font-semibold text-stone-600">Admin actions</p>
                <div class="grid gap-3">
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                    @click="approveRequest"
                    :disabled="actionLoading || request.status === 'approved' || request.status === 'rejected' || request.status === 'registered'"
                  >
                    {{ actionLoading ? 'Updating...' : 'Approve request' }}
                  </button>
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    @click="openRejectModal"
                    :disabled="actionLoading || request.status === 'rejected' || request.status === 'registered'"
                  >
                    Reject request
                  </button>
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
                    @click="openRegisterConfirmation"
                    :disabled="actionLoading || request.status === 'registered' || request.status === 'rejected'"
                  >
                    Set as registered
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>

    <div v-if="showRegisterConfirmation" class="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4 py-6">
      <div class="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl shadow-stone-950/20">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-bold uppercase text-emerald-800">Confirm registration</p>
            <h2 class="mt-1 text-2xl font-bold text-stone-950">Register this request?</h2>
            <p class="mt-2 text-sm leading-6 text-stone-500">
              Once a request is registered, it is considered complete and cannot be moved back to review.
            </p>
          </div>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
            aria-label="Close confirmation modal"
            @click="showRegisterConfirmation = false"
          >
            <icon-lucide-x class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="rounded-2xl border border-stone-200 px-5 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-50"
            @click="showRegisterConfirmation = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            @click="registerRequest"
            :disabled="actionLoading"
          >
            {{ actionLoading ? 'Registering...' : 'Confirm registration' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showRejectModal" class="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4 py-6">
      <form class="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-stone-950/20" @submit.prevent="rejectRequest">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-bold uppercase text-red-700">Reject request</p>
            <h2 class="mt-1 text-2xl font-bold text-stone-950">Provide rejection reason</h2>
            <p class="mt-2 text-sm leading-6 text-stone-500">
              This reason will be stored with the request and visible to the client.
            </p>
          </div>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
            aria-label="Close reject modal"
            @click="closeRejectModal"
          >
            <icon-lucide-x class="h-5 w-5" />
          </button>
        </div>

        <label class="text-sm font-semibold text-stone-700" for="reject-reason">Reason</label>
        <textarea
          id="reject-reason"
          v-model="rejectReason"
          rows="5"
          class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
          placeholder="Enter a short reason for rejecting this request"
        />

        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="rounded-2xl border border-stone-200 px-5 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-50"
            @click="closeRejectModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/15 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="actionLoading"
          >
            {{ actionLoading ? 'Rejecting...' : 'Reject request' }}
          </button>
        </div>
      </form>
    </div>
  </main>
</template>