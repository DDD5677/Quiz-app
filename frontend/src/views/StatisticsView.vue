<template>
	<section class="library">
		<div class="container">
			<div class="wrapper bg-white dark:bg-slate-800">
				<h1 class="title dark:text-stone-100">Quiz statistics</h1>
				<div v-if="!quizStore.isLoading">
					<div v-if="quizStore.quizList.length === 0" class="empty dark:text-stone-100">
						There are no quiz statistics yet
					</div>
					<div class="cards">
						<div v-for="quiz in quizStore.quizList" :key="quiz.id"
							class="quiz bg-stone-100 dark:bg-slate-700 text-slate-950 dark:text-stone-100">
							<span class="quiz_title">{{ quiz.title }}</span>
							<light-button @click="StatisticsDetail(quiz.id)">Statistics</light-button>
						</div>
					</div>
				</div>
				<Loader v-else />
				<div class="footer">
					<p class="dark:text-stone-200">Subscribe to our bot if you want to automatically receive statistical
						information through the Telegram
						bot</p>
					<light-button @click.prevent="subscribeBot">Subscribe <i class="fa-solid fa-robot"></i></light-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quizStore'
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const quizStore = useQuizStore()

const router = useRouter()
const route = useRoute();
const StatisticsDetail = (id: string) => {
	router.push(`/admin/statistics/${id}`)
}
const subscribeBot = () => {
	let botUrl = `https://t.me/easyquiz1_bot?start=${route.query.user}`;
	window.open(botUrl);
}
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

		.cards {
			display: grid;
			gap: 20px;
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}

		.quiz {
			padding: 20px;
			border-radius: 15px;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.quiz_title {
				font-weight: 500;
				font-size: 18px;
			}

			.light-btn {
				margin-top: 15px;
			}
		}
	}

	.footer {
		margin-top: 30px;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px;

	}
}

@media(max-width:980px) {
	.library {
		.wrapper {
			.cards {
				grid-template-columns: 1fr 1fr 1fr;
			}
		}
	}
}

@media(max-width:780px) {
	.library {
		.wrapper {
			.cards {
				grid-template-columns: 1fr 1fr;
			}

			.quiz {
				.quiz_title {
					font-size: 16px;
				}
			}
		}
	}
}

@media(max-width:480px) {
	.library {
		.wrapper {
			padding: 15px;

			.cards {
				grid-template-columns: 1fr;
			}
		}
	}
}
</style>