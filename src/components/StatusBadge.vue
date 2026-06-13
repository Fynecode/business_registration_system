<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    status: string
}>()

const badgeClass = computed(() => {
    switch (props.status.toLowerCase()) {
        case 'approved':
        case 'registered':
        case 'completed':
        case 'success':
            return 'bg-emerald-100 text-emerald-800'

        case 'pending':
        case 'review':
        case 'in progress':
            return 'bg-amber-100 text-amber-800'

        case 'rejected':
        case 'declined':
        case 'failed':
            return 'bg-red-100 text-red-700'

        case 'draft':
            return 'bg-stone-100 text-stone-700'

        default:
            return 'bg-blue-100 text-blue-700'
    }
})

const displayText = computed(() => {
    return props.status
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
})
</script>

<template>
    <span
        class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
        :class="badgeClass"
    >
        <slot>
            {{ displayText }}
        </slot>
    </span>
</template>