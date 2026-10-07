import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/presentation/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: { requiresAuth: true},
    },
    {
      path: '/client',
      name: 'client',
      component: () => import('../views/clients/Dashboard.vue'),
      meta: { requiresAuth: true},
    },
    {
      path: '/client/profile',
      name: 'client-profile',
      component: () => import('../views/clients/Profile.vue'),
      meta: { requiresAuth: true},
    },
    {
      path: '/client/register',
      name: 'client-register',
      component: () => import('../views/clients/RegisterBusiness.vue'),
      meta: { requiresAuth: true},
    },
    {
      path: '/client/registration-request/:id',
      name: 'client-registration-request',
      component: () => import('../views/RegistrationRequestDetails.vue'),
      meta: { requiresAuth: true},
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ResetPassword.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/ForgotPassword.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.profile;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/';
  }
});

export default router
