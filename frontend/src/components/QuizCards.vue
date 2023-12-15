<template>
	<div class="quiz_card">
		<div class="img_box">
			<a href="">
				<img
					src="https://images.unsplash.com/photo-1702561474123-7dfd6cb260c4?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="">
			</a>
		</div>
		<div class="body">
			<span class="quiz_title">{{ quiz.title }}</span>
			<div class="btns">
				<dark-button @click.prevent="quizDetailHnadler" class="detail-btn"><i class="fa-solid fa-pencil"></i>
					Detail</dark-button>
				<dark-button @click.prevent="deleteQuizHandler(quiz.id)" class="delete-btn"><i class="fa-solid fa-trash"></i>
					Delete</dark-button>
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
const quizDetailHnadler = () => {
	router.push(`/quiz/${props.quiz.id}`)
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

</script>

<style lang="scss" scoped>
.quiz_card {
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	border-radius: 10px;

	.img_box {
		border-radius: 10px 10px 0 0;
		overflow: hidden;

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

			.detail-btn {
				background-color: white;
				border-width: 2px;
				color: #263238;
				font-weight: 500;

				&:hover {
					background-color: #263238;
					color: #fff;
					opacity: 1;
				}
			}

			.delete-btn {
				background-color: white;
				border: 2px solid #d40700;
				color: #d40700;
				font-weight: 500;

				&:hover {
					background-color: #d40700;
					color: #fff;
					opacity: 1;
				}
			}
		}
	}
}
</style>