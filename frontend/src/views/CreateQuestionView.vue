<template>
	<section class="create-question">
		<div class="navbar bg-white dark:bg-slate-900">
			<div class="brand">
				<RouterLink class="text-black dark:text-stone-100" :to="{ name: 'create-quiz' }">Easy<span
						class="text-slate-400">Quiz</span>
				</RouterLink>
			</div>
			<form @submit.prevent="createQuestionHandler" action="" enctype="multipart/form-data" class="flex">
				<Transition>
					<div v-if="showSelects || !navbarStore.mobile" class="wrapper-selects">
						<div class="selects bg-white dark:bg-slate-800">
							<select required name="" id=""
								class="quiz-type w-[150px] bg-stone-100 border-slate-900 dark:border-stone-100 dark:bg-slate-700 text-slate-900 dark:text-gray-100"
								v-model="questionType">
								<option value="" selected disabled hidden>Question type</option>
								<option value="test">Test</option>
								<option value="fill-in">Fill in</option>
							</select>
							<main-input required type="number" step=".1" placeholder="Point" v-model="point" />
							<select required name="" id=""
								class="quiz-type w-[120px] bg-stone-100 border-slate-900 dark:border-stone-100 dark:bg-slate-700 text-slate-900 dark:text-gray-100"
								v-model="category">
								<option value="" selected disabled hidden>Category</option>
								<option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
							</select>
							<select required name="" id=""
								class="quiz-type w-[120px] bg-stone-100 border-slate-900 dark:border-stone-100 dark:bg-slate-700 text-slate-900 dark:text-gray-100"
								v-model="difficulty">
								<option value="" selected disabled hidden>Difficulty</option>
								<option value="1">Low</option>
								<option value="2">Medium</option>
								<option value="3">High</option>
							</select>
						</div>
					</div>
				</Transition>
				<light-button v-if="navbarStore.mobile" @click.prevent="toggleSelects" class="toggle-selects">
					<i class="fa-solid fa-sliders"></i>
				</light-button>
				<ToggleTheme />
				<dark-button :disabled="disableSaveBtn">Save</dark-button>
			</form>
		</div>
		<Errors v-if="questionStore.errors" :errors="questionStore.errors" />
		<div class="container" :style="editorActive ? 'padding-bottom:100px' : ''">
			<div class="question-editor bg-white dark:bg-slate-800">
				<div class="question-wrapper">
					<div class="quiz-text bg-stone-100 dark:bg-slate-700">
						<div class="textarea-nav border-b-4 border-b-white dark:border-b-slate-800">
							<span class="textarea-title text-slate-900 dark:text-stone-200">Question</span>
							<light-button @click.prevent="toggleShowUpload(true)" class="upload-img">
								<i class="fa-regular fa-image"></i>
							</light-button>
						</div>
						<div class="question-body pt-2">
							<div class="question_img relative">
								<delete-button v-if="image" class="" @click.prevent="removeImage"><i
										class="fa-solid fa-xmark"></i></delete-button>
								<img class="h-full rounded" src="" alt="" ref="target">
							</div>
							<p @click="toggleQuestionEditor(true)" class="textarea text-slate-900 dark:text-stone-200"
								ref="questionElem"></p>
						</div>
						<div v-if="questionStore.editors.question" class="text-editor">
							<button @click.prevent="toggleQuestionEditor(false)"><i class="fa-solid fa-square-xmark"></i></button>
							<textarea name="" id="" cols="30" rows="5" placeholder="Enter the question"
								class="bg-stone-100 dark:bg-slate-700 text-slate-900 dark:text-stone-200"
								v-model="question"></textarea>
						</div>
					</div>
					<div class="quiz-answers" :key="answerKey">
						<AnswerEditor v-if="showAnswers.showAnswer1 || answers.answer1" :index="'answer1'"
							@answer="answerHandler($event, 'answer1')" @removeAnswer="removeAnswerHandler($event, 'showAnswer1')"
							:valueEditor="answers.answer1" />
						<AnswerEditor v-if="showAnswers.showAnswer2 || answers.answer2" :index="'answer2'"
							@answer="answerHandler($event, 'answer2')" @removeAnswer="removeAnswerHandler($event, 'showAnswer2')"
							:valueEditor="answers.answer2" />
						<AnswerEditor v-if="showAnswers.showAnswer3 || answers.answer3" :index="'answer3'"
							@answer="answerHandler($event, 'answer3')" @removeAnswer="removeAnswerHandler($event, 'showAnswer3')"
							:valueEditor="answers.answer3" />
						<AnswerEditor v-if="showAnswers.showAnswer4 || answers.answer4" :index="'answer4'"
							@answer="answerHandler($event, 'answer4')" @removeAnswer="removeAnswerHandler($event, 'showAnswer4')"
							:valueEditor="answers.answer4" />
						<AnswerEditor v-if="showAnswers.showAnswer5 || answers.answer5" :index="'answer5'"
							@answer="answerHandler($event, 'answer5')" @removeAnswer="removeAnswerHandler($event, 'showAnswer5')"
							:valueEditor="answers.answer5" />
					</div>
					<dark-button :disabled="activeAnswers === 5" @click.prevent="addAnswer"><i class="fa-solid fa-plus"></i> Add
						option</dark-button>
				</div>
			</div>
		</div>
		<UploadImage v-if="showUpload" @close="toggleShowUpload" :uploadImage="uploadImage" />
	</section>
</template>

<script setup lang="ts">
import UploadImage from '@/components/UI/uploadImage.vue';
import { useQuestionStore } from '@/stores/questionStore';
import { useAuthStore } from '@/stores/authStore';
import { useQuizStore } from '@/stores/quizStore'
import AnswerEditor from '@/components/UI/answerEditor.vue'
import { computed, onMounted, ref, watch } from 'vue';
// @ts-ignore
import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';
import type { ShowAnswers, Answers } from '@/types/createQuizType';
import { useRouter, useRoute } from 'vue-router'
import ToggleTheme from '@/components/UI/ToggleTheme.vue';
import { categories } from '@/constants/constant';
import { useNavbarStore } from '@/stores/navbarStore';
const router = useRouter();
const route = useRoute();
const questionStore = useQuestionStore();
const authStore = useAuthStore()
const quizStore = useQuizStore()
const navbarStore = useNavbarStore()
const answerKey = ref(0)

//difficulty question
const difficulty = ref<number | ''>('')
//category of question
const category = ref('')
//point for question
const point = ref<number | null>(null)
//Type of question
const questionType = ref('')
//image of question
const image = ref<any>(null)

//selects modal
const showSelects = ref(false)
const toggleSelects = () => {
	showSelects.value = !showSelects.value
}
//question
const questionElem = ref<HTMLElement | null>(null)
const question = ref('');

function toggleQuestionEditor(v: boolean) {
	questionStore.toggleEditors(v, 'question')
}
const editorActive = computed(() => {
	for (const [key, value] of Object.entries(questionStore.editors)) {
		if (value) {
			return true
		}
	}
	return false
})
//answers
const answers = ref<Answers>({
	answer1: '',
	answer2: '',
	answer3: '',
	answer4: '',
	answer5: ''
})
const showAnswers = ref<ShowAnswers>({
	showAnswer1: true,
	showAnswer2: true,
	showAnswer3: false,
	showAnswer4: false,
	showAnswer5: false,
})
const activeAnswers = ref(2);

function answerHandler(a: string, title: keyof Answers) {
	answers.value[title] = a;
}
function removeAnswerHandler(show: boolean, title: keyof ShowAnswers) {
	if (activeAnswers.value > 2) {
		showAnswers.value[title] = show
		activeAnswers.value -= 1
	} else {
		alert('The question should consist of at least two options')
	}
}
function addAnswer() {
	const keys = Object.keys(showAnswers.value) as Array<keyof typeof showAnswers.value>;
	if (activeAnswers.value < 5) {
		for (const key of keys) {
			if (!showAnswers.value[key]) {
				showAnswers.value[key] = true
				activeAnswers.value += 1
				break
			}
		}
	}
}
//disable button
const checkAnswers = computed(() => {
	if (showAnswers.value.showAnswer1 && (answers.value.answer1 === '')) return true
	if (showAnswers.value.showAnswer2 && (answers.value.answer2 === '')) return true
	if (showAnswers.value.showAnswer3 && (answers.value.answer3 === '')) return true
	if (showAnswers.value.showAnswer4 && (answers.value.answer4 === '')) return true
	if (showAnswers.value.showAnswer5 && (answers.value.answer5 === '')) return true

	return false
})
const disableSaveBtn = computed(() => {
	return checkAnswers.value
})
//upload Image
const showUpload = ref(false)
const target = ref<HTMLImageElement | null>(null);
const toggleShowUpload = (show: boolean) => {
	showUpload.value = show
}

const showImage = (src: any, target: any) => {
	const fr = new FileReader();
	// when image is loaded, set the src of the image where you want to display it
	fr.onload = function (e) { target.src = this.result; };
	// fill fr with image data    
	fr.readAsDataURL(src);
}
const removeImage = () => {
	if (target.value) target.value.src = ''
	image.value = null
}

const uploadImage = (img: any) => {
	image.value = img;
	showImage(img, target.value)
}
//assign question data according to question query
const assignQuestionData = () => {
	difficulty.value = questionStore.question.difficulty;
	point.value = questionStore.question.point;
	answers.value = questionStore.question.answers;
	question.value = questionStore.question.text;
	category.value = questionStore.question.category;
	questionType.value = questionStore.question.questionType;
	if (target.value) target.value.src = questionStore.question.image
	image.value = questionStore.question.image;
	activeAnswers.value = 0
	for (const key in questionStore.question.answers) {
		if (questionStore.question.answers[key]) {
			activeAnswers.value++
		}
	}
	answerKey.value += 1
}


//rendering Latex string
function renderMath(editor: HTMLElement | null, word: string) {
	if (editor) {
		editor.textContent = word;

		renderMathInElement(editor, {
			delimiters: [
				{ left: '$$', right: '$$', display: true },
				{ left: '$', right: '$', display: false },
				{ left: '\\(', right: '\\)', display: false },
				{ left: '\\[', right: '\\]', display: true }
			],
			throwOnError: false
		})
	}
}
watch(question, () => {
	renderMath(questionElem.value, question.value)
})
onMounted(() => {
	renderMath(questionElem.value, question.value)
})

//create Question
const quizId = route.params.id as string
function createQuestionHandler() {
	const data = {
		text: question.value,
		correctAnswer: questionStore.correctAnswer,
		answers: answers.value,
		difficulty: difficulty.value,
		point: point.value,
		questionType: questionType.value,
		category: category.value,
		user: authStore.user.id,
		image: image.value,
		quizId: quizId,
		questionId: route.query.question
	}
	questionStore.createQuestion(data).then((res) => {
		router.push(`/admin/quiz/${quizId}`)
	}).catch((err) => {
		console.log(err)
	})
}
onMounted(() => {
	const questionId = route.query.question as string
	if (questionId) {
		questionStore.getQuestionById(questionId).then((res) => {
			console.log(res)
			assignQuestionData()
		})
	} else {
		quizStore.getQuizById(quizId).then((res: any) => {
			if (!res.mixedScore) point.value = res.point
		})
	}
})
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
	transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.navbar {
	width: 100%;
	display: flex;
	padding: 10px;
	align-items: center;
	justify-content: space-between;
	position: relative;

	form {
		gap: 15px
	}

	.brand {
		font-family: 'Henny Penny', serif;
		font-size: 28px;
		margin: 0 10px;
	}

	.toggle-selects {
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;

		&:hover {
			background-color: rgb(2 6 23);
		}
	}

	.selects {
		display: flex;
		gap: 10px;

		select {
			border: 1px solid;
			outline: none;
		}

		select,
		.main-input {
			padding: 5px;
			border-radius: 5px;
		}

		.main-input {
			width: 70px;
		}
	}

}

.container {
	display: flex;
	align-items: center;
	justify-content: center;

	.question-editor {
		width: 100%;
		margin: 20px 0;
		padding: 20px;
		border-radius: 20px;



		.question-wrapper {


			.text-editor {
				position: absolute;
				margin-top: 20px;
				z-index: 5;
				top: 100%;
				width: 90%;
				left: 50%;
				transform: translateX(-50%);
				border: 2px solid #000;
				border-radius: 10px;
				height: 30vh;

				textarea {
					&:focus {
						outline: none;
					}

					font-size: 20px;
					height: 100%;
					width: 100%;
					padding: 20px 10px 10px;
					border-radius: 8px;
					resize: none;
				}

				button {
					background-color: #fff;
					position: absolute;
					right: -10px;
					top: -10px;
					width: 20px;
					height: 20px;
					font-size: 25px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 5px;
					line-height: 25px;
					z-index: 2;
				}
			}

			.question_img {
				height: 180px;
				flex: 0 0 auto;

				img {
					width: auto;
					height: 100%;
				}

				button {
					padding: 0;
					position: absolute;
					top: -10px;
					right: -10px;
					border-radius: 50%;
					width: 30px;
					height: 30px;
					font-size: 18px;
					display: flex;
					align-items: center;
					justify-content: center;
				}

			}



			.textarea-nav {
				position: absolute;
				left: 0px;
				top: 0px;
				border-radius: 10px 10px 0 0;
				padding: 5px 10px;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.textarea-title {
					font-weight: 500;
				}

				.upload-img {
					padding: 0px;
					width: 30px;
					height: 30px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.quiz-text {
				padding: 10px;
				border-radius: 10px;
				padding-top: 45px;
				position: relative;
				width: 100%;
				position: relative;
				min-height: 250px;

				.question-body {
					height: 100%;

					.question_img {
						float: right;
					}

					.textarea {
						display: block;
						padding: 0 10px;
						font-size: 20px;
						min-height: 200px;
						overflow-wrap: break-word;
						cursor: text;
					}
				}
			}

			.quiz-answers {
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
				gap: 10px;
				flex-wrap: wrap;
			}

			.dark-btn {
				width: 100%;
				margin-top: 20px;
			}
		}
	}
}

@media(max-width:820px) {
	.create-question {
		.navbar {
			position: relative;
			z-index: 27;

			form {
				.wrapper-selects {
					position: absolute;
					top: 60px;
					left: 0;
					width: 100vw;
					height: calc(100vh - 60px);
					background-color: #00000069;
					z-index: -10;
					display: flex;
					justify-content: center;

					.selects {
						padding: 30px;
						margin-top: 50px;
						margin-bottom: auto;
						flex-direction: column;

						border: 2px solid #000;
						border-radius: 10px;

						.main-input,
						select {
							width: 100%;
						}
					}
				}
			}
		}
	}
}

@media(max-width:480px) {
	.create-question {
		.navbar {
			.brand {
				font-size: 24px;
				margin: 0;
			}

			form {
				gap: 5px;
			}
		}

		.question-wrapper {
			.quiz-text {
				.question_img {
					width: 100%;
					height: auto;

					img {
						width: 100%;
						height: auto;
					}
				}
			}
		}
	}
}
</style>