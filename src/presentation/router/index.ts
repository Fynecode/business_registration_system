import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/presentation/stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/Dashboard.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: '/client',
      name: 'client',
      component: () => import('../views/clients/Dashboard.vue'),
      meta: { requiresAuth: true, roles: ['client'] },
    },
    {
      path: '/client/profile',
      name: 'client-profile',
      component: () => import('../views/clients/Profile.vue'),
      meta: { requiresAuth: true, roles: ['client'] },
    },
    {
      path: '/client/register',
      name: 'client-register',
      component: () => import('../views/clients/RegisterBusiness.vue'),
      meta: { requiresAuth: true, roles: ['client'] },
    },
    {
      path: '/client/registration-request/:id',
      name: 'client-registration-request',
      component: () => import('../views/clients/RegistrationRequestDetails.vue'),
      meta: { requiresAuth: true, roles: ['client'] },
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.profile;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login';
  }

  if(to.meta.roles ) {
    const allowedRoles = to.meta.roles as string[];

    if (!authStore.profile || !allowedRoles.includes(authStore.profile.role)) {
      return '/login';
    }
  }
});

export default router
