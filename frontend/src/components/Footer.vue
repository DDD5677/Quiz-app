<template>
	<footer class="footer">
		<div class="container ">
			<ul class="menu flex gap-4 items-center">
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

@media(max-width:820px) {
	.footer {
		.container {
			padding: 25px 10px;
		}

		.menu {
			.item {
				text-align: center;
				margin: 0 10px;
				font-size: 18px;
				line-height: 1.4;
			}
		}
	}
}

@media(max-width:480px) {
	.footer {
		.container {
			padding: 20px 10px;
		}

		.menu {
			justify-content: space-between;
			gap: 0;

			.item {
				font-size: 12px;
			}
		}
	}
}
</style>