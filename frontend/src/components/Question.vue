<template>
	<div ref="questionElem">
		<div class="quiz" :class="{ 'not_choosed': choosed === undefined && actionStore.finished }">
			<div class="question">
				<span class="number">{{ index + 1 }}.</span>{{ question.text }}
			</div>
			<div class="options">
				<ul v-if="!actionStore.finished">
					<li v-for="(option, index) in options" :key="index" @click="chooseHandler(index)" class="item"
						:class="{ 'active': index === active }">{{ latters[index] + ') ' + option }}</li>
				</ul>
				<ul v-else>
					<li v-for="(option, index) in options" :key="index" class="item"
						:class="{ 'correct': index === question.correctAnswer, 'incorrect': index === choosed && choosed !== question.correctAnswer }">
						{{ latters[index] + ') ' + option }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
// @ts-ignore
import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';
import { useActionStore } from '@/stores/actionStore';
import { useRoute } from 'vue-router';

const props = defineProps<{ question: any, index: number, choosed: number | undefined }>()
const actionStore = useActionStore()
const route = useRoute()
const latters = ['A', 'B', 'C', 'D', 'E']
const questionElem = ref<HTMLElement | null>(null)
const active = ref<number | undefined>()
active.value = props.choosed

//choose option
const chooseHandler = (answer: number) => {
	active.value = answer
	const data = {
		actionId: route.params.id,
		chooses: { id: props.question.id, choose: answer }
	}
	actionStore.updateAction(data)
}

//dfine options acording to question answers
const options = computed(() => {
	const opt = []
	for (const option in props.question.answers) {
		const value = props.question.answers[option]
		if (value !== '') {
			opt.push(value)
		}

	};
	return opt;
})

//render math formulas with katex library
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
.quiz {
	padding: 30px 0;
	border-bottom: 5px dashed #f2f2f2;

	&.not_choosed {
		background-color: #FFCCCC;
	}

	.question {
		padding: 10px 30px;
		font-size: 22px;

		.number {
			font-weight: 700;
			margin-right: 5px;
		}
	}

	.options {
		font-size: 18px;

		.item {
			padding: 10px 30px;
			cursor: pointer;
			transition: all 0.4s ease;

			&:hover {
				background-color: #f2f2f2;
			}

			&.active {
				background-color: #263238;
				color: #fff;

			}

			&.correct {
				background-color: #4cbb17;
				color: #fff;

			}

			&.incorrect {
				background-color: #BA1607;
				color: #fff;
			}
		}
	}
}</style>