<template>
	<div class="navbar">
		<div class="brand">
			<RouterLink :to="{ name: 'create-quiz' }">Easy<span>Quiz</span></RouterLink>
		</div>
		<div class="selects">
			<select name="" id="" class="quiz-type" v-model="questionType" @change="$emit('questionType', questionType)">
				<option value="" selected disabled hidden>Savol turi</option>
				<option value="test">Test</option>
				<option value="fill-in">Bo'sh joyni to'ldirish</option>
			</select>
			<main-input type="number" placeholder="Grade (in points)" v-model="point" @change="$emit('point', point)" />
			<select name="" id="" v-model="category" @change="$emit('category', category)">
				<option value="" selected disabled hidden>Savol qaysi fandan</option>
				<option value="math">Matematika</option>
				<option value="english">Ingliz tili</option>
				<option value="history">Tarix</option>
				<option value="physics">Fizika</option>
			</select>
			<select name="" id="" v-model="difficulty" @change="$emit('difficulty', difficulty)">
				<option value="" selected disabled hidden>Qiyinlik darajasi</option>
				<option value="low">Onson</option>
				<option value="medium">O'rtacha</option>
				<option value="hard">Qiyin</option>
				<option value="expert">Juda qiyin</option>
			</select>
		</div>
		<dark-button @click.prevent="saveQuestionHandler">Save question</dark-button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps({
	saveQuestionHandler: {
		type: Function,
		required: true
	}
})
const questionType = ref('');
const point = ref<number | null>(null);
const difficulty = ref('low')
const category = ref('');

</script>

<style lang="scss" scoped>
.navbar {
	width: 100%;
	background-color: #fff;
	display: flex;
	padding: 10px;
	align-items: center;
	justify-content: space-between;

	.brand {
		font-family: 'Henny Penny', serif;
		font-size: 28px;
		margin: 0 10px;

		span {
			color: #8F95A5;
		}
	}

	.selects {
		display: flex;
		gap: 10px;

		select,
		.main-input {
			padding: 5px;
			border: 2px solid #000;
			border-radius: 5px;
			background-color: #f2f2f2;
		}

		.main-input {
			width: 80px;
		}
	}

}
</style>