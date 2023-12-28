<template>
	<div class="active_action">
		<div class="container">
			<div class="wrapper">
				<div class="timer"><span>Sizda tugatilmagan test mavjud! Sizda</span>
					<CountDown v-if="!actionStore.isLoading && !actionStore.isLoadingActive" :time="+actionStore.time" />
					<span>vaqt qoldi</span>
				</div>
				<dark-button @click.prevent="goToQuizPlay">Davom etish</dark-button>
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

			.countdown {
				font-size: 18px;
				color: #263238;
			}
		}
	}
}
</style>