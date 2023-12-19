<template>
	<section class="create-quiz">
		<div class="container">
			<h1 class="title">Create Quiz</h1>
			<div class="wrapper">
				<form action="" @submit.prevent="createQuizHandler">
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
						<main-input required type="number" placeholder="Grade" v-model="quiz.point" />
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
					<dark-button>Create</dark-button>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useQuizStore } from '@/stores/quizStore'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import type { Quiz } from '@/types/quizType'
const router = useRouter();
const authStore = useAuthStore()
const quizStore = useQuizStore()
const quiz = reactive<Quiz>({
	title: '',
	time: 30,
	point: 1,
	category: '',
	quizType: '',
	image: '',
	user: ""
})


function createQuizHandler() {
	const data = {
		...quiz, user: authStore.user.id
	}
	console.log(data)
	quizStore.createQuiz(data).then((res: any) => {
		console.log(res)
		router.push(`/admin/createquestion/${res.id}`)
	}).catch((err) => {
		console.log('error', err)
	})
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 25px;
	margin: 20px 0 10px;
}

.wrapper {
	background-color: #fff;
	padding: 20px;
	border-radius: 10px;
	min-height: 80vh;

	form {
		display: flex;
		column-gap: 20px;
		flex-wrap: wrap;
		align-items: center;
	}

	.input {
		flex: 0 0 48%;

		.subtitle {
			font-size: 18px;
			font-weight: 500;
		}

		.main-select,
		.main-input {
			width: 100%;
			padding: 10px;
			border-radius: 5px;
			border: 1px solid #8F95A5;
			margin-bottom: 20px;
			background-color: #f2f2f2;
		}
	}

	.dark-btn {
		margin-left: auto;
		padding: 10px 16px;
	}

}
</style>