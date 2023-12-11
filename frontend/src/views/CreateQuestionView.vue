<template>
	<section class="create-question">
		<CreateQuestionNavbar @difficulty="difficultyHandler" @category="categoryHandler" @questionType="questionTypeHandler"
			@point="pointHandler" :saveQuestionHandler="saveQuestionHandler" />
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
					<div v-if="createQuizStore.editors.question" class="text-editor">
						<button @click.prevent="toggleQuestionEditor(false)"><i class="fa-solid fa-square-xmark"></i></button>
						<textarea name="" id="" cols="30" rows="5" placeholder="Savol matni" v-model="question"></textarea>
					</div>
					<div class="quiz-answers">
						<AnswerEditor v-if="showAnswers.showAnswer1" :index="'answer1'"
							@answer="answerHandler($event, 'answer1')" @removeAnswer="removeAnswerHandler($event, 'showAnswer1')"
							:valueEditor="answers.answer1" />
						<AnswerEditor v-if="showAnswers.showAnswer2" :index="'answer2'"
							@answer="answerHandler($event, 'answer2')" @removeAnswer="removeAnswerHandler($event, 'showAnswer2')"
							:valueEditor="answers.answer2" />
						<AnswerEditor v-if="showAnswers.showAnswer3" :index="'answer3'"
							@answer="answerHandler($event, 'answer3')" @removeAnswer="removeAnswerHandler($event, 'showAnswer3')"
							:valueEditor="answers.answer3" />
						<AnswerEditor v-if="showAnswers.showAnswer4" :index="'answer4'"
							@answer="answerHandler($event, 'answer4')" @removeAnswer="removeAnswerHandler($event, 'showAnswer4')"
							:valueEditor="answers.answer4" />
						<AnswerEditor v-if="showAnswers.showAnswer5" :index="'answer5'"
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
import { useCreateQuizStore } from '@/stores/createQuizStore';
import { useAuthStore } from '@/stores/authStore';
import AnswerEditor from '@/components/UI/answerEditor.vue'
import { computed, onMounted, ref, watch } from 'vue';
// @ts-ignore
import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';
import type { ShowAnswers, Answers } from '@/types/createQuizType';
const createQuizStore = useCreateQuizStore();
const authStore = useAuthStore()
//difficulty question
const difficulty = ref('low')
function difficultyHandler(item: string) {
	difficulty.value = item
}
//category of question
const category = ref('')
function categoryHandler(item: string) {
	category.value = item
}
//point for question
const point = ref<number | null>(null)
function pointHandler(item: number) {
	point.value = item
}
//Type of question
const questionType = ref('')
function questionTypeHandler(item: string) {
	questionType.value = item
}
//image of question
const image = ref<any>(null)

//question
const questionElem = ref<HTMLElement | null>(null)
const question = ref('');

function toggleQuestionEditor(v: boolean) {
	createQuizStore.toggleEditors(v, 'question')
}
const editorActive = computed(() => {
	for (const [key, value] of Object.entries(createQuizStore.editors)) {
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
	showAnswer3: true,
	showAnswer4: true,
	showAnswer5: false,
})
const activeAnswers = ref(4);

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
function saveQuestionHandler() {
	const data = {
		body: question.value,
		correct_answer: createQuizStore.correctAnswer,
		answers: answers.value,
		difficulty: difficulty.value,
		point: point.value,
		questionType: questionType.value,
		category: category.value,
		user: authStore.user.id,
		image: image.value
	}
	createQuizStore.saveQuestion(data)
}
</script>

<style scoped lang="scss">
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
</style>@/types/createQuizType