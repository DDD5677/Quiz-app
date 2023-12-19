<template>
	<section class="pt-16" id="home">
		<div class="container sm:flex justify-between items-center">
			<div class="left py-8">
				<h2 class="title">EasyQuiz Makes It Very Easy </h2>
				<img class="light-icon" src="@/assets/images/light.svg" alt="">
				<p class="subtitle">
					With our teachers who write a program for
					each student, you will be able to make your
					first sketch after the first lesson.
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
	router.push({ path: '/quizes', query: { page: 1, limit: 10 } })
}
</script>

<style scoped lang="scss">
.left {
	position: relative;
	flex: 0 0 50%;

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
</style>