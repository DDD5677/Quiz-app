<template>
	<div class="countdown">
		<div class="hour">{{ hours % 24 }}</div>
		<span>:</span>
		<div class="minut">{{ minutes % 60 }}</div>
		<span>:</span>
		<div class="second">{{ seconds % 60 }}</div>
	</div>
</template>

<script setup lang="ts">
import { useActionStore } from '@/stores/actionStore';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const props = defineProps<{ time: number, backColor: string, color: string }>()
const actionStore = useActionStore()
const router = useRouter()
//variables
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const launchDate = ref<number | null>(null)

if (!actionStore.finished) {
	let countDown = setInterval(() => {
		const currDate = Date.now()
		if (launchDate.value) {
			const launchTime = launchDate.value - currDate
			if (launchTime > 0) {
				seconds.value = Math.floor(launchTime / 1000)
				minutes.value = Math.floor(launchTime / (60 * 1000))
				hours.value = Math.floor(launchTime / (60 * 60 * 1000))
			} else if (!actionStore.finished) {
				clearInterval(countDown)
				const data = {
					actionId: actionStore.activeAction.id,
					firstname: actionStore.action.firstname,
					lastname: actionStore.action.lastname,
					quiz: actionStore.action.quiz.title,
					chooses: actionStore.chooses
				}
				actionStore.finishAction(data).then((res: any) => {
					router.push({ path: `/quiz/start/${res.id}` })
				})
			}
		}
	}, 1000)
}

onMounted(() => {
	const created = Date.parse(actionStore.created) + props.time * 60 * 1000
	console.log('created', created)
	launchDate.value = created
})
</script>

<style lang="scss" scoped>
.countdown {
	display: flex;
	align-items: center;

	div {
		padding: 5px 15px;
		background-color: v-bind(backColor);
		border-radius: 5px;
	}

	span {
		font-weight: 700;
		color: v-bind(color);
	}
}

@media(max-width:480px) {
	.countdown {
		div {
			font-size: 16px;
			padding: 4px 7px;
			font-weight: 700;
		}

		span {
			font-weight: 500;
		}
	}
}
</style>