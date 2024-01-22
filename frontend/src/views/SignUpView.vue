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
								<span class="error">{{ authStore.errors ? authStore.errors.firstname : '' }}</span>
							</div>
							<div class="input">
								<main-input type="text" placeholder="Lastname" v-model="lastname" />
								<span class="error">{{ authStore.errors ? authStore.errors.lastname : '' }}</span>
							</div>
							<div class="input">
								<main-input type="email" placeholder="Email" v-model="email" />
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
								<div class="relative">
									<main-input :type="passwordType ? 'password' : 'text'" placeholder="Password"
										v-model="password" />
									<span @click.prevent="togglePasswordType" class="eye-btn absolute right-0 top-0 h-full">
										<i v-if="passwordType" class="fa-regular fa-eye"></i>
										<i v-else class="fa-regular fa-eye-slash"></i>
									</span>
								</div>
								<span class="error">{{ authStore.errors ? authStore.errors.password : '' }}</span>
							</div>
							<div class="input">
								<div class="relative">
									<main-input :type="cfmPasswordType ? 'password' : 'text'" placeholder="Confirm password"
										v-model="confirmPassword" />
									<span @click.prevent="togglecfmPasswordType" class="eye-btn absolute right-0 top-0 h-full">
										<i v-if="cfmPasswordType" class="fa-regular fa-eye"></i>
										<i v-else class="fa-regular fa-eye-slash"></i>
									</span>
								</div>
								<span class="error">{{ checkPassword ? '' : 'Password is not match' }}</span>
							</div>
							<dark-button :disabled="!checkPassword" @click.prevent="SignUpHandler">Create</dark-button>
						</div>
					</div>

				</form>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const router = useRouter()
const firstname = ref('')
const lastname = ref('')
const phone = ref('')
const email = ref('')
const role = ref('')
const password = ref('')
const confirmPassword = ref('')
const passwordType = ref(true)
const cfmPasswordType = ref(true)
const togglePasswordType = () => {
	passwordType.value = !passwordType.value
}
const togglecfmPasswordType = () => {
	cfmPasswordType.value = !cfmPasswordType.value
}
const checkPassword = computed(() => {
	return password.value === confirmPassword.value
})

function SignUpHandler() {
	const data = {
		firstname: firstname.value,
		lastname: lastname.value,
		email: email.value,
		password: password.value,
		phone: phone.value,
		role: role.value,
	}
	authStore.register(data).then((res) => {
		router.replace('/login')
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
		margin-bottom: 30px;

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

			div {
				margin-bottom: 20px;

				.main-input {
					margin-bottom: 0;
				}
			}

			.main-input {
				width: 100%;
				background-color: #f2f2f2;
				margin-bottom: 20px;
			}

			.relative {
				.main-input {
					padding-right: 50px;
				}
			}

			.eye-btn {
				display: flex;
				align-items: center;
				width: 50px;
				font-weight: 500;
				padding: 0.4em 1em;
				transition: all 0.3s ease;
				cursor: pointer;
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

@media(max-width:720px) {
	.signinView {
		form {
			padding: 20px 30px 30px;

			.body {
				gap: 15px;
			}
		}
	}
}

@media(max-width:520px) {
	.signinView {
		form {
			.body {
				flex-direction: column;
			}
		}
	}
}

@media(max-width:380px) {
	.signinView {
		form {
			padding: 20px;
		}
	}
}
</style>