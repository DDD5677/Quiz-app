<template>
	<div class="answer-wrap">
		<div class="answer bg-stone-100 dark:bg-slate-700">
			<div class="answer-nav border-b-4 border-b-white dark:border-b-slate-800">
				<delete-button @click.prevent="removeEventListener" class="rm-variant"><i
						class="fa-solid fa-trash"></i></delete-button>
				<check-box :index="props.index" />
			</div>
			<div @click="toggleAnswerEditor(true)" class="textarea text-slate-900 dark:text-stone-200">
				<div ref="answerElem"></div>
			</div>
		</div>
		<div v-if="questionStore.editors[index]" class="text-editor ">
			<button @click.prevent="toggleAnswerEditor(false)"><i class="fa-solid fa-square-xmark"></i></button>
			<textarea name="" id="" cols="30" rows="5" placeholder="Variantni kiriting"
				class="bg-stone-100 dark:bg-slate-700 text-slate-900 dark:text-stone-200" v-model="answer"
				@input="$emit('answer', answer)"></textarea>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// @ts-ignore
import renderMathInElement from '../../../node_modules/katex/dist/contrib/auto-render';
import { useQuestionStore } from '@/stores/questionStore';
import type { Editors } from '@/types/createQuizType';
const questionStore = useQuestionStore();
const emit = defineEmits(['removeAnswer', 'answer'])
interface Props { index: keyof Editors, valueEditor: string }

const props = defineProps<Props>()
const answerElem = ref<HTMLElement | null>(null)
const answer = ref(props.valueEditor)

function toggleAnswerEditor(v: boolean) {
	questionStore.toggleEditors(v, props.index)
	//window.scrollTo(0, document.body.scrollHeight);
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
	flex: 1 0 200px;
	position: relative;
}

.answer {
	border-radius: 10px;

	.answer-nav {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 10px;

		.rm-variant {
			padding: 0;
			font-size: 14px;
			width: 25px;
			height: 25px;
			border-radius: 3px;
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
	position: absolute;
	margin-top: 20px;
	z-index: 5;
	top: 90%;
	width: 90%;
	left: 50%;
	transform: translateX(-50%);
	border: 2px solid #000;
	border-radius: 10px;
	height: 150px;

	textarea {
		&:focus {
			outline: none;
		}

		font-size: 20px;
		height: 100%;
		width: 100%;
		padding: 20px 10px 10px;
		border-radius: 10px;
		resize: none;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background-color: #fff;
		position: absolute;
		right: -10px;
		top: -10px;
		width: 20px;
		height: 20px;
		font-size: 25px;
		line-height: 25px;
		z-index: 2;
	}
}
</style>

@/stores/questionStore