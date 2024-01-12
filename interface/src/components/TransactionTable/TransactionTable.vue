<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted } from 'vue';
import * as TransactionGateway from '../../../coreDist/gateways/transactions/TransactionGateway';
import * as TransactionUseCase from '../../../coreDist/usecases/transactions/TransactionUseCases';
import Transaction from '!@/entities/transactions/transactions';
import TransactionFilters from './TransactionFilters.vue';

const gateway = new TransactionGateway.ApiTransactionGateway();
const useCase = new TransactionUseCase.default(gateway);

const originalTransactions = ref<Transaction[]>([]);
const transactions = ref<Transaction[]>([]);
const searchInput = ref<string>('');
const filterValue = ref<string>('none');
const showModal = ref<boolean>(false);
const modalTransaction = ref<Transaction | null>(null);

const applyFilters = (): void => {
	let filteredTransactions = originalTransactions.value as Transaction[];
	if (searchInput.value) {
		filteredTransactions = useCase.search(filteredTransactions, searchInput.value);
	}
	if (filterValue.value !== 'none') {
		filteredTransactions = useCase.filter(filteredTransactions, filterValue.value);
	}
	transactions.value = filteredTransactions;
};

watch(searchInput, applyFilters);
watch(filterValue, applyFilters);

let progressValue = computed(() => {
	if (modalTransaction.value) {
		switch (modalTransaction.value.status) {
			case 'created':
				return 5;
			case 'processing':
				return 50;
			case 'processed':
				return 100;
			default:
				return 0;
		}
	}
	return 0;
});

onMounted(async () => {
	originalTransactions.value = await useCase.get();
	transactions.value = originalTransactions.value;
});

const handleModal = (transaction: Transaction): void => {
	modalTransaction.value = transaction;
	showModal.value = true;
};

let escListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
        showModal.value = false;
    }
};

watch(showModal, (newVal) => {
    if (newVal) {
        window.addEventListener('keydown', escListener);
    } else {
        window.removeEventListener('keydown', escListener);
    }
});

onUnmounted(() => {
    window.removeEventListener('keydown', escListener);
});
</script>

<template>
	<section class="transactions">
		<h1 class="transactions__heading">Transações</h1>
		<TransactionFilters
			:searchInput="searchInput"
			:filterValue="filterValue"
			@update:searchInput="searchInput = $event"
			@update:filterValue="filterValue = $event"
		/>
		<table class="transactions__table" v-if="transactions.length > 0">
			<thead>
				<th>Título</th>
				<th>Descrição</th>
				<th>Status</th>
				<th>Valor</th>
				<th>Data</th>
			</thead>
			<tbody>
				<tr
					v-for="transaction in transactions"
					:key="transaction.id"
					@click="handleModal(transaction as Transaction)"
				>
					<td>{{ transaction.title }}</td>
					<td>{{ transaction.description }}</td>
					<td>{{ transaction.status }}</td>
					<td>{{ transaction.amount }}</td>
					<td>{{ transaction.date }}</td>
				</tr>
			</tbody>
		</table>
		<div class="transactions__overlay" tabindex="999" v-if="showModal" @click="showModal = false" @keydown.esc="showModal = false">
			<div
				class="transactions__overlay__modal"
				v-if="showModal && modalTransaction"
				tabindex="-1"
				role="dialog"
				aria-modal="true"
				@click.stop
				@click="showModal = true"
			>
				<h2 class="transactions__overlay__modal__title">{{ modalTransaction.title }}</h2>
				<div class="transactions__overlay__modal__statusBar">
					<progress
						class="transactions__overlay__modal__statusBar__progress"
						id="status-progress"
						:value="progressValue"
						max="100"
						aria-labelledby="status-label"
					></progress>
					<label
						class="transactions__overlay__modal__statusBar__label"
						id="status-label"
						for="status-progress"
					>
						<span>Criada</span><span>Processando</span><span>Concluída</span>
					</label>
				</div>
				<h3 class="transactions__overlay__modal__fromTo">Transferindo de</h3>
				<div class="transactions__overlay__modal__amountInformations">
					<span>{{ modalTransaction.from }}</span>
					<span>{{ modalTransaction.amount }}</span>
				</div>
				<h3 class="transactions__overlay__modal__fromTo">Para</h3>
				<div class="transactions__overlay__modal__amountInformations">
					<span>{{ modalTransaction.to }}</span>
					<span>{{ modalTransaction.amount }}</span>
				</div>
				<button class="transactions__overlay__modal__button" @click.stop @click="showModal = false">X</button>
			</div>
		</div>
	</section>
</template>

<style scoped lang="less">
@import '../../assets/css/variables.less';

.transactions {
	display: flex;
	flex-direction: column;
	padding: 32px 8px;
	height: ~'calc(100vh - 82px)';
	background-color: @secondary;
	box-sizing: border-box;
	overflow-y: scroll;
	@media screen and (min-width: @screen-lg) {
		justify-content: flex-start;
		align-items: center;
		padding: 32px 5%;
	}
}

.transactions__overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 1;
}

.transactions__overlay__modal {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: @secondary;
	position: relative;
	z-index: 999;
	box-shadow:
		0 19px 38px rgb(0 0 0 / 12%),
		0 15px 12px rgb(0 0 0 / 22%);
	width: 80%;
	max-width: 500px;
	gap: 16px;
	padding: 16px;
	position: relative;
	border: 2px solid @primary;
}

.transactions__overlay__modal__title {
	font-size: 18px;
	font-weight: bold;
	color: @primary;
	margin-bottom: 16px;
}

.transactions__overlay__modal__statusBar {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.transactions__overlay__modal__statusBar__progress {
	width: 100%;
	height: 20px;
	border: none;
	border-radius: 4px;
	background: @secondary;
	color: @primary;
	font-size: 16px;
	font-weight: bold;
	box-sizing: border-box;
	border: 1px solid @primary;
	border-radius: 8px;

	&::-webkit-progress-bar {
		background-color: @secondary !important;
		border-radius: 8px;
	}

	&::-webkit-progress-value {
		background-color: @primary !important;
		border-radius: 8px;
	}
}

.transactions__overlay__modal__statusBar__label {
	display: flex;
	justify-content: space-between;
	font-size: 12px;
	font-weight: bold;
	color: @primary;
	margin-top: 8px;
}

.transactions__overlay__modal__button {
	position: absolute;
	top: 8px;
	right: 8px;
	width: 32px;
	height: 32px;
	border: none;
	border-radius: 50%;
	background-color: @primary;
	color: @secondary;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
}

.transactions__overlay__modal__amountInformations {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	color: @primary;
	font-weight: bold;
}

.transactions__overlay__modal__fromTo {
	font-size: 18px;
	font-weight: bold;
	color: @primary;
	margin-bottom: 16px;
	text-align: left;
	position: relative;
	width: 100%;

	&::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background: @primary;
		top: 25px;
		left: 0;
	}
}

.transactions__heading {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 16px;
	align-self: center;
	color: @primary;
}

.transactions__table {
	border-collapse: collapse;
	width: 100%;
	max-width: @screen-xl;
	table-layout: fixed;
}

.transactions__table td {
	white-space: wrap;
	word-break: break-word; /* Add this line */
	overflow-wrap: break-word;
	text-align: center;
}
.transactions__table td,
.transactions__table th {
	max-width: 15%;
	padding: 4px;
	font-size: 14px;
	border: 1px solid @primary;
}

.transactions__table tr:nth-child(even) {
	background-color: @secondary;
}

.transactions__table tr {
	transition: opacity 0.1s ease-in-out;
}
.transactions__table tr:hover {
	opacity: 0.5;
}

.transactions__table th {
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: center;
	background-color: @primary;
	color: white;
	max-width: 15%;
}
</style>
