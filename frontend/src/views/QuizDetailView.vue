<template>
	<section class="quiz_detail">
		<div class="container">
			<div class="btns">
				<light-button @click.prevent="addQuestionHandler">
					<i class="fa-solid fa-plus"></i> <span>Add Question</span>
				</light-button>
				<light-button>
					<a :href="url" target="_blank"><i class="fa-brands fa-telegram"></i> Share</a>
				</light-button>
			</div>
			<div v-if="!quizStore.isLoading" class="wrapper bg-white dark:bg-slate-800 text-black dark:text-stone-200">
				<h1 class="title">Quiz Detail</h1>
				<form action="" @submit.prevent="updateQuizHandler">
					<div class="upload_image input">
						<div @click="toggleShowUpload(true)" class="img_box">
							<img v-if="quizStore.quiz.image" :src="quizStore.quiz.image" alt="">
							<span class="img_camera bg-stone-100/20 text-slate-100 dark:text-slate-800"
								@click="toggleShowUpload(true)"><i class="fa-solid fa-camera"></i></span>

						</div>
					</div>
					<div class="input">
						<span class="subtitle">Title of Quiz</span>
						<main-input required type="text" placeholder="Title" v-model="quiz.title" />
						<span class="error"></span>
						<span class="subtitle">Time for Quiz (in minutes)</span>
						<main-input required type="number" placeholder="Time" v-model="quiz.time" />
						<span class="error"></span>
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
					<div class="input">
						<span class="subtitle">Type of score calculation</span>
						<select required name="" id=""
							class="main-select border-slate-900 dark:border-stone-100 bg-stone-100 dark:bg-slate-700"
							v-model="quiz.mixedScore">
							<option value="" selected disabled hidden>Which type?</option>
							<option :value="true">Mixed score</option>
							<option :value="false">Same score</option>
						</select>
						<span class="error"></span>
					</div>
					<div v-if="quiz.mixedScore === false" class="input">
						<span class="subtitle">Grade (in points)</span>
						<main-input required type="number" placeholder="Grade" step=".1" v-model="quiz.point" />
						<span class="error"></span>
					</div>
					<div class="input">
						<span class="subtitle">The difficulty of Quiz</span>
						<select disabled name="" id=""
							class="main-select border-slate-900 dark:border-stone-100 bg-stone-100 dark:bg-slate-700"
							:value="difficulty">
							<option value="1">Onson</option>
							<option value="2">O'rtacha</option>
							<option value="3">Qiyin</option>
						</select>

					</div>
					<dark-button :disabled="!changed">Update</dark-button>
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
		<UploadImage v-if="showUpload" @close="toggleShowUpload" :uploadImage="uploadImage" />

	</section>
</template>

<script setup lang="ts">
import UploadImage from '@/components/UI/uploadImage.vue';
import QuestionDetail from '@/components/QuestionDetail.vue';
import { categories } from '@/constants/constant';
import { useQuestionStore } from '@/stores/questionStore';
import { useQuizStore } from '@/stores/quizStore';
import type { Quiz } from '@/types/quizType';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()
const questionStore = useQuestionStore()
const quizId = route.params.id as string
const sharedText = 'EasyQuiz online test platformasi'
const url = `https://telegram.me/share/url?url=${window.location.origin}/quiz/${quizId}&text=${sharedText}`
const quiz = reactive<Quiz>({
	title: '',
	time: 0,
	point: 1,
	category: '',
	quizType: '',
	image: '',
	user: "",
	mixedScore: ''
})
//disable button if nothing is changed
const changed = computed(() => {
	const data = quizStore.quiz;
	return quiz.title !== data.title || quiz.time !== data.time || quiz.category !== data.category || quiz.mixedScore !== data.mixedScore || quiz.quizType !== data.quizType || +quiz.point !== data.point
})
//calculate difficulty of quiz
const difficulty = computed(() => {
	if (quizStore.quiz.difficulty < 1.5) {
		return 1
	} else if (quizStore.quiz.difficulty < 2.5) {
		return 2
	} else {
		return 3
	}
})
//upload Image
const showUpload = ref(false)
const toggleShowUpload = (show: boolean) => {
	showUpload.value = show
}
const uploadImage = (image: any) => {
	const data = {
		id: quizId,
		image: image
	}
	quizStore.updateQuizImage(data).then((res) => {
		console.log(res)
	})
}
const assignQuizInfo = (data: any) => {
	quiz.title = data.title
	quiz.time = data.time
	quiz.point = data.point
	quiz.category = data.category
	quiz.quizType = data.quizType
	quiz.mixedScore = data.mixedScore
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
	router.push(`/admin/createquestion/${quizId}`)
	questionStore.assignCorrectAnswer(null)
}

//get quiz for admin
quizStore.getQuizByIdForAdmin(quizId).then((res) => {
	assignQuizInfo(res)
})
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
	}

	.wrapper {
		margin-top: 10px;
		border-radius: 10px;
		padding: 20px;

		form {
			display: flex;
			column-gap: 20px;
			flex-wrap: wrap;
			align-items: center;

			.upload_image {
				.img_box {
					width: 100%;
					height: 170px;
					margin-bottom: 10px;
					background: url(../assets/images/card__bg.svg);
					background-repeat: no-repeat;
					background-position: center;
					background-size: 40%;
					border: 2px solid #263238;
					border-radius: 10px;
					cursor: pointer;
					overflow: hidden;
					position: relative;

					img {
						height: 100%;
						width: 100%;
						object-fit: cover;
					}

					&:hover {
						.img_camera {
							height: 100%;
							font-size: 68px;
						}
					}

					.img_camera {
						transition: all 0.3s linear;
						height: 0;
						width: 100%;
						position: absolute;
						bottom: 0;
						left: 0;
						cursor: pointer;
						font-size: 0px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}

			.input {
				flex: 0 0 48%;

				.subtitle {
					font-size: 16px;
					font-weight: 500;
				}

				.main-select {
					border: 1px solid;
					outline: none;
				}

				.main-select,
				.main-input {
					width: 100%;
					padding: 8px 10px;
					border-radius: 5px;
					margin-bottom: 20px;
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