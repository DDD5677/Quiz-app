<template>
	<div class="question_detail" ref="questionElem">
		<div class="question">{{ index }}. {{ question.text }}</div>
		<div class="options">
			<div v-for="(option, index) in options" :key="index" class="option" :class="{ 'correct': option.correct }">
				<span class="dot"></span>
				<span>{{ option.value }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
// @ts-ignore
import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';

const props = defineProps({
	question: {
		type: Object,
		required: true,
		default: () => { }
	},
	index: {
		type: Number,
		required: true
	}
})
const questionElem = ref<HTMLElement | null>(null)
const options = computed(() => {
	const opt = []
	for (const option in props.question.answers) {
		const value = props.question.answers[option]
		if (value !== '') {
			if (props.question.correctAnswer === option) {
				opt.push({
					value: value,
					correct: true
				})
			} else {
				opt.push({
					value: value,
					correct: false
				})
			}
		}
	}
	return opt
})


onMounted(() => {
	renderMathInElement(questionElem.value, {
		delimiters: [
			{ left: '$$', right: '$$', display: true },
			{ left: '$', right: '$', display: false },
			{ left: '\\(', right: '\\)', display: false },
			{ left: '\\[', right: '\\]', display: true }
		],
		throwOnError: false
	})
})
</script>

<style lang="scss" scoped>
.question_detail {
	padding: 10px;
	border-radius: 10px;
	background-color: #f2f2f2;
	margin-bottom: 20px;

	.question {
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 10px;
	}

	.options {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;

		.option {
			display: flex;
			flex: 1 0 40%;
			position: relative;
			padding-left: 15px;
			align-items: center;
			font-size: 14px;

			&:before {
				content: '';
				display: inline-block;
				width: 8px;
				height: 8px;
				background-color: #ee1717;
				border-radius: 50%;
				transform: translateY(-50%);
				position: absolute;
				left: 0;
				top: 50%;
			}

			&.correct:before {
				background-color: rgb(12, 220, 12);
			}
		}
	}
}
</style>