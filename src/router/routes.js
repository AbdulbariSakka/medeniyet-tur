const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue') },
      { path: '/payment', component: () => import('src/pages/Payment.vue') },
      { path: '/new', component: () => import('src/pages/NewTur.vue') },
      { path: '/edit', component: () => import('src/pages/Edit.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
