<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TextField from '@/components/TextField.vue'
import PrimaryBtn from '@/components/PrimaryBtn.vue'
import { useRequestPasswordReset } from '@/presentation/composables/profile/useRequestPasswordReset'

const isLoading = ref(false)
const form = reactive({ email: '' })
const successMsg = ref('')
const errorMsg = ref('')

function validateEmail(email: string) {
	return /\S+@\S+\.\S+/.test(email)
}

async function handleSubmit() {
	errorMsg.value = ''
	successMsg.value = ''
	if (!validateEmail(form.email)) {
		errorMsg.value = 'Please enter a valid email address.'
		return
	}

	isLoading.value = true
	try {
		await useRequestPasswordReset(form.email)
		successMsg.value = 'If that email exists, you will receive reset instructions.'
	} catch (err: any) {
		errorMsg.value = err?.message || 'Unable to request password reset.'
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<main class="min-h-screen bg-[#f6f2eb] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
		<section class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-stone-300/60">
			<div class="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
				<div class="mb-8 flex items-center gap-3">
					<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow-lg shadow-emerald-900/20">
						<icon-lucide-landmark class="h-5 w-5" />
					</div>
					<div>
						<p class="text-sm font-semibold uppercase text-emerald-800">Business</p>
						<p class="text-xs font-medium text-stone-500">Registration system</p>
					</div>
				</div>

				<div class="mb-6">
					<h1 class="text-3xl font-bold text-stone-950">Reset password</h1>
					<p class="mt-3 text-sm leading-6 text-stone-600">Enter your account email and we'll send instructions to reset your password.</p>
				</div>

				<form class="space-y-5" @submit.prevent="handleSubmit">
					<TextField
						label="Email address"
						v-model="form.email"
						type="email"
						autocomplete="email"
						placeholder="example@gmail.com"
						required
					/>

					<p v-if="errorMsg" class="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">{{ errorMsg }}</p>
					<p v-if="successMsg" class="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{{ successMsg }}</p>

					<PrimaryBtn :loading="isLoading" type="submit" class="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold">
						Send reset email
						<icon-lucide-arrow-right class="h-4 w-4" />
					</PrimaryBtn>
				</form>
			</div>
		</section>
	</main>
</template>

