<template>
	<section class="about-us" id="about">
		<div class="container sm:flex items-center justify-between">
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
	padding: 80px 0 50px;

	.left {
		flex: 0 0 50%;

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

		img {
			width: 100%;
		}
	}
}
</style>