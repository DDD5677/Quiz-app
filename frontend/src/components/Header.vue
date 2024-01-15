<template>
	<section id="home">
		<div class="container flex justify-between items-center">
			<div class="left py-8">
				<h2 class="title">EasyQuiz Makes It Very Easy </h2>
				<img class="light-icon" src="@/assets/images/light.svg" alt="">
				<p class="subtitle">
					Tired of printing tests and checking results over and over again? Sign up for EasyQuiz today and experience
					the joy of creating quizzes without the complexity!
				</p>
				<dark-button @click.prevent="goToQuizes">Get started</dark-button>
			</div>
			<div class="right py-8">
				<img src="@/assets/images/test.svg" alt="">
			</div>
		</div>

	</section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter();
function goToQuizes() {
	router.push({ path: '/quizes', replace: true, query: { page: 1, limit: 10 } })
}
</script>

<style scoped lang="scss">
.left {
	position: relative;
	flex: 1 0 50%;

	.light-icon {
		position: absolute;
		right: -20px;
		top: 30%;
		width: 85px;
		height: 85px;
	}

	.title {
		color: #000;
		font-size: 64px;
		font-style: normal;
		font-weight: 600;
		line-height: 80px;
		width: calc(100% - 50px);
		margin-bottom: 40px;


	}

	.subtitle {
		color: #8F95A5;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 20px;
	}

	.dark-btn {
		margin-top: 25px;
		font-size: 36px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
}

.right {
	flex: 0 0 45%;

	img {
		width: 100%;
	}
}




@media(max-width:1100px) {
	.left {
		.title {
			font-size: 50px;
			line-height: 1.5;
		}

		.subtitle {
			font-size: 20px;
		}

		.dark-btn {
			font-size: 28px;
		}

	}
}

@media(max-width:820px) {
	.left {
		.title {
			font-size: 40px;
			line-height: 1.3;
		}

		.subtitle {
			font-size: 18px;
		}

		.dark-btn {
			margin-top: 0;
		}
	}
}

@media(max-width:610px) {
	.container {
		flex-direction: column-reverse;

	}

	.left {
		padding: 0;

		.light-icon {
			top: -300px;
			right: 0;
		}

		.title {
			margin-bottom: 15px;
		}
	}

	.right {
		padding: 0;
	}
}

@media(max-width:380px) {
	.left {

		.title {
			font-size: 35px;
			line-height: 1.2;
		}

		.subtitle {
			font-size: 16px;
			line-height: 1.2;
		}
	}
}
</style>