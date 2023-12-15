<template>
	<section class="quiz_detail">
		<div class="container">
			<div class="btns">
				<dark-button @click.prevent="addQuestionHandler"><i class="fa-solid fa-plus"></i> <span>Add
						Question</span></dark-button>
				<dark-button @click.prevent="addQuestionHandler"><i class="fa-regular fa-share-from-square"></i>
					<span>Share</span></dark-button>
			</div>
			<div v-if="!quizStore.isLoading" class="wrapper">
				<h1 class="title">Quiz Detail</h1>
				<form action="" @submit.prevent="updateQuizHandler">
					<div class="input">
						<span class="subtitle">Title of Quiz</span>
						<main-input required type="text" placeholder="Title" v-model="quiz.title" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Time for Quiz (in minutes)</span>
						<main-input required type="number" placeholder="Time" v-model="quiz.time" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Grade (in points)</span>
						<main-input required type="number" placeholder="Grade" step=".1" v-model="quiz.point" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Category of Quiz</span>
						<select required name="" id="" class="main-select" v-model="quiz.category">
							<option value="" selected disabled hidden>Which category?</option>
							<option value="Math">Math</option>
							<option value="History">History</option>
							<option value="English">English</option>
							<option value="Physics">Physics</option>
						</select>
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Type of Quiz</span>
						<select required name="" id="" class="main-select" v-model="quiz.quizType">
							<option value="" selected disabled hidden>Which type?</option>
							<option value="Test">Test</option>
							<option value="true-false">True False</option>
						</select>
						<span class="error"></span>
					</div>
					<dark-button>Update</dark-button>
				</form>
				<h2 class="title">Questions</h2>
				<div class="questions">
					<QuestionDetail v-if="quizStore.quiz.questions.length !== 0"
						v-for="(question, index) in quizStore.quiz.questions" :key="index" :question="question"
						:index="index + 1" />
					<div v-else class="empty">No questions</div>
				</div>
			</div>
			<Loader v-else />
		</div>
	</section>
</template>

<script setup lang="ts">
import QuestionDetail from '@/components/QuestionDetail.vue';
import { useQuizStore } from '@/stores/quizStore';
import type { Quiz } from '@/types/quizType';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()
const quizId = route.params.id as string
const quiz = reactive<Quiz>({
	title: '',
	time: 0,
	point: 1,
	category: '',
	quizType: '',
	image: '',
	user: ""
})
const assignQuizInfo = (data: any) => {
	quiz.title = data.title
	quiz.time = data.time
	quiz.point = data.point
	quiz.category = data.category
	quiz.quizType = data.quizType
	quiz.image = data.image
}
const updateQuizHandler = () => {
	const data = {
		...quiz,
		quizId: quizId
	}
	quizStore.updateQuiz(data).then((res) => {
		assignQuizInfo(res)
	})
}

const addQuestionHandler = () => {
	router.push(`/createquestion/${quizId}`)
}




quizStore.getQuizById(quizId).then((res) => {
	assignQuizInfo(res)
})

// onMounted(() => {
// 	quizStore.getQuizById(quizId).then((res) => {
// 		assignQuizInfo(res)
// 	})
// })
</script>

<style lang="scss" scoped>
.title {
	font-size: 25px;
	margin-bottom: 15px;
}

.quiz_detail {
	min-height: 100vh;

	.btns {
		display: flex;
		justify-content: flex-end;
		gap: 20px;
		margin-top: 20px;

		.dark-btn {
			background-color: #fff;
			color: #263238;
			border-width: 2px;
			font-weight: 500;

			&:hover {
				background-color: #263238;
				color: #fff;
				opacity: 1;
			}
		}
	}

	.wrapper {
		margin-top: 10px;
		border-radius: 10px;
		padding: 20px;
		background-color: #fff;

		form {
			display: flex;
			column-gap: 20px;
			flex-wrap: wrap;
			align-items: center;

			.input {
				flex: 0 0 48%;

				.subtitle {
					font-size: 16px;
					font-weight: 500;
				}

				.main-select,
				.main-input {
					width: 100%;
					padding: 8px 10px;
					border-radius: 5px;
					border: 1px solid #8F95A5;
					margin-bottom: 20px;
					background-color: #f2f2f2;
				}
			}

			.dark-btn {
				margin-top: 0;
				margin-left: auto;
			}
		}

		.dark-btn {
			margin-top: 20px;
		}
	}

}
</style>