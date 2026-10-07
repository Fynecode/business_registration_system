<script setup lang="ts">
    import type { Component } from 'vue'

    defineProps<{
        icon?: Component
        title: string
        description: string
    }>()
</script>

<template>
    <div
        class="
            rounded-[1.5rem]
            border
            border-dashed
            border-stone-300
            bg-stone-50
            px-5
            py-10
            text-center
        "
    >
        <div
            v-if="icon"
            class="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-emerald-50
                text-emerald-900
            "
        >
            <component
                :is="icon"
                class="h-7 w-7"
            />
        </div>

        <h2
            class="mt-4 text-lg font-bold text-stone-950"
        >
            {{ title }}
        </h2>

        <p
            class="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-stone-500
            "
        >
            {{ description }}
        </p>

        <div
            v-if="$slots.actions"
            class="mt-6 flex justify-center"
        >
            <slot name="actions" />
        </div>
    </div>
</template>