<template>
	<div class="active_action">
		<div class="container">
			<div class="wrapper">
				<div class="timer"><span>You have an unfinished test!</span>
					<span class="flex items-center">
						Test finished after
						<CountDown v-if="!actionStore.isLoading && !actionStore.isLoadingActive" :time="+actionStore.time"
							:back-color="'#fff'" :color="'#000'" />
					</span>
				</div>
				<dark-button @click.prevent="goToQuizPlay">Continue</dark-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue"
import { useActionStore } from '@/stores/actionStore';
import { useRouter } from 'vue-router';
const actionStore = useActionStore()
const router = useRouter()
const goToQuizPlay = () => {
	router.push({ path: `/quiz/start/${actionStore.activeAction.id}` })
}
</script>

<style lang="scss" scoped>
.active_action {
	border-radius: 10px;
	margin-bottom: 20px;
	width: 100%;

	.wrapper {
		background-color: #fff;
		border: 2px solid #263238;
		border-top: 5px solid #263238;
		padding: 15px 30px 20px;
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.timer {
			display: flex;
			align-items: center;
			margin-left: 5px;

			.countdown {
				font-size: 18px;
				color: #263238;
			}
		}
	}
}

@media(max-width:720px) {
	.active_action {
		.wrapper {
			padding: 10px 15px;
			font-size: 14px;

			.timer {
				flex-direction: column;
				align-items: start;
			}
		}
	}
}

@media(max-width:420px) {
	.active_action {
		.wrapper {
			flex-direction: column;
		}
	}
}
</style>