<template>
	<section class="about-us" id="about">
		<div class="container flex items-center justify-between">
			<div class="left">
				<h3 class="title">About Us</h3>
				<p class="text">
					The model offers a framework for discussing problems related to the user's experience, as well as possible
					ways
					and means of solving them. Application development begins at the top level (strategy), where the future
					software product is described quite abstractly from the point of view of the expectations of both users and
					the
					customer.
				</p>
				<div class="info flex justify-between">
					<div class="info-item">
						<span class="amount">800</span>
						<span class="info-title">Pupils</span>
					</div>
					<div class="info-item">
						<span class="amount">18</span>
						<span class="info-title">Teachers</span>
					</div>
					<div class="info-item">
						<span class="amount">6</span>
						<span class="info-title">Foreign languages</span>
					</div>
				</div>
			</div>
			<div class="right">
				<img src="@/assets/images/about.svg" alt="">
			</div>
		</div>

	</section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.about-us {
	padding: 50px 0;

	.left {
		flex: 1 0 50%;

		.title {
			color: #000;
			font-size: 48px;
			font-weight: 600;
			line-height: 60px;
			margin-bottom: 20px;
		}

		.text {
			color: #8F95A5;
			font-size: 20px;
			font-weight: 400;
			line-height: normal;
			margin-bottom: 20px;
		}

		.info {
			text-align: center;

			.info-item {
				flex: 1 0 33%;
			}

			.amount {
				font-size: 48px;
				font-weight: 600;
				line-height: 80px;
				display: block;
			}

			.info-title {
				color: #8F95A5;
				font-size: 20px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}
	}

	.right {
		flex: 0 0 40%;
		margin-left: 25px;

		img {
			width: 100%;
		}
	}
}

@media(max-width:820px) {
	.about-us {
		.left {
			.title {
				font-size: 40px;
				margin-bottom: 15px;
			}

			.text {
				font-size: 18px;
				line-height: 1.5;
				margin-bottom: 0;
			}

			.info {
				.amount {
					font-size: 40px;
				}

				.info-title {
					font-size: 18px;
				}
			}
		}
	}

}

@media(max-width:610px) {
	.about-us {
		.container {
			flex-direction: column-reverse;

			.right {
				margin-left: 0;

				img {
					width: 350px;
				}
			}
		}
	}
}

@media(max-width:380px) {
	.about-us {
		.left {
			.title {
				font-size: 35px;
			}

			.text {
				font-size: 16px;
			}

			.info {
				.amount {
					font-size: 35px;
				}

				.info-title {
					font-size: 16px;
				}
			}
		}
	}
}
</style>