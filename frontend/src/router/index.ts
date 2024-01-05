import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import CreateQuestionView from "@/views/CreateQuestionView.vue"
import CreateQuizView from "@/views/CreateQuizView.vue"
import SignInView from '@/views/SignInView.vue'
import AdminView from "@/views/AdminView.vue"
import SignUpView from '@/views/SignUpView.vue'
import QuizDetailView from '@/views/QuizDetailView.vue'
import LibraryView from '@/views/LibraryView.vue'
import QuizesView from '@/views/QuizesView.vue'
import QuizPlayView from '@/views/QuizPlayView.vue'
import StartQuizView from '@/views/StartQuizView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ErrorView from '@/views/ErrorView.vue'
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
			path: '/admin/createquestion/:id',
			name: 'create-question',
			meta: { layout: "empty" },
			component: CreateQuestionView
		},
		{
			path: '/admin/createquiz',
			name: 'create-quiz',
			meta: { layout: "dashboard" },
			component: CreateQuizView
		},
		{
			path: '/admin/quiz/:id',
			name: 'quiz-detail',
			meta: { layout: "dashboard" },
			component: QuizDetailView
		},
		{
			path: '/admin/library',
			name: 'library',
			meta: { layout: "dashboard" },
			component: LibraryView
		},
		{
			path: '/admin/settings',
			name: 'settings',
			meta: { layout: "dashboard" },
			component: SettingsView
		},
		{
			path: '/quizes',
			name: 'quizes',
			meta: { layout: "SignIn" },
			component: QuizesView
		},
		{
			path: '/quiz/:id',
			name: 'quiz-start',
			meta: { layout: "SignIn" },
			component: StartQuizView
		},
		{
			path: '/quiz/start/:id',
			name: 'quiz',
			meta: { layout: "empty" },
			component: QuizPlayView
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			meta: { layout: "SignIn" },
			component: ErrorView,
		},
	]
})

export default router
