import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import CreateQuizView from "@/views/CreateQuizView.vue"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
		meta: { layout: "main" },
      component: HomeView
    },
	 {
      path: '/createquiz',
      name: 'create-quiz',
		meta: { layout: "main" },
      component: CreateQuizView
    },
  ]
})

export default router
