<script setup lang="ts">
  defineOptions({
      inheritAttrs: false,
  })

  defineProps<{
      loading?: boolean
  }>()
</script>

<template>

    <button
        v-bind="$attrs"
        :disabled="loading"
        class="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-emerald-900
            px-5
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-emerald-900/15
            transition
            hover:bg-emerald-800
            disabled:cursor-not-allowed
            disabled:opacity-60
        "
    >

        <icon-lucide-loader-circle
            v-if="loading"
            class="h-4 w-4 animate-spin"
        />

        <slot />

    </button>

</template>
