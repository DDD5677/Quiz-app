<template>
	<section class="quizes">
		<div class="container">
			<div class="wrapper bg-white dark:bg-slate-800 text-slate-950 dark:text-slate-100">
				<h1 v-if="!quizStore.isLoading" class="title ">{{ quizStore.quiz.title }}</h1>
				<div class="nav">
					<main-input type="text" placeholder="Search" v-model="search" />
					<div class="selects">
						<select
							class="bg-stone-100 border-slate-900 dark:border-stone-100 dark:bg-slate-700 text-slate-900 dark:text-gray-100"
							name="" id="" v-model="category">
							<option value="" selected disabled hidden>Category</option>
							<option value="">All</option>
							<option value="Math">Matematika</option>
							<option value="English">Ingliz tili</option>
							<option value="History">Tarix</option>
							<option value="Physics">Fizika</option>
						</select>
						<select
							class="bg-stone-100 border-slate-900 dark:border-stone-100 dark:bg-slate-700 text-slate-900 dark:text-gray-100"
							name="" id="" v-model="difficulty">
							<option value="" selected disabled hidden>Qiyinlik darajasi</option>
							<option value="">All</option>
							<option value="1">Onson</option>
							<option value="2">O'rtacha</option>
							<option value="3">Qiyin</option>
						</select>
					</div>
				</div>
				<div v-if="!actionStore.isLoading && !quizStore.isLoading" class="main">
					<table>
						<thead>
							<tr class="quiz bg-stone-100 dark:bg-slate-700">
								<th>User</th>
								<th>
									<span class="sort_btn" @click="sortHandler('lastname')">
										Lastname
										<i v-if="sort === 'lastname' || sort === '-lastname'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th>
									<span class="sort_btn" @click="sortHandler('firstname')">
										Firstname
										<i v-if="sort === 'firstname' || sort === '-firstname'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th>Correct</th>
								<th>
									<span class="sort_btn" @click="sortHandler('score')">
										Score
										<i v-if="sort === 'score' || sort === '-score'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th>
									<span class="sort_btn" @click="sortHandler('createdAt')">
										Start at
										<i v-if="sort === 'createdAt' || sort === '-createdAt'" class="fa fa-arrow-up"
											:class="sort[0] === '-' ? 'rotate' : ''" aria-hidden="true"></i>
									</span>
								</th>
								<th>Finish at</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="action in  actionStore.actionList" :key="action.id" @click.prevent="console.log('click')"
								class="hover:bg-stone-50 dark:hover:bg-slate-600">

								<td>User</td>
								<td>{{ action.lastname }}</td>
								<td>{{ action.firstname }}</td>
								<td>{{ action.correctAnswers }}/{{ quizStore.quiz.questions.length }}</td>
								<td>{{ action.score }}</td>
								<td>{{ formatDate(action.createdAt) }} </td>
								<td>{{ formatDate(action.updatedAt) }} </td>
							</tr>
						</tbody>
					</table>
				</div>
				<loader v-else />
				<Pagination :pageSize="actionStore.pageSize" :page="actionStore.page" :pageLimit="4" :getData="getData" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
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
//Date format
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString(undefined, { hour: 'numeric', minute: '2-digit', year: "numeric", month: "numeric", day: "numeric", })
}
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
// const checkDifficulty = (diff: number) => {
// 	if (diff < 1.5) {
// 		return 'Onson'
// 	} else if (diff < 2.5) {
// 		return "O'rtacha"
// 	} else {
// 		return "Qiyin"
// 	}
// }
const getData = (page: number, limit: number) => {
	const queries = {
		quiz: route.params.id,
		page: page,
		limit: limit,
		search: search.value,
		category: category.value,
		sort: sort.value,
	}
	actionStore.getAction(queries)
	router.push({ replace: true, query: { page: page, limit: limit } })
}
// watch(search, () => {
// 	if (route.query.page && route.query.limit) {
// 		getData(+route.query.page, +route.query.limit)
// 	} else {
// 		getData(1, 10)

// 	}
// })
// watch(category, () => {
// 	if (route.query.page && route.query.limit) {
// 		getData(+route.query.page, +route.query.limit)
// 	} else {
// 		getData(1, 10)

// 	}
// })
// watch(difficulty, () => {
// 	if (route.query.page && route.query.limit) {
// 		getData(+route.query.page, +route.query.limit)
// 	} else {
// 		getData(1, 10)

// 	}
// })
watch(sort, () => {
	if (route.query.page && route.query.limit) {
		getData(+route.query.page, +route.query.limit)
	} else {
		getData(1, 10)
	}
})
const quizId = route.params.id as string
quizStore.getQuizById(quizId)
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
		margin-top: 30px;
		padding: 20px;
		border-radius: 10px;

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
					border: 1px solid;
					border-radius: 5px;
					outline: none;
				}

				.main-input {
					width: 80px;
				}
			}
		}

		.main {
			margin-top: 20px;
			border: 1px solid #f2f2f2;
			border-radius: 7px;

			table {
				width: 100%;
				border-collapse: collapse;
				border-spacing: 0px;

				thead {
					border-radius: 5px;
					position: sticky;
					top: 60px;

					.sort_btn {
						display: flex;
						align-items: center;
						cursor: pointer;
						transition: all 0.3s ease-in-out;

						i {
							margin-left: 5px;
							transition: all 0.3s ease-in;
						}


						.rotate {
							transition: all 0.3s ease-in-out;
							transform: rotate(180deg);
						}
					}



					tr th {
						padding: 15px;
					}

					tr th:first-child {
						border-radius: 7px 0 0 7px;
					}

					tr th:last-child {
						border-radius: 0 7px 7px 0;
					}


				}

				tbody {
					width: 100%;

					tr {
						transition: all 0.3s ease;

						td {
							padding: 10px;
						}

						font-size: 18px;
						border-bottom: 1px solid #f2f2f2;
						text-align: center;
						cursor: pointer;

						&:last-child {
							border: none;
						}
					}
				}
			}



		}
	}

}
</style>