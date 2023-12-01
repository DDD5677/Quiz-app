<template>
	<footer class="footer">
		<div class="container flex justify-between items-center">
			<div class="brand">Easy<span>Quiz</span></div>
			<ul class="menu flex">
				<li class="item"><a href="#" class="link">Terms and Conditions</a></li>
				<li class="item"><a href="#" class="link">Privacy Policy</a></li>
				<li class="item"><a href="#" class="link">Cookie Policy</a></li>
			</ul>
		</div>

	</footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.footer {
	.container {
		border-top: 1px solid #C4C4C4;
		padding: 35px 0 50px;
	}

	.brand {
		font-family: 'Henny Penny', serif;
		font-size: 22px;

		span {
			color: #8F95A5;
		}
	}

	.menu {
		.item {
			margin: 0 20px;
			color: #8F95A5;
			font-size: 20px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}
}
</style>