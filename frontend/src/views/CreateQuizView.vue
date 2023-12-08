<template>
	<div class="container" :style="true ? 'padding-bottom:30vh' : ''">
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
					<AnswerEditor :index="'answer1'" @answer="answerHandler($event, 'answer1')" />
					<AnswerEditor :index="'answer2'" @answer="answerHandler($event, 'answer2')" />
					<AnswerEditor :index="'answer3'" @answer="answerHandler($event, 'answer3')" />
					<AnswerEditor :index="'answer4'" @answer="answerHandler($event, 'answer4')" />
					<AnswerEditor :index="'answer5'" @answer="answerHandler($event, 'answer5')" />
				</div>
				<dark-button>Variant qo'shish</dark-button>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCreateQuizStore } from '@/stores/createQuizStore';
import AnswerEditor from '@/components/UI/answerEditor.vue'
import { onMounted, ref, watch } from 'vue';
// @ts-ignore
import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';
import type { Answers } from '@/types/createQuizType';
const createQuizStore = useCreateQuizStore();

const answers: Answers = {
	answer1: '',
	answer2: '',
	answer3: '',
	answer4: '',
	answer5: ''
}
const questionElem = ref<HTMLElement | null>(null)
const question = ref('');
function toggleQuestionEditor(v: boolean) {
	createQuizStore.toggleEditors(v, 'question')
}


function answerHandler(a: string, title: keyof Answers) {
	answers[title] = a;
}

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
// onMounted(() => {
// 	renderMath(questionElem.value, question.value)
// })
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

			}

			.dark-btn {
				width: 100%;
				margin-top: 20px;
			}
		}
	}
}
</style>@/types/createQuizType