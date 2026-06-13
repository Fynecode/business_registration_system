<script setup lang="ts">
    defineOptions({
        inheritAttrs: false,
    })
</script>

<template>
    <section
        v-bind="$attrs"
        class="rounded-[2rem] bg-white p-5 shadow-xl shadow-stone-300/40 sm:p-6"
    >
        <slot />
    </section>
</template>