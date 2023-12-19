<template>
	<section class="create-question">
		<div class="navbar">
			<div class="brand">
				<RouterLink :to="{ name: 'create-quiz' }">Easy<span>Quiz</span></RouterLink>
			</div>
			<div class="selects">
				<select name="" id="" class="quiz-type" v-model="questionType">
					<option value="" selected disabled hidden>Savol turi</option>
					<option value="test">Test</option>
					<option value="fill-in">Bo'sh joyni to'ldirish</option>
				</select>
				<main-input type="number" placeholder="Grade (in points)" v-model="point" />
				<select name="" id="" v-model="category">
					<option value="" selected disabled hidden>Savol qaysi fandan</option>
					<option value="math">Matematika</option>
					<option value="english">Ingliz tili</option>
					<option value="history">Tarix</option>
					<option value="physics">Fizika</option>
				</select>
				<select name="" id="" v-model="difficulty">
					<option value="" selected disabled hidden>Qiyinlik darajasi</option>
					<option value="low">Onson</option>
					<option value="medium">O'rtacha</option>
					<option value="hard">Qiyin</option>
					<option value="expert">Juda qiyin</option>
				</select>
			</div>
			<dark-button @click.prevent="createQuestionHandler">Save question</dark-button>
		</div>
		<div class="container" :style="editorActive || true ? 'padding-bottom:30vh' : ''">
			<div class="question-editor">
				<form action="">
					<div class="quiz-text">
						<div class="textarea-nav">
							<span class="textarea-title">Savol matni</span>
							<button class="upload-img"><i class="fa-regular fa-image"></i></button>
						</div>
						<div @click="toggleQuestionEditor(true)" class="textarea" ref="questionElem"></div>
					</div>
					<div v-if="questionStore.editors.question" class="text-editor">
						<button @click.prevent="toggleQuestionEditor(false)"><i class="fa-solid fa-square-xmark"></i></button>
						<textarea name="" id="" cols="30" rows="5" placeholder="Savol matni" v-model="question"></textarea>
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
					<dark-button :disabled="activeAnswers === 5" @click.prevent="addAnswer">Variant qo'shish</dark-button>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import CreateQuestionNavbar from '@/components/CreateQuestionNavbar.vue';
import { useQuestionStore } from '@/stores/questionStore';
import { useAuthStore } from '@/stores/authStore';
import { useQuizStore } from '@/stores/quizStore'
import AnswerEditor from '@/components/UI/answerEditor.vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue';
// @ts-ignore
import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';
import type { ShowAnswers, Answers } from '@/types/createQuizType';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const questionStore = useQuestionStore();
const authStore = useAuthStore()
const quizStore = useQuizStore()

const answerKey = ref(0)

//difficulty question
const difficulty = ref('low')
//category of question
const category = ref('')
//point for question
const point = ref<number | null>(null)
//Type of question
const questionType = ref('')
//image of question
const image = ref<any>(null)

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
		alert('Savol kamida ikkita variantdan tashkil topishi kerak ')
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
//assign question data according to question query

const assignQuestionData = () => {
	difficulty.value = questionStore.question.difficulty;
	point.value = questionStore.question.point;
	answers.value = questionStore.question.answers;
	question.value = questionStore.question.text;
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
	// katex.render(this.changeText, this.$refs.box, {
	// 	throwOnError: false,
	// 	displayMode:this.display
	// });

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
		quizStore.getQuizById(quizId)
	}
})
</script>

<style scoped lang="scss">
.navbar {
	width: 100%;
	background-color: #fff;
	display: flex;
	padding: 10px;
	align-items: center;
	justify-content: space-between;

	.brand {
		font-family: 'Henny Penny', serif;
		font-size: 28px;
		margin: 0 10px;

		span {
			color: #8F95A5;
		}
	}

	.selects {
		display: flex;
		gap: 10px;

		select,
		.main-input {
			padding: 5px;
			border: 2px solid #000;
			border-radius: 5px;
			background-color: #f2f2f2;
		}

		.main-input {
			width: 80px;
		}
	}

}

.container {
	display: flex;
	align-items: center;
	justify-content: center;

	.question-editor {
		width: 90%;
		padding: 20px;
		background-color: #fff;
		margin-top: 20px;
		border-radius: 20px;



		form {
			.text-editor {
				position: fixed;
				margin-top: 20px;
				z-index: 5;
				bottom: 0;
				width: 90%;
				left: 50%;
				transform: translateX(-50%);
				border: 2px solid #000;
				border-radius: 10px;

				textarea {
					&:focus {
						outline: none;
					}

					font-size: 20px;
					width: 100%;
					height: 30vh;
					background-color: #f2f2f2;
					padding: 20px 10px 10px;
					border-radius: 10px;
					resize: none;
				}

				button {
					background-color: #fff;
					position: absolute;
					right: -10px;
					top: -10px;
					width: 25px;
					height: 25px;
					font-size: 25px;
					line-height: 25px;
					z-index: 2;
				}
			}

			.textarea {
				font-size: 20px;
				overflow: auto;
				width: 100%;
				height: 100%;
				overflow-wrap: break-word;
				cursor: text;
			}

			.textarea-nav {
				position: absolute;
				left: 0px;
				top: 0px;
				border-radius: 10px 10px 0 0;
				background-color: #f2f2f2;
				padding: 5px 10px;
				border-bottom: 3px solid #fff;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.textarea-title {
					font-weight: 500;
					color: #263238;
				}

				.upload-img {
					padding: 5px;
					width: 30px;
					line-height: 20px;
					border-radius: 3px;
					background-color: #fff;
					transition: all 0.4s ease-in-out;

					&:hover {
						background-color: #263238;
						color: white;
					}
				}
			}



			.quiz-text {
				background-color: #f2f2f2;
				padding: 10px;
				border-radius: 10px;
				padding-top: 45px;
				position: relative;
				width: 100%;
				height: max(30vh, 250px);
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
</style>@/types/createQuizType@/stores/questionStore