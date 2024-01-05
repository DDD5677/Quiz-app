<template>
	<div class="quiz_card bg-stone-100 dark:bg-slate-700 text-slate-900 dark:text-stone-100">
		<div class="img_box">
			<a href="">
				<img :src="quiz.image" alt="">
			</a>
		</div>
		<div class="body">
			<span class="quiz_title">{{ quiz.title }}</span>
			<div class="btns">
				<light-button @click.prevent="quizDetailHandler"><i class="fa-solid fa-pencil"></i>
					Detail</light-button>
				<delete-button @click.prevent="deleteQuizHandler(quiz.id)">
					<i class="fa-solid fa-trash"></i>
					Delete</delete-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quizStore';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
	quiz: {
		type: Object,
		required: true
	}
})
const router = useRouter()
const route = useRoute();
const quizStore = useQuizStore()


const deleteQuizHandler = (id: string) => {
	quizStore.deleteQuiz(id).then((res) => {
		quizStore.getQuiz({ page: 1, limit: 10, user: route.query.user })
	})
}
const quizDetailHandler = () => {
	router.push(`/admin/quiz/${props.quiz.id}`)
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

</script>

<style lang="scss" scoped>
.quiz_card {
	display: flex;
	flex-direction: column;
	border-radius: 10px;

	.img_box {
		border-radius: 10px 10px 0 0;
		overflow: hidden;
		background: url(../assets/images/card__bg.svg);
		background-repeat: no-repeat;
		background-position: center;

		img {
			width: 100%;
			height: 160px;
			object-fit: cover;
			transition: all 0.3s ease-in;

			&:hover {
				transform: scale(1.05);
			}
		}
	}

	.body {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;

		.quiz_title {
			font-size: 16px;
			text-transform: capitalize;

		}

		.btns {
			display: flex;
			justify-content: space-between;
			margin-top: 20px;
			font-size: 12px;
		}
	}
}
</style>