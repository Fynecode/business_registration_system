<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import navbar from '@/components/navbar.vue'
import { useAuthStore } from '@/presentation/stores/auth.store'
import { useUpdateProfile } from '@/presentation/composables/profile/useUpdateProfile'

const authStore = useAuthStore()
const router = useRouter()

const showUpdateModal = ref(false)
const showDeleteModal = ref(false)
const deletePassword = ref('')
const deleteError = ref('')

const updateForm = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

const profile = computed(() => authStore.profile)
const displayName = computed(() => {
  const fullName = [profile.value?.first_name, profile.value?.last_name].filter(Boolean).join(' ')
  return fullName || 'Client profile'
})
const initials = computed(() => {
  const first = profile.value?.first_name?.charAt(0) || 'C'
  const last = profile.value?.last_name?.charAt(0) || ''
  return `${first}${last}`.toUpperCase()
})

const profileDetails = computed(() => [
  { label: 'First name', value: profile.value?.first_name || 'Not provided', icon: 'user' },
  { label: 'Last name', value: profile.value?.last_name || 'Not provided', icon: 'user' },
  { label: 'Email address', value: profile.value?.email || 'Not provided', icon: 'mail' },
  { label: 'Phone number', value: profile.value?.phone || 'Not provided', icon: 'phone' },
])

function openUpdateModal() {
  updateForm.first_name = profile.value?.first_name || ''
  updateForm.last_name = profile.value?.last_name || ''
  updateForm.email = profile.value?.email || ''
  updateForm.phone = profile.value?.phone || ''
  showUpdateModal.value = true
}

function closeUpdateModal() {
  showUpdateModal.value = false
}

async function saveProfile() {
  if (!profile.value) {
    return
  }

  const updatedProfile = await useUpdateProfile({
    first_name: updateForm.first_name.trim(),
    last_name: updateForm.last_name.trim(),
    email: updateForm.email.trim(),
    phone: updateForm.phone.trim(),
  })

  authStore.setProfile(updatedProfile)
  showUpdateModal.value = false
}

function openDeleteModal() {
  deletePassword.value = ''
  deleteError.value = ''
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletePassword.value = ''
  deleteError.value = ''
}

function deleteProfile() {
  if (!deletePassword.value.trim()) {
    deleteError.value = 'Enter your password to delete this profile.'
    return
  }

  if (profile.value?.password && deletePassword.value !== profile.value.password) {
    deleteError.value = 'The password you entered does not match this profile.'
    return
  }

  authStore.clearProfile()
  showDeleteModal.value = false
  router.push('/login')
}
</script>

<template>
  <navbar />

  <main class="min-h-screen bg-[#f6f2eb] pl-20 text-stone-950">
    <div class="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 lg:px-10">
      <section class="mb-8 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-stone-300/40">
        <div class="bg-[#183d36] px-6 py-8 text-white sm:px-8">
          <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-5">
              <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] bg-amber-300 text-2xl font-bold text-emerald-950 shadow-lg shadow-black/10">
                {{ initials }}
              </div>
              <div>
                <p class="text-sm font-bold uppercase text-amber-200">Client profile</p>
                <h1 class="mt-2 text-3xl font-bold sm:text-4xl">{{ displayName }}</h1>
                <p class="mt-2 text-sm leading-6 text-emerald-50/75">{{ profile?.email || 'No email address saved' }}</p>
              </div>
            </div>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-emerald-950 shadow-lg shadow-black/10 transition hover:bg-amber-100"
              @click="openUpdateModal"
            >
              <icon-lucide-pencil class="h-4 w-4" />
              Update profile
            </button>
          </div>
        </div>

        <div class="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <article
            v-for="detail in profileDetails"
            :key="detail.label"
            class="rounded-[1.5rem] border border-stone-100 bg-stone-50 p-5"
          >
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-900 shadow-sm">
              <icon-lucide-user-round v-if="detail.icon === 'user'" class="h-5 w-5" />
              <icon-lucide-mail v-else-if="detail.icon === 'mail'" class="h-5 w-5" />
              <icon-lucide-phone v-else="detail.icon === 'phone'" class="h-5 w-5" />
            </div>
            <p class="text-sm font-semibold text-stone-500">{{ detail.label }}</p>
            <p class="mt-2 break-words text-lg font-bold text-stone-950">{{ detail.value }}</p>
          </article>
        </div>
      </section>

      <section class="rounded-[2rem] border border-red-100 bg-white p-6 shadow-xl shadow-stone-300/40">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700">
              <icon-lucide-trash-2 class="h-5 w-5" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-stone-950">Delete profile</h2>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-stone-500">
                This clears the saved client profile from the app and returns you to the login page.
              </p>
            </div>
          </div>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/15 transition hover:bg-red-700"
            @click="openDeleteModal"
          >
            <icon-lucide-trash-2 class="h-4 w-4" />
            Delete profile
          </button>
        </div>
      </section>
    </div>

    <div v-if="showUpdateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4 py-6">
      <form class="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-stone-950/20" @submit.prevent="saveProfile">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-bold uppercase text-emerald-800">Profile details</p>
            <h2 class="mt-1 text-2xl font-bold text-stone-950">Update profile</h2>
          </div>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
            aria-label="Close update profile modal"
            @click="closeUpdateModal"
          >
            <icon-lucide-x class="h-5 w-5" />
          </button>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="first-name" class="text-sm font-semibold text-stone-700">First name</label>
            <input
              id="first-name"
              v-model="updateForm.first_name"
              type="text"
              autocomplete="given-name"
              required
              class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label for="last-name" class="text-sm font-semibold text-stone-700">Last name</label>
            <input
              id="last-name"
              v-model="updateForm.last_name"
              type="text"
              autocomplete="family-name"
              required
              class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label for="email" class="text-sm font-semibold text-stone-700">Email address</label>
            <input
              id="email"
              v-model="updateForm.email"
              type="email"
              autocomplete="email"
              required
              class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label for="phone" class="text-sm font-semibold text-stone-700">Phone number</label>
            <input
              id="phone"
              v-model="updateForm.phone"
              type="tel"
              autocomplete="tel"
              required
              class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </div>

        <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="rounded-2xl border border-stone-200 px-5 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-50"
            @click="closeUpdateModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800"
          >
            <icon-lucide-save class="h-4 w-4" />
            Save changes
          </button>
        </div>
      </form>
    </div>

    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4 py-6">
      <form class="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl shadow-stone-950/20" @submit.prevent="deleteProfile">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-bold uppercase text-red-700">Confirm deletion</p>
            <h2 class="mt-1 text-2xl font-bold text-stone-950">Delete this profile?</h2>
            <p class="mt-2 text-sm leading-6 text-stone-500">
              Enter your password to confirm. This will clear your saved profile and sign you out.
            </p>
          </div>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition hover:bg-stone-200"
            aria-label="Close delete profile modal"
            @click="closeDeleteModal"
          >
            <icon-lucide-x class="h-5 w-5" />
          </button>
        </div>

        <label for="delete-password" class="text-sm font-semibold text-stone-700">Password</label>
        <input
          id="delete-password"
          v-model="deletePassword"
          type="password"
          autocomplete="current-password"
          class="mt-2 block w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
          placeholder="Enter your password"
        />

        <p v-if="deleteError" class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {{ deleteError }}
        </p>

        <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="rounded-2xl border border-stone-200 px-5 py-3 text-sm font-bold text-stone-700 transition hover:bg-stone-50"
            @click="closeDeleteModal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/15 transition hover:bg-red-700"
          >
            <icon-lucide-trash-2 class="h-4 w-4" />
            Delete profile
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
