<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, type Component } from 'vue'

export interface HeroSlide {
    icon?: Component
    kicker?: string
    title: string
    body?: string
    metric?: string | number
    metricLabel?: string
}

const props = defineProps<{
    slides: HeroSlide[]
}>()

const activeSlide = ref(0)

const currentSlide = computed(() => {
    return props.slides[activeSlide.value]
})

function next() {
    activeSlide.value =
        activeSlide.value >= props.slides.length - 1
            ? 0
            : activeSlide.value + 1
}

function previous() {
    activeSlide.value =
        activeSlide.value <= 0
            ? props.slides.length - 1
            : activeSlide.value - 1
}

function goTo(index: number) {
    activeSlide.value = index
}

onMounted(() =>{
    const interval = window.setInterval(() => {
        next()
    }, 6500)

    onBeforeUnmount(() => {
        window.clearInterval(interval)
    })
})
</script>

<template> 
    <div class="hero-card flex flex-col justify-between">

        <div class="flex justify-between items-start gap-16">

            <div class="flex gap-4">

                <div class="icon-box-accent flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <component
                        v-if="currentSlide.icon"
                        :is="currentSlide.icon"
                        class=""
                    />
                </div>

                <div>

                    <p
                        v-if="currentSlide.kicker"
                        class="text-sm font-bold uppercase text-amber-200"
                    >
                        {{ currentSlide.kicker }}
                    </p>

                    <h2 class="mt-2 text-3xl font-bold">
                        {{ currentSlide.title }}
                    </h2>

                    <p
                        v-if="currentSlide.body"
                        class="mt-3 text-sm leading-6 text-emerald-50/80"
                    >
                        {{ currentSlide.body }}
                    </p>

                </div>

            </div>

            <div
                v-if="slides.length > 1"
                class="flex gap-2"
            >

                <button @click="previous" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20">
                    <icon-lucide-chevron-left />
                </button>

                <button @click="next" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20">
                    <icon-lucide-chevron-right />
                </button>

            </div>

        </div>

        <div class="mt-8 flex justify-between">

            <div>
                <p class="text-5xl font-bold text-amber-200">
                    {{ currentSlide.metric }}
                </p>

                <p class="mt-2 text-sm">
                    {{ currentSlide.metricLabel }}
                </p>
            </div>

            <div class="flex items-end gap-2" v-if="slides.length > 1">
              <button
                v-for="(_, index) in slides"
                :key="index"
                type="button"
                class="h-2.5 rounded-full transition-all"
                :class="index === activeSlide ? 'w-9 bg-amber-200' : 'w-2.5 bg-white/35 hover:bg-white/60'"
                :aria-label="`Show promotion ${index + 1}`"
                @click="goTo(index)"
              />
            </div>

        </div>

        <slot
            name="actions"
            :slide="currentSlide"
        />

    </div>
</template>