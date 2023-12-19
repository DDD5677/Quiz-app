<template>
	<section class="quiz_play">
		<div class="container">
			<div class="wrapper">
				<h1>Quiz</h1>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quizStore';
import { useRoute } from 'vue-router';
const quizStore = useQuizStore()
const route = useRoute()
const quizId = route.params.id as string
quizStore.getQuizById(quizId).then((res) => {
	console.log(res)
})
</script>

<style scoped></style>