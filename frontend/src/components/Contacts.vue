<template>
	<section class="contacts" id="contacts">
		<div class="container sm:flex justify-between items-center">
			<div class="left">
				<img src="@/assets/images/contacts.svg" alt="">
			</div>
			<div class="right">
				<h3 class="title">Contact Us</h3>
				<p class="text">
					Discover your current English level by taking our free online English test.Sign up to our newsletter for
					learning tips and free resources
				</p>
				<form @click.prevent="sendMessageHandler" class="flex justify-between" action="">
					<main-input type="text" placeholder="Enter Your E-mail" v-model="email" />
					<dark-button :disabled="telegramStore.isLoading">Subscribe</dark-button>
				</form>
			</div>
		</div>

	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTelegramStore } from '../stores/telegramStore'
const telegramStore = useTelegramStore()
const email = ref('')

const sendMessageHandler = () => {
	const data = {
		chat_id: 'customChatId',
		text: email.value
	}
	console.log(data, 'data sended successfully')
	// telegramStore.sendMessage(data).then((res) => {
	// 	email.value = ''
	// })
}
</script>

<style scoped lang="scss">
.contacts {
	padding: 80px 0 50px;

	.left {
		flex: 0 0 40%;

		img {
			width: 100%;
		}
	}

	.right {
		flex: 0 0 55%;

		.title {
			color: #000;
			font-size: 48px;
			font-style: normal;
			font-weight: 600;
			line-height: 80px;
			margin-bottom: 35px;
		}

		.text {
			color: #8F95A5;
			font-size: 20px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			margin-bottom: 50px;
		}

		form {
			gap: 20px;

			.main-input {
				flex: 0 0 60%;
				padding: 20px;
				border-radius: 10px;
			}

			button {
				flex: 0 0 38%;
				font-size: 20px;
				font-weight: 500;
			}
		}
	}

}
</style>