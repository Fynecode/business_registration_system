<script setup lang="ts">
import { computed, ref } from 'vue'

export interface Notification {
    id: string | number
    title: string
    message: string
}

const props = defineProps<{
    notifications: Notification[]
}>()

const emit = defineEmits<{
    (e: 'select', notification: Notification): void
}>()

const isOpen = ref(false)

const count = computed(() => props.notifications.length)

function toggle() {
    isOpen.value = !isOpen.value
}

function select(notification: Notification) {
    emit('select', notification)
    isOpen.value = false
}
</script>

<template>
    <div class="relative">

        <button
            type="button"
            class="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-emerald-950 transition hover:border-emerald-200 hover:bg-emerald-50"
            @mouseenter="isOpen = true"
            @mouseleave="isOpen = false"
            @click="toggle"
        >
            <icon-lucide-bell class="h-5 w-5" />

            <span
                v-if="count > 0"
                class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-300 px-1 text-[11px] font-bold text-emerald-950"
            >
                {{ count }}
            </span>
        </button>

        <Transition
            enter-active-class="transition duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="isOpen"
                class="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-stone-100 bg-white p-3 shadow-2xl shadow-stone-300/60"
            >
                <div class="mb-3 flex items-center justify-between">

                    <p class="text-sm font-bold">
                        Notifications
                    </p>

                    <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                        {{ count }} new
                    </span>

                </div>

                <div
                    v-if="!notifications.length"
                    class="py-6 text-center text-sm text-stone-500"
                >
                    No notifications.
                </div>

                <ul
                    v-else
                    class="space-y-2"
                >
                    <li
                        v-for="notification in notifications"
                        :key="notification.id"
                    >
                        <button
                            class="w-full rounded-xl bg-stone-50 p-3 text-left transition hover:bg-emerald-50"
                            @click="select(notification)"
                        >
                            <p class="font-semibold text-stone-950">
                                {{ notification.title }}
                            </p>

                            <p class="mt-1 text-xs leading-5 text-stone-500">
                                {{ notification.message }}
                            </p>
                        </button>
                    </li>
                </ul>

            </div>
        </Transition>

    </div>
</template>