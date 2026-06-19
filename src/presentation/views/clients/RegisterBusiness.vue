<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ListPlus, Building2, UserRound, Paperclip, BadgeQuestionMark } from 'lucide-vue-next'
import navbar from '@/components/navbar.vue'
import SectionCard from '@/components/SectionCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import TextField from '@/components/TextField.vue'
import TextareaField from '@/components/TextareaField.vue'
import PrimaryBtn from '@/components/PrimaryBtn.vue'

import { useAuthStore } from '@/presentation/stores/auth.store'
import type { businessType } from '@/domain/businessRequest/business.request.types'
import { useCreateRequest } from '@/presentation/composables/request/useCreateRequest'
import type { Document } from '@/domain/document/document.types'

const authStore = useAuthStore()

const documentNames = ref<string[]>([])
const documentFiles = ref<File[]>([])
const submissionMessage = ref('')

const businessTypeOptions: Array<{ label: string; value: businessType; description: string }> = [
  {
    label: 'Sole proprietorship',
    value: 'sole_proprietorship',
    description: 'Best for an individual trading under a business name.',
  },
  {
    label: 'Partnership',
    value: 'partnership',
    description: 'For two or more people running a business together.',
  },
  {
    label: 'Close corporation',
    value: 'cc',
    description: 'For existing CC registration and related updates.',
  },
  {
    label: 'Private company',
    value: 'pty_ltd',
    description: 'For a Pty Ltd company registration request.',
  },
  {
    label: 'Non-profit',
    value: 'non_profit',
    description: 'For a non-profit registration request.',
  },
]

const requestForm = reactive({
  proposedNames: ['', '', ''] as [string, string, string],
  email: '',
  phone:  '',
  address: '',
  businessType: 'pty_ltd' as businessType,
})

const selectedBusinessType = computed(() =>
  businessTypeOptions.find((option) => option.value === requestForm.businessType),
)

const requiredDocuments = computed(() => {
  const baseDocuments = ['Certified ID copy', 'Proof of address']

  if (requestForm.businessType === 'partnership') {
    return [...baseDocuments, 'Partner details']
  }

  if (requestForm.businessType === 'non_profit') {
    return [...baseDocuments, 'Founding statement or constitution']
  }

  return baseDocuments
})

function handleDocumentUpload(event: Event) {
  documentFiles.value = Array.from((event.target as HTMLInputElement).files ?? [])
  documentNames.value = documentFiles.value.map((file) => file.name)
}

async function buildBusinessRequest() {
  const status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'registered' = 'draft'

  requestForm.proposedNames
    .map((name) => name.trim())
    .filter(Boolean) as [string, string?, string?]

  const requestNumber = `REQ-${Date.now()}`
  const request = {
    clientId: authStore.profile?.id || '',
    requestNumber,
    status,
    proposedNames: requestForm.proposedNames,
    businessType: requestForm.businessType,
    address: requestForm.address,
    email: requestForm.email,
    phone: requestForm.phone,
    documents: [] as Document[],
  }

  return await useCreateRequest(request, documentFiles.value)
}

function submitRequest() {
  const payload = buildBusinessRequest()

  submissionMessage.value = 'Request form is ready. Connect your submission function here.'
  console.log('Business request payload:', payload)
}
</script>

<template>
  <navbar />

  <main class="min-h-screen bg-[#f6f2eb] pl-20 text-stone-950">
    <div class="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
      <header class="mb-8 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-stone-300/40">
        <div class="grid gap-6 bg-[#183d36] px-6 py-8 text-white lg:grid-cols-[1fr_0.45fr] lg:items-end lg:px-8">
          <div>
            <p class="text-sm font-bold uppercase text-amber-200">Business registration request</p>
            <h1 class="mt-2 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
              Tell us what you want to register.
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/75">
              Submit your proposed names, contact details, business type, and supporting documents so the team can review your registration request.
            </p>
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div class="flex items-center gap-3">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950">
                <icon-lucide-file-check-2 class="h-6 w-6" />
              </span>
              <div>
                <p class="text-sm font-bold text-white">Request status</p>
                <p class="text-sm text-emerald-50/70">Draft until submitted</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <form class="grid gap-6 lg:grid-cols-[1fr_0.42fr]" @submit.prevent="submitRequest">
        <div class="space-y-6">
          <SectionCard>

            <SectionHeader
              :icon="ListPlus"
              kicker="Step 1"
              title="Proposed business names"
            />

            <div class="grid gap-5">

              <TextField 
                label="First choice"
                v-model="requestForm.proposedNames[0]"
                type="text"
                required
                placeholder="Example: ABC Consulting"
              />

              <div class="grid gap-5 sm:grid-cols-2">
                
                <TextField 
                  label="Second choice"
                  v-model="requestForm.proposedNames[1]"
                  type="text"
                  placeholder="Optional backup name"
                />

                <TextField 
                  label="Third choice"
                  v-model="requestForm.proposedNames[2]"
                  type="text"
                  placeholder="Optional backup name"
                />

              </div>
            </div>
          </SectionCard>

          <SectionCard>

            <SectionHeader
              :icon="Building2"
              kicker="Step 2"
              title="Business details"
            />

            <div class="grid gap-4 sm:grid-cols-2">
              <label
                v-for="option in businessTypeOptions"
                :key="option.value"
                class="cursor-pointer rounded-[1.5rem] border p-4 transition"
                :class="requestForm.businessType === option.value ? 'border-emerald-700 bg-emerald-50 ring-4 ring-emerald-100' : 'border-stone-200 bg-stone-50 hover:border-emerald-200'"
              >
                <input v-model="requestForm.businessType" type="radio" class="sr-only" :value="option.value" />
                <span class="flex items-start justify-between gap-3">
                  <span>
                    <span class="block font-bold text-stone-950">{{ option.label }}</span>
                    <span class="mt-1 block text-sm leading-5 text-stone-500">{{ option.description }}</span>
                  </span>
                  <icon-lucide-check-circle-2
                    class="h-5 w-5 shrink-0"
                    :class="requestForm.businessType === option.value ? 'text-emerald-800' : 'text-stone-300'"
                  />
                </span>
              </label>
            </div>

          </SectionCard>

          <SectionCard>

            <SectionHeader
              :icon="BadgeQuestionMark"
              kicker="Step 3"
              title="Business contact details (optional)"
            />

            <div class="grid gap-5 sm:grid-cols-2">

              <TextareaField
              class="col-span-2"
              label="Business address"
              v-model="requestForm.address"
              placeholder="Street address, suburb, city"
              rows="4"
            />

              <TextField
                label="Business email"
                v-model="requestForm.email"
                type="email"
              />

              <TextField
                label="Business phone number"
                v-model="requestForm.phone"
                type="tel"
              />
            </div>
          </SectionCard>

          <SectionCard>

            <SectionHeader
              :icon="Paperclip"
              kicker="Step 4"
              title="Upload supporting documents"
            />

            <label class="block rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-6 text-center transition hover:border-emerald-300 hover:bg-emerald-50/50">
              <input type="file" multiple class="sr-only" accept=".pdf,.png,.jpg,.jpeg" @change="handleDocumentUpload" />
              <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-900 shadow-sm">
                <icon-lucide-upload-cloud class="h-7 w-7" />
              </span>
              <span class="mt-4 block text-sm font-bold text-stone-950">Upload supporting documents</span>
              <span class="mt-1 block text-sm text-stone-500">PDF, PNG, or JPG files. You can select more than one.</span>
            </label>

            <ul v-if="documentNames.length" class="mt-4 grid gap-2">
              <li
                v-for="documentName in documentNames"
                :key="documentName"
                class="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700"
              >
                <icon-lucide-file-text class="h-4 w-4 text-emerald-800" />
                <span class="truncate">{{ documentName }}</span>
              </li>
            </ul>
          </SectionCard>
        </div>

        <aside class="space-y-6">
          <SectionCard class="sticky top-6">
            <p class="text-sm font-bold uppercase text-emerald-800">Review</p>
            <h2 class="mt-1 text-2xl font-bold text-stone-950">Request summary</h2>

            <div class="mt-5 space-y-4">
              <div class="rounded-2xl bg-stone-50 p-4">
                <p class="text-xs font-bold uppercase text-stone-500">Business type</p>
                <p class="mt-1 font-bold text-stone-950">{{ selectedBusinessType?.label }}</p>
              </div>

              <div class="rounded-2xl bg-stone-50 p-4">
                <p class="text-xs font-bold uppercase text-stone-500">Primary name</p>
                <p class="mt-1 font-bold text-stone-950">{{ requestForm.proposedNames[0] || 'Not entered yet' }}</p>
              </div>

              <div class="rounded-2xl bg-stone-50 p-4">
                <p class="text-xs font-bold uppercase text-stone-500">Documents attached</p>
                <p class="mt-1 font-bold text-stone-950">{{ documentNames.length }}</p>
              </div>
            </div>

            <div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p class="text-sm font-bold text-stone-950">Likely required</p>
              <ul class="mt-3 space-y-2">
                <li v-for="document in requiredDocuments" :key="document" class="flex items-center gap-2 text-sm text-stone-600">
                  <icon-lucide-check class="h-4 w-4 text-emerald-800" />
                  {{ document }}
                </li>
              </ul>
            </div>

            <p v-if="submissionMessage" class="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
              {{ submissionMessage }}
            </p>


            <PrimaryBtn type="submit" class="mt-5">
              Submit request
              <icon-lucide-arrow-right class="h-4 w-4" />
            </PrimaryBtn>

          </SectionCard>
        </aside>
      </form>
    </div>
  </main>
</template>