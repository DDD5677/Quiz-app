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
						At EasyQuiz, we strive to provide you with the best experience possible. Your satisfaction is
						our top priority. If you're experiencing any issues, have questions, or need assistance, our dedicated
						support team is ready to help.
					</p>
					<form @submit.prevent="sendMessageHandler" action="">
						<textarea placeholder="Enter Your Problem" v-model="problem"></textarea>
						<dark-button :isLoading="settingStore.msgLoading">Send</dark-button>
					</form>
				</div>
			</div>
		</div>


	</section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useSettingStore } from '@/stores/settingStore';
import { ref } from 'vue';
const authStore = useAuthStore()
const settingStore = useSettingStore()
const problem = ref('')

const sendMessageHandler = () => {
	const data = {
		user: authStore.user.id,
		msg: problem.value,
	}
	settingStore.sendMessage(data).then(() => {
		problem.value = ''
	})
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
			line-height: 1.3;
			margin-bottom: 10px;
		}

		.text {
			color: #8F95A5;
			font-size: 20px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			margin-bottom: 20px;
		}

		form {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			width: 100%;
			gap: 10px;

			textarea {
				width: 100%;
				height: 100px;
				font-size: 18px;
				resize: none;
				padding: 10px;
				border-radius: 5px;
				border: 1px solid;
			}

			button {
				width: 130px;
				font-size: 18px;
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
				line-height: 1.3;
				margin-bottom: 20px;
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

			.right {
				form {
					textarea {
						font-size: 16px;
					}
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