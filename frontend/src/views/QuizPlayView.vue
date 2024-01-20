<template>
	<section class="quiz_play">
		<div class="timer bg-slate-900">
			<div class="brand select-none">
				<RouterLink class="text-stone-100 dark:text-stone-100" :to="{ name: 'home' }">Easy<span
						class="text-slate-400">Quiz</span>
				</RouterLink>
			</div>
			<CountDown v-if="!actionStore.isLoading && !actionStore.isLoadingActive && !actionStore.finished"
				:back-color="'#fff'" :color="'#fff'" :time="+actionStore.time" />
			<ToggleTheme />
		</div>
		<div class="container">
			<div class="wrapper bg-white dark:bg-slate-800 text-slate-950 dark:text-stone-200">
				<div v-if="!actionStore.isLoading && actionStore.finished" class="result">
					<h2 class="title">Result</h2>
					<div class="correct_answers">
						<span>Correct answers</span>
						<span>{{ actionStore.action.correctAnswers }}/{{ actionStore.action.quiz.questions.length }}</span>
					</div>
					<div class="score">
						<span>Total point</span>
						<span>{{ actionStore.action.score }} ball</span>
					</div>
				</div>
				<div v-if="!actionStore.isLoading && !actionStore.isLoadingActive" class=" menu">
					<h2 class="title">{{ actionStore.action.quiz.title }}</h2>
					<Question v-for="( question, index ) in  actionStore.action.quiz.questions " :key="index"
						:question="question" :index="index"
						:choosed="actionStore.chooses ? actionStore.chooses[question.id] : undefined" />
					<div v-if="!actionStore.action.finished" class="finish">
						<dark-button @click.prevent="finishHandler">Finish</dark-button>
					</div>
				</div>
				<loader v-else />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue";
import Question from '@/components/Question.vue';
import { useRoute, useRouter } from 'vue-router';
import { useActionStore } from "@/stores/actionStore";
import { onMounted } from "vue";
import ToggleTheme from "@/components/UI/ToggleTheme.vue";
const actionStore = useActionStore()
const route = useRoute()
const router = useRouter()

//get action
const actionId = route.params.id as string
actionStore.getActionById(actionId)

//finish action
const finishHandler = () => {

	const data = {
		actionId: route.params.id,
		firstname: actionStore.action.firstname,
		lastname: actionStore.action.lastname,
		quiz: actionStore.action.quiz.title,
		chooses: actionStore.activeAction.chooses
	}
	if (confirm("Do you really want to finish?")) {
		actionStore.finishAction(data)

	}
}
</script>

<style lang="scss" scoped>
.quiz_play {
	padding-top: 80px;

	.timer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		color: #fff;
		padding: 15px;
		width: 100%;
		top: 0;
		z-index: 999;

		.brand {
			font-family: 'Henny Penny', serif;
			font-size: 28px;
		}

		.countdown {
			color: #000;
			font-size: 25px;
			gap: 10px;

			span {
				color: #fff;
			}
		}
	}

	.result {
		padding: 0px 0 30px;
		font-size: 25px;

		div {
			display: flex;
			justify-content: space-between;
			padding: 10px 30px;
		}
	}

	.container {
		display: flex;
		justify-content: center;
	}

	.wrapper {
		border-radius: 10px;
		width: 80%;
		padding: 20px 0 0;
		margin-bottom: 30px;

		.menu {
			.finish {
				padding: 20px 30px;
				display: flex;
				justify-content: flex-end;

				.dark-btn {
					font-size: 24px;
				}
			}
		}

		.title {
			text-align: center;
			font-size: 28px;
			font-weight: 500;
			text-transform: capitalize;
			border-bottom: 5px solid #f2f2f2;
		}
	}
}

@media(max-width:1100px) {
	.quiz_play {
		.wrapper {
			width: 100%;
		}
	}
}

@media(max-width:480px) {
	.quiz_play {
		.timer {
			padding: 10px;

			.brand {
				font-size: 24px;
			}

			.countdown {
				gap: 5px;
			}
		}

		.wrapper {
			padding-top: 10px;

			.title {
				font-size: 22px;
			}

			.result {
				div {
					padding: 10px;
					font-size: 20px;
				}
			}

			.menu {
				.finish {
					.dark-btn {
						font-size: 20px;
					}
				}
			}
		}
	}
}
</style>