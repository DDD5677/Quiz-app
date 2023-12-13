import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import CreateQuestionView from "@/views/CreateQuestionView.vue"
import CreateQuizView from "@/views/CreateQuizView.vue"
import SignInView from '@/views/SignInView.vue'
import AdminView from "@/views/AdminView.vue"
import SignUpView from '@/views/SignUpView.vue'
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
			path: '/login',
			name: 'login',
			meta: { layout: "SignIn" },
			component: SignInView
		},
		{
			path: '/register',
			name: 'register',
			meta: { layout: "SignIn" },
			component: SignUpView
		},
		{
			path: '/createquestion/:id',
			name: 'create-question',
			meta: { layout: "empty" },
			component: CreateQuestionView
		},
		{
			path: '/createquiz',
			name: 'create-quiz',
			meta: { layout: "dashboard" },
			component: CreateQuizView
		},
	]
})

export default router
