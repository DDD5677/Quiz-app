<template>
	<section class="library">
		<div class="container">
			<div class="wrapper bg-white dark:bg-slate-800">
				<h1 class="title dark:text-stone-100">Library</h1>
				<div v-if="!quizStore.isLoading">
					<div v-if="quizStore.quizList.length === 0" class="empty dark:text-stone-100">
						There are no quizzes yet
					</div>
					<div class="cards">
						<QuizCards v-for="quiz in quizStore.quizList" :key="quiz.id" :quiz="quiz" />
					</div>
				</div>
				<Loader v-else />
			</div>
		</div>

	</section>
</template>

<script setup lang="ts">
import QuizCards from '@/components/QuizCards.vue';
import { useQuizStore } from '@/stores/quizStore'
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const quizStore = useQuizStore()
const authStore = useAuthStore()

const router = useRouter()
const route = useRoute();

onMounted(() => {
	quizStore.getQuiz({ page: 1, limit: 10, user: route.query.user })
})


</script>

<style lang="scss" scoped>
.library {

	.title {
		font-size: 25px;
		margin-bottom: 10px;
		font-weight: 500;
	}

	.wrapper {
		margin-top: 20px;
		border-radius: 10px;
		padding: 20px;

		.empty {
			font-size: 18px;
		}


		.cards {
			display: grid;
			gap: 20px;
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
}

@media(max-width:680px) {
	.library {
		.wrapper {
			.cards {
				grid-template-columns: 1fr 1fr;
			}
		}
	}
}

@media(max-width:480px) {
	.library {
		.wrapper {
			.cards {
				grid-template-columns: 1fr;
			}
		}
	}
}
</style>