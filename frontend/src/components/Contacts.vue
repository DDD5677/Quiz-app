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
				<form class="flex justify-between" action="">
					<input placeholder="Enter Your E-mail" type="text">
					<dark-button>Subscribe</dark-button>
				</form>
			</div>
		</div>

	</section>
</template>

<script setup lang="ts">

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

			input {
				flex: 0 0 60%;
				padding: 20px;
				border-radius: 10px;
				border: 1px solid #8F95A5;

				&::placeholder {
					color: #8F95A5;
					font-family: Poppins;
					font-size: 16px;
					font-style: normal;
					font-weight: 400;
					line-height: normal;
				}
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