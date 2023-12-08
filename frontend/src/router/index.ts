import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import CreateQuizView from "@/views/CreateQuizView.vue"
import AdminView from "@/views/AdminView.vue"
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
      path: '/admin',
      name: 'admin',
		meta: { layout: "dashboard" },
      component: AdminView
    },
	 {
      path: '/createquiz',
      name: 'create-quiz',
		meta: { layout: "createQuiz" },
      component: CreateQuizView
    },
  ]
})

export default router
