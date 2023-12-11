<template>
	<div class="answer-wrap">
		<div class="answer">
			<div class="answer-nav">
				<button @click.prevent="removeEventListener" class="rm-variant"><i class="fa-solid fa-trash"></i></button>
				<check-box :index="props.index" />
				<!-- <input type="checkbox" class="checkbox"> -->
			</div>
			<div @click="toggleAnswerEditor(true)" class="textarea">
				<div ref="answerElem"></div>
			</div>
		</div>
		<div v-if="createQuizStore.editors[index]" class="text-editor">
			<button @click.prevent="toggleAnswerEditor(false)"><i class="fa-solid fa-square-xmark"></i></button>
			<textarea name="" id="" cols="30" rows="5" placeholder="Variantni kiriting" v-model="answer"
				@change="$emit('answer', answer)"></textarea>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// @ts-ignore
import renderMathInElement from '../../../node_modules/katex/dist/contrib/auto-render';
import { useCreateQuizStore } from '@/stores/createQuizStore';
import type { Editors } from '@/types/createQuizType';
const createQuizStore = useCreateQuizStore();
const emit = defineEmits(['removeAnswer', 'answer'])


const props = defineProps<{ index: keyof Editors, valueEditor: string }>()
const answerElem = ref<HTMLElement | null>(null)
const answer = ref('')

function toggleAnswerEditor(v: boolean) {
	createQuizStore.toggleEditors(v, props.index)
	window.scrollTo(0, document.body.scrollHeight);
}
function removeEventListener() {
	emit('removeAnswer', false)
	answer.value = ''
	emit('answer', '')
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
}
watch(answer, () => {
	renderMath(answerElem.value, answer.value)
})
onMounted(() => {
	answer.value = props.valueEditor
	renderMath(answerElem.value, answer.value)
})
</script>

<style lang="scss" scoped>
.answer-wrap {
	flex: 1 0 15%;
}

.answer {

	background-color: #f2f2f2;
	border-radius: 10px;

	.answer-nav {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 10px;
		border-bottom: 3px solid #fff;

		.rm-variant {
			//padding: 5px;
			font-size: 14px;
			width: 25px;
			height: 25px;
			line-height: 15px;
			border-radius: 3px;
			background-color: #fff;
			transition: all 0.4s ease-in-out;

			&:hover {
				background-color: #263238;
				color: white;
			}
		}
	}

	.textarea {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		overflow: auto;
		width: 100%;
		height: 150px;
		padding: 5px;
		overflow-wrap: break-word;
		cursor: text;
	}

	.checkbox {
		width: 15px;
		height: 15px;
		cursor: pointer;
		display: inline-block;

		&:checked {
			color: #263238;
		}
	}
}

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
</style>

