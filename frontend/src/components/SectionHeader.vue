<script setup lang="ts">
    import type { Component } from 'vue'

    defineProps<{
        icon?: Component
        kicker?: string
        title: string
        description?: string
    }>()
</script>

<template>
    <div class="mb-5 flex items-center gap-3">

        <span
            v-if="icon"
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900"
        >
            <component
                :is="icon"
                class="h-5 w-5"
            />
        </span>

        <div>

            <p
                v-if="kicker"
                class="text-sm font-bold uppercase text-emerald-800"
            >
                {{ kicker }}
            </p>

            <h2 class="text-2xl font-bold text-stone-950">
                {{ title }}
            </h2>

            <p
                v-if="description"
                class="mt-1 text-sm leading-6 text-stone-500"
            >
                {{ description }}
            </p>

        </div>

        <slot name="actions" />
    </div>
</template>