<template>
	<section class="start_quiz">
		<InfoActiveAction v-if="actionStore.activeAction" />
		<div class="container">
			<div class="wrapper">
				<div class="quiz_info">
					<h2 class="title">Matematika</h2>
					<div v-if="!quizStore.isLoading" class="info">
						<div class="num_questions">
							<span>Savollar soni</span>
							<span>{{ quizStore.quiz.questions.length }}</span>
						</div>
						<div v-if="quizStore.quiz.mixedScore" class="point">
							<span>Har bir savol uchun</span>
							<span class="text-right">qiyinlik darajasiga qarab ball beriladi</span>
						</div>
						<div v-else class="point">
							<span>Har bir savol uchun</span>
							<span>{{ quizStore.quiz.point }} ball</span>
						</div>
						<div class="time">
							<span>Ajratilgan vaqt</span>
							<span>{{ quizStore.quiz.time }} minut</span>
						</div>
					</div>
					<loader v-if="quizStore.isLoading" />
				</div>
				<form @submit.prevent="startQuizHandler" action="">
					<main-input type="text" placeholder="Firstname" v-model="firstname" />
					<main-input type="text" placeholder="Lastname" v-model="lastname" />
					<dark-button>Start</dark-button>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useQuizStore } from '@/stores/quizStore';
import { useActionStore } from '@/stores/actionStore'
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InfoActiveAction from '@/components/InfoActiveAction.vue';
const quizStore = useQuizStore()
const authStore = useAuthStore()
const actionStore = useActionStore()
const router = useRouter()
const route = useRoute()
const firstname = ref('')
const lastname = ref('')

const quizId = route.params.id as string
quizStore.getQuizById(quizId)

const startQuizHandler = () => {
	const data = {
		firstname: firstname.value,
		lastname: lastname.value,
		quizId: quizId,
		user: authStore.user.id
	}
	actionStore.createAction(data).then((res: any) => {
		console.log(res)
		actionStore.getActiveAction(authStore.user.id).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
		router.push({ path: `/quiz/start/${res.id}` })
	})
}
</script>

<style lang="scss" scoped>
.start_quiz {

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrapper {
		width: 600px;
		background-color: #fff;
		padding: 40px;
		border-radius: 10px;

		.quiz_info {
			.title {
				text-align: center;
				font-size: 25px;
				font-weight: 500;
				margin-bottom: 20px;
			}

			.info {
				div {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 18px;
					margin-bottom: 10px;
				}
			}
		}

		form {
			margin-top: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.main-input {
				width: 100%;
				margin-bottom: 20px;
			}

			.dark-btn {
				width: 40%;
				font-size: 18px;
			}
		}
	}
}

@media(max-width:480px) {
	.start_quiz {
		.wrapper {
			padding: 15px 20px;

			.quiz_info {
				.info {
					div {
						font-size: 16px;
						line-height: 1.3;
					}
				}
			}
		}
	}
}
</style>