<template>
	<section class="quizes">
		<InfoActiveAction v-if="actionStore.activeAction" />
		<div class="container">
			<div class="wrapper">
				<h1 class="title">Quizzes</h1>
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
							<option value="" selected disabled hidden>Difficulty</option>
							<option value="">All</option>
							<option value="1">Low</option>
							<option value="2">Medium</option>
							<option value="3">High</option>
						</select>
					</div>
				</div>
				<div v-if="!quizStore.isLoading" class="main">
					<table>
						<thead>
							<tr class="quiz">
								<th>Image</th>
								<th>
									<span class="sort_btn" @click="sortHandler('title')">
										Title
										<i v-if="sort === 'title' || sort === '-title'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
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
								<td class="difficulty">{{ checkDifficulty(quiz.difficulty) }}</td>
								<td class="about">{{ quiz.category }}</td>
								<td class="about">{{ quiz.questions.length }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<loader v-else />
				<Pagination :pageSize="quizStore.pageSize" :page="quizStore.page" :pageLimit="2" :getData="getData" />
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
const sort = ref<string | null>(null)

const sortHandler = (item: string) => {
	if (sort.value === item) {
		if (sort.value[0] === '-') {
			sort.value = sort.value.substring(1)
		} else {
			sort.value = '-' + sort.value
		}
	} else {
		sort.value = item
	}
}
const goToQuizPlay = (id: string) => {
	if (!actionStore.activeAction) {
		router.push({ path: `/quiz/${id}` })
	} else {
		alert('Sizda tugatilmagan test mavjud. Yangi testni boshlash uchun oldin yakunlang!')
	}
}
const checkDifficulty = (diff: number) => {
	if (diff < 1.5) {
		return 'Onson'
	} else if (diff < 2.5) {
		return "O'rtacha"
	} else {
		return "Qiyin"
	}
}
const getData = (page: number, limit: number) => {
	const queries = {
		page: page,
		limit: limit,
		search: search.value,
		category: category.value,
		sort: sort.value,
		min_difficulty: '' as string | number,
		max_difficulty: '' as string | number,
	}
	if (difficulty.value) {
		queries.min_difficulty = +difficulty.value - 0.5
		queries.max_difficulty = +difficulty.value + 0.5
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
watch(difficulty, () => {
	if (route.query.page && route.query.limit) {
		getData(+route.query.page, +route.query.limit)
	} else {
		getData(1, 10)

	}
})
watch(sort, () => {
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

					.sort_btn {
						cursor: pointer;
						transition: all 0.3s ease-in-out;

						i {
							transition: all 0.3s ease-in;
						}

						&:hover {
							color: #000;
						}

						.rotate {
							transition: all 0.3s ease-in-out;
							transform: rotate(180deg);
						}
					}

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

@media(max-width:1100px) {
	.quizes {
		.wrapper {
			.main {
				overflow-x: auto;

				table {
					min-width: 900px;
				}

			}
		}
	}
}

@media(max-width:610px) {
	.quizes {
		.wrapper {
			.nav {
				flex-direction: column;
				gap: 10px;

				.selects {
					justify-content: space-between;

					select {
						flex: 1 0 45%;
					}
				}
			}
		}
	}
}

@media(max-width:480px) {
	.quizes {
		.wrapper {
			.main {
				table {
					tbody {
						tr {
							.img_box {
								width: 80px;
								margin-right: 0;
								min-height: 40px;
							}
						}
					}
				}
			}
		}
	}
}

@media(max-width:380px) {
	.quizes {
		.wrapper {
			.title {
				font-size: 24px;
			}

			.nav {
				.selects {
					flex-direction: column;
				}
			}
		}
	}
}
</style>