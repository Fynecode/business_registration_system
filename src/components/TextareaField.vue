<script setup lang="ts">
  defineOptions({
      inheritAttrs: false,
  })

  defineProps<{
      label?: string
      error?: string
  }>()

  const model = defineModel<string>()
</script>

<template>

    <div>

        <label
            v-if="label"
            class="text-sm font-semibold text-stone-700"
        >
            {{ label }}
        </label>

        <textarea
            v-bind="$attrs"
            v-model="model"
            class="
                mt-2
                block
                w-full
                resize-none
                rounded-2xl
                border
                border-stone-200
                bg-stone-50
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-emerald-700
                focus:bg-white
                focus:ring-4
                focus:ring-emerald-100
            "
        />

        <p
            v-if="error"
            class="mt-2 text-sm font-medium text-red-600"
        >
            {{ error }}
        </p>

    </div>

</template>