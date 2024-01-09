<template>
	<section class="create-quiz">
		<div class="container">
			<div class="wrapper bg-white dark:bg-slate-800 text-black dark:text-stone-200">
				<h1 class="title">Create Quiz</h1>
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
						<span class="subtitle">Type of score calculation</span>
						<select required name="" id=""
							class="main-select border-slate-900 dark:border-stone-100 bg-stone-100 dark:bg-slate-700"
							v-model="quiz.mixedScore">
							<option value='' selected disabled hidden>Which type?</option>
							<option :value="true">Mixed score</option>
							<option :value="false">Same score</option>
						</select>
						<span class="error"></span>
					</div>
					<div v-if="quiz.mixedScore === false" class="input">
						<span class="subtitle">Grade (in points)</span>
						<main-input required type="number" step=".1" placeholder="Grade" v-model="quiz.point" />
						<span class="error"></span>

					</div>
					<div class="input">
						<span class="subtitle">Category of Quiz</span>
						<select required name="" id=""
							class="main-select border-slate-900 dark:border-stone-100 bg-stone-100 dark:bg-slate-700"
							v-model="quiz.category">
							<option value="" selected disabled hidden>Which category?</option>
							<option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
						</select>
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">Type of Quiz</span>
						<select required name="" id=""
							class="main-select border-slate-900 dark:border-stone-100 bg-stone-100 dark:bg-slate-700"
							v-model="quiz.quizType">
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
import { categories } from '@/constants/constant'
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
	user: "",
	mixedScore: ''
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
	margin-bottom: 10px;
	font-weight: 500;
}

.wrapper {
	margin-top: 20px;
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

		.main-select {
			border: 1px solid;
			outline: none;
		}

		.main-select,
		.main-input {
			width: 100%;
			padding: 10px;
			border-radius: 5px;
			margin-bottom: 20px;
		}
	}

	.upload_image {
		.img_box {
			width: 100%;
			height: 180px;
			margin-bottom: 10px;
			background: url(../assets/images/card__bg.svg);
			background-repeat: no-repeat;
			background-position: center;
			background-size: 40%;
			border: 2px solid #263238;
			border-radius: 10px;
			cursor: pointer;
		}
	}

	.dark-btn {
		margin-left: auto;
		padding: 10px 16px;
	}

}
</style>