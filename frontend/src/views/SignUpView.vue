<template>
	<section class="signinView">
		<div class="container">
			<div class="wrapper">
				<form action="">
					<div class="icon"><i class="fa-regular fa-user"></i></div>
					<h1 class="title">Create account</h1>
					<main-input type="text" placeholder="Name" v-model="firstname" />
					<main-input type="text" placeholder="Lastname" v-model="lastname" />
					<main-input type="text" placeholder="Email" v-model="email" />
					<main-input type="text" placeholder="Phone" v-model="phone" />
					<select name="" id="" class="user-role" v-model="role">
						<option value="" selected disabled hidden>Who are you?</option>
						<option value="student">Student</option>
						<option value="teacher">Teacher</option>
					</select>
					<main-input type="text" placeholder="Password" v-model="password" />
					<main-input type="text" placeholder="Confirm password" v-model="confirmPassword" />
					<dark-button @click.prevent="SignUpHandler">Sign In</dark-button>
				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()

const firstname = ref('')
const lastname = ref('')
const phone = ref('')
const email = ref('')
const role = ref('')
const password = ref('')
const confirmPassword = ref('')

function SignUpHandler() {
	const data = {
		firstname: firstname.value,
		lastname: lastname.value,
		email: email.value,
		password: password.value,
		phone: phone.value,
		role: role.value,
	}
	console.log(data)
	authStore.register(data).then((res) => {
		console.log(res)
	})
}
</script>

<style lang="scss" scoped>
.signinView {
	padding-top: 80px;
	min-height: 100vh;
	background-color: #f2f2f2;

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form {
		width: 450px;
		padding: 20px 50px 15px;
		border-radius: 10px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;

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

		.main-input {
			width: 100%;
			margin-bottom: 10px;
			background-color: #f2f2f2;
			padding: 10px 15px;
		}

		.user-role {
			width: 100%;
			padding: 10px;
			border-radius: 5px;
			border: 1px solid #8F95A5;

			background-color: #f2f2f2;
		}

		.dark-btn {
			width: 150px;
			margin-bottom: 10px;
		}
	}
}
</style>