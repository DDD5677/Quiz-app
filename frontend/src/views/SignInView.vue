<template>
	<section class="signinView">
		<div class="container">
			<div class="wrapper">
				<form action="">
					<div class="icon"><i class="fa-regular fa-user"></i></div>
					<h1 class="title">Sign In</h1>
					<div class="input">
						<main-input type="email" placeholder="Email" v-model="email" />
						<span class="error">{{ authStore.errors ? authStore.errors.email : '' }}</span>
					</div>
					<div class="input">
						<div class="relative">
							<main-input :type="passwordType ? 'password' : 'text'" placeholder="Password" v-model="password" />
							<light-button @click.prevent="togglePasswordType" class="absolute right-0 top-0 h-full bg-white">
								<i v-if="passwordType" class="fa-regular fa-eye"></i>
								<i v-else class="fa-regular fa-eye-slash"></i>
							</light-button>
						</div>
						<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
					</div>
					<dark-button :isLoading="isLoading" @click.prevent="loginHandler">Sign In</dark-button>
					<div class="links">
						<span>No account? <RouterLink :to="{ name: 'register' }" class="register"> Create here</RouterLink>
						</span>
						<a href="" class="forgot-password">Forgot password?</a>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter();
const email = ref('');
const password = ref('');
const passwordType = ref(true)
const isLoading = ref(false)
const togglePasswordType = () => {
	passwordType.value = !passwordType.value
}
function loginHandler() {
	isLoading.value = true
	const data = {
		email: email.value,
		password: password.value
	}
	authStore.login(data).then((res => {
		isLoading.value = false
		router.replace('/')
	})).catch((err) => {
		isLoading.value = false
		console.log(err)
	})
}


</script>

<style lang="scss" scoped>
.signinView {
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form {
		width: 420px;
		padding: 30px 50px 40px;
		border-radius: 10px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;

		.icon {
			font-size: 30px;
			text-align: center;
			color: #dfdede;
		}

		.title {
			font-size: 22px;
			font-weight: 500;
			text-align: center;
			margin-bottom: 10px;
		}

		.input {
			width: 100%;

			.main-input {
				width: 100%;
				background-color: #f2f2f2;
				padding: 10px 15px;
			}

			.error {
				color: red;
			}
		}

		.dark-btn {
			width: 150px;
			margin: 20px;
			padding: 10px 16px;
		}

		.links {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #8F95A5;
			font-family: Poppins;
			font-size: 14px;

			a {
				text-decoration: underline;
			}
		}
	}
}

@media(max-width:450px) {
	.signinView {
		form {
			padding: 20px 30px 30px;
		}
	}
}
</style>