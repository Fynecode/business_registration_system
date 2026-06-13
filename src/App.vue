<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthBootstrap } from '@/presentation/composables/supabase/useAuthBootstrap';

useAuthBootstrap();
</script>

<template>
  <RouterView />
</template>