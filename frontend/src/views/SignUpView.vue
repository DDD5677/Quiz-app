<template>
	<section class="signinView">
		<div class="container">
			<div class="wrapper">
				<form action="">
					<div class="icon"><i class="fa-regular fa-user"></i></div>
					<h1 class="title">Create account</h1>
					<div class="body">
						<div class="left">
							<div class="input">
								<main-input type="text" placeholder="Name" v-model="firstname" />
								<span class="error">{{ authStore.errors ? authStore.errors.name : '' }}</span>
							</div>
							<div class="input">
								<main-input type="text" placeholder="Lastname" v-model="lastname" />
								<span class="error">{{ authStore.errors ? authStore.errors.lastname : '' }}</span>
							</div>
							<div class="input">
								<main-input type="text" placeholder="Email" v-model="email" />
								<span class="error">{{ authStore.errors ? authStore.errors.email : '' }}</span>
							</div>
							<div class="input">
								<main-input type="text" placeholder="Phone" v-model="phone" />
								<span class="error">{{ authStore.errors ? authStore.errors.phone : '' }}</span>
							</div>
						</div>
						<div class="right">
							<div class="input">
								<select name="" id="" class="user-role" v-model="role">
									<option value="" selected disabled hidden>Who are you?</option>
									<option value="student">Student</option>
									<option value="teacher">Teacher</option>
								</select>
								<span class="error">{{ authStore.errors ? authStore.errors.role : '' }}</span>
							</div>
							<div class="input">
								<main-input type="text" placeholder="Password" v-model="password" />
								<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
							</div>
							<div class="input">
								<main-input type="text" placeholder="Confirm password" v-model="confirmPassword" />
								<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
							</div>
							<dark-button @click.prevent="SignUpHandler">Create</dark-button>
						</div>
					</div>

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
	//background-color: #f2f2f2;

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form {
		width: 750px;
		padding: 20px 50px 40px;
		border-radius: 10px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;

		.body {
			display: flex;
			justify-content: space-between;
			gap: 20px;
			width: 100%;

			.left,
			.right {
				flex: 1 0 48%;
				display: flex;
				flex-direction: column;
				gap: 5px;
				align-items: flex-end;
			}
		}

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
			position: relative;

			.main-input {
				width: 100%;
				background-color: #f2f2f2;
				padding: 10px 15px;
				margin-bottom: 20px;
			}

			.error {
				width: 100%;
				color: red;
				font-size: 14px;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}

		.user-role {
			width: 100%;
			padding: 10px;
			border-radius: 5px;
			border: 1px solid #8F95A5;
			margin-bottom: 20px;
			background-color: #f2f2f2;
		}

		.dark-btn {
			width: 150px;
			margin-bottom: 20px;
			padding: 10px 16px;
		}
	}
}
</style>