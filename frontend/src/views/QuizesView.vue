<template>
	<section class="quizes">
		<InfoActiveAction v-if="actionStore.activeAction" />
		<div class="container">
			<div class="wrapper">
				<h1 class="title">Quizes</h1>
				<div class="nav">
					<main-input type="text" placeholder="Search" v-model="search" />
					<div class="selects">
						<select name="" id="" v-model="category">
							<option value="" selected disabled hidden>Category</option>
							<option value="">All</option>
							<option value="Math">Matematika</option>
							<option value="English">Ingliz tili</option>
							<option value="History">Tarix</option>
							<option value="Physics">Fizika</option>
						</select>
						<select name="" id="" v-model="difficulty">
							<option value="" selected disabled hidden>Qiyinlik darajasi</option>
							<option value="low">Onson</option>
							<option value="medium">O'rtacha</option>
							<option value="hard">Qiyin</option>
							<option value="expert">Juda qiyin</option>
						</select>
					</div>
				</div>
				<div v-if="!quizStore.isLoading" class="main">
					<table>
						<thead>
							<tr class="quiz">
								<th>Image</th>
								<th>Title</th>
								<th>Difficulty</th>
								<th>Category</th>
								<th>Number of Questions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="quiz in  quizStore.quizList " :key="quiz.id" @click.prevent="goToQuizPlay(quiz.id)">
								<td>
									<div class="img_box">
										<img v-if="quiz.image" :src="quiz.image" alt="" />
									</div>
								</td>
								<td class="quiz_title">{{ quiz.title }}</td>
								<td class="difficulty">Low</td>
								<td class="about">{{ quiz.category }}</td>
								<td class="about">{{ quiz.questions.length }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<Pagination :pageSize="quizStore.pageSize" :page="quizStore.page" :pageLimit="4" :getData="getData" />
				<loader v-if="quizStore.isLoading" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import InfoActiveAction from "@/components/InfoActiveAction.vue";
import Pagination from "@/components/Pagination.vue"
import { useActionStore } from "@/stores/actionStore";
import { useQuizStore } from '@/stores/quizStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const quizStore = useQuizStore()
const actionStore = useActionStore()
const route = useRoute()
const router = useRouter()
const category = ref('')
const search = ref('')
const difficulty = ref('')

const goToQuizPlay = (id: string) => {
	if (!actionStore.activeAction) {
		router.push({ path: `/quiz/${id}` })
		console.log(window.location.origin)
	} else {
		alert('Sizda tugatilmagan test mavjud. Yangi testni boshlash uchun oldin yakunlang!')
	}
}

const getData = (page: number, limit: number) => {
	const queries = {
		page: page,
		limit: limit,
		search: search.value,
		category: category.value
	}
	quizStore.getQuiz(queries)
	router.push({ path: '/quizes', replace: true, query: queries })
}
watch(search, () => {
	if (route.query.page && route.query.limit) {
		getData(+route.query.page, +route.query.limit)
	} else {
		getData(1, 10)

	}
})
watch(category, () => {
	if (route.query.page && route.query.limit) {
		getData(+route.query.page, +route.query.limit)
	} else {
		getData(1, 10)

	}
})
onMounted(() => {
	if (route.query.page && route.query.limit) {
		getData(+route.query.page, +route.query.limit)
	} else {
		getData(1, 10)
	}
})
</script>

<style lang="scss" scoped>
.quizes {
	padding-bottom: 50px;


	.wrapper {
		padding: 20px;
		border-radius: 10px;
		background-color: #fff;

		.title {
			font-size: 28px;
			font-weight: 500;
			margin-bottom: 10px;
		}

		.nav {
			display: flex;
			justify-content: space-between;

			.selects {
				display: flex;
				gap: 10px;

				select,
				.main-input {
					padding: 5px;
					border: 2px solid #000;
					border-radius: 5px;
					background-color: #f2f2f2;
				}

				.main-input {
					width: 80px;
				}
			}
		}

		.main {
			margin-top: 20px;
			border: 2px solid #f2f2f2;
			border-radius: 12px;

			table {
				width: 100%;
				border-collapse: collapse;
				border-spacing: 0px;

				thead {
					border-radius: 10px 10px 0 0;
					position: sticky;
					top: 60px;

					tr th {
						background-color: #f2f2f2;
						padding: 15px;
					}

					tr th:first-child {
						border-radius: 10px 0 0 0;
					}

					tr th:last-child {
						border-radius: 0 10px 0 0;
					}


				}

				tbody {
					width: 100%;

					tr {
						padding: 10px;
						border-bottom: 2px solid #f2f2f2;
						text-align: center;
						cursor: pointer;

						&:last-child {
							border: none;
						}

						&:hover {
							background-color: #f2f2f27c;
						}

						.img_box {
							width: 100px;
							min-height: 50px;
							margin: 5px;
							background: url('../assets/images/card__bg.svg') no-repeat center;
							background-size: contain;

							img {
								border-radius: 5px;
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}



		}
	}

}
</style>