<template>
	<section class="create-quiz">
		<div class="container">
			<h1 class="title">Create Quiz</h1>
			<div class="wrapper">
				<div class="left">
					<form action="">
						<div class="input">
							<span class="subtitle">Title of Quiz</span>
							<main-input type="text" placeholder="Title" v-model="title" />
							<span class="error"></span>
						</div>
						<div class="input">
							<span class="subtitle">Time for Quiz (in minutes)</span>
							<main-input type="number" placeholder="Time" v-model="time" />
							<span class="error"></span>
						</div>
						<div class="input">
							<span class="subtitle">Grade (in points)</span>
							<main-input type="number" placeholder="Grade" v-model="point" />
							<span class="error"></span>
						</div>
						<div class="input">
							<span class="subtitle">Category of Quiz</span>
							<select name="" id="" class="main-select" v-model="category">
								<option value="" selected disabled hidden>Which category?</option>
								<option value="Math">Math</option>
								<option value="History">History</option>
								<option value="English">English</option>
								<option value="Physics">Physics</option>
							</select>
							<span class="error"></span>
						</div>
						<div class="input">
							<span class="subtitle">Type of Quiz</span>
							<select name="" id="" class="main-select" v-model="quizType">
								<option value="" selected disabled hidden>Which type?</option>
								<option value="Test">Test</option>
								<option value="true-false">True False</option>
							</select>
							<span class="error"></span>
						</div>


					</form>
				</div>
				<div class="right">
					<div class="questions"></div>
					<div class="questions"></div>
					<div class="questions"></div>
					<div class="questions"></div>
					<div class="questions"></div>
					<dark-button @click.prevent="createQuizHandler">Add Question</dark-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();
const authStore = useAuthStore()
const title = ref('');
const time = ref(30);
const point = ref(1);
const category = ref('');
const quizType = ref('')
const image = ref('')


function createQuizHandler() {
	const data = {
		title: title.value,
		time: time.value,
		point: point.value,
		category: category.value,
		quizType: quizType.value,
		user: authStore.user.id,
		image: image.value
	}
	console.log(data)
	router.push('/createquestion')
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 25px;
	margin: 20px 0 10px;
}

.wrapper {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	background-color: #fff;
	padding: 20px;
	border-radius: 10px;
	min-height: 80vh;

	.left {
		flex: 0 0 40%;

		.input {
			.subtitle {
				font-size: 18px;
				font-weight: 500;
			}

			.main-select,
			.main-input {
				width: 100%;
				padding: 10px;
				border-radius: 5px;
				border: 1px solid #8F95A5;
				margin-bottom: 20px;
				background-color: #f2f2f2;
			}
		}
	}

	.right {
		flex: 1 0 50%;

		.questions {
			background-color: grey;
			width: 100%;
			height: 20px;
			margin-bottom: 10px;
		}
	}
}
</style>