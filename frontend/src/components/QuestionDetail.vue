<template>
	<div class="question_detail bg-white border-2 border-stone-100 dark:border-slate-700 dark:bg-slate-800 "
		ref="questionElem">
		<div class="nav bg-stone-100 dark:bg-slate-700">
			<span class="number">Question {{ index }}</span>
			<div class="btns">
				<light-button @click.prevent="updateQuestionHandler(question.id)"><i
						class="fa-solid fa-pencil"></i></light-button>
				<delete-button @click.prevent="deleteQuestionHandler(question.id)"><i
						class="fa-solid fa-trash"></i></delete-button>
			</div>
		</div>
		<div class="body">
			<div class="question border-b-2 border-b-stone-100 dark:border-b-slate-700">{{ question.text }}</div>
			<div class="options">
				<div v-for="(option, index) in options" :key="index" class="option"
					:class="{ 'correct': index === +question.correctAnswer }">
					<span class="dot"></span>
					<span>{{ option }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useQuizStore } from '@/stores/quizStore';
import { useQuestionStore } from '@/stores/questionStore';
// @ts-ignore
import renderMathInElement from '../../node_modules/katex/dist/contrib/auto-render';
import { useRoute, useRouter } from 'vue-router';
const quizStore = useQuizStore()
const questionStore = useQuestionStore()
const router = useRouter()
const route = useRoute()
const quizId = route.params.id as string
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
			opt.push(value)
		}

	}
	return opt
})
const updateQuestionHandler = (id: string) => {
	router.push({ path: `/admin/createQuestion/${route.params.id}`, query: { question: id } })
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}
const deleteQuestionHandler = (id: string) => {
	const data = {
		questionId: id,
		quizId: quizId
	}
	questionStore.deleteQuestion(data).then((res) => {
		quizStore.getQuizById(quizId)
	})
}
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
	border-radius: 8px;
	margin-bottom: 20px;

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px;
		border-radius: 5px 5px 0 0;

		.number {
			font-weight: 500;
		}

		.light-btn,
		.delete-btn {
			margin-left: 10px;
			font-size: 10px;
		}
	}

	.body {
		padding: 10px;
	}

	.question {
		padding-bottom: 5px;
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 10px;
	}

	.options {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;

		.option {
			display: flex;
			flex: 1 0 48%;
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