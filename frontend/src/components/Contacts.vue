<template>
	<section class="contacts" id="contacts">
		<div class="container">
			<div class="wrapper flex justify-between items-center">
				<div class="left">
					<img src="@/assets/images/contacts.svg" alt="">
				</div>
				<div class="right">
					<h3 class="title">Contact Us</h3>
					<p class="text">
						Discover your current English level by taking our free online English test.Sign up to our newsletter for
						learning tips and free resources
					</p>
					<form @click.prevent="sendMessageHandler" class="flex justify-between " action="">
						<main-input type="text" placeholder="Enter Your E-mail" v-model="email" />
						<dark-button :disabled="telegramStore.isLoading">Subscribe</dark-button>
					</form>
				</div>
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
	padding: 50px 0;

	.left {
		flex: 0 0 40%;

		img {
			width: 100%;
		}
	}

	.right {
		flex: 1 0 55%;

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
			width: 100%;

			.main-input {
				flex: 0 0 60%;
				padding: 20px;
				border-radius: 10px;
			}

			button {
				flex: 0 0 35%;
				font-size: 20px;
				font-weight: 500;
			}
		}
	}

}

@media(max-width:820px) {
	.contacts {
		.right {
			.title {
				font-size: 40px;
				margin-bottom: 15px;
				line-height: 1.2;
			}

			.text {
				font-size: 18px;
				margin-bottom: 30px;
			}

			form {
				flex-direction: column;

				.main-input {
					margin-right: 0;
					margin-bottom: 10px;
					border-radius: 10px;
					padding: 15px;
				}
			}
		}
	}
}

@media(max-width:610px) {
	.contacts {
		.wrapper {
			flex-direction: column;

			.left {

				img {
					width: 350px;
				}
			}
		}
	}
}


@media(max-width:380px) {
	.contacts {
		.right {
			.title {
				font-size: 35px;
			}

			.text {
				font-size: 16px;
			}
		}
	}
}
</style>