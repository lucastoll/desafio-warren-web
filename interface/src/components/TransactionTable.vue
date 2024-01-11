<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as TransactionGateway from '../../coreDist/gateways/transactions/TransactionGateway';
import * as TransactionUseCase from '../../coreDist/usecases/transactions/TransactionUseCases';
import Transaction from '!@/entities/transactions/transactions';

const gateway = new TransactionGateway.ApiTransactionGateway();
const useCase = new TransactionUseCase.default(gateway);

const transactions = ref<Transaction[]>([]);

onMounted(async () => {
    transactions.value = await useCase.get();
});

console.log(transactions.value);
</script>

<template>
    <section class="transactions">
        <h1 class="transactions__heading">
            Transações
        </h1>
        <table class="transactions__table" v-if="transactions.length > 0">
            <thead>
                <th>
                    Título
                </th>
                <th>
                    Descrição
                </th>
                <th>
                    Status
                </th>
                <th>
                    Valor
                </th>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                    <td>{{ transaction.title }}</td>
                    <td>{{ transaction.description }}</td>
                    <td>{{ transaction.status }}</td>
                    <td>{{ transaction.amount }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped lang="less">
@import "../assets/css/variables.less";

.transactions{
    display: flex;
    flex-direction: column;
    padding: 32px 8px;
    height: ~"calc(100vh - 82px)";
    background-color: @secondary;
    box-sizing: border-box;
    overflow-y: scroll;
    @media screen and (min-width: @screen-lg){
        justify-content: flex-start;
        align-items: center;
        padding: 32px 5%;
    }
}

.transactions__heading{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    align-self: center;
}
.transactions__table {
    border-collapse: collapse;
	width: 100%;
    max-width: @screen-xl;
}

.transactions__table td,
.transactions__table th {
	padding: 8px;
    border: 1px solid @primary;
}

.transactions__table tr:nth-child(even) {
	background-color: @secondary;
}

.transactions__table tr{
    transition: opacity 0.1s ease-in-out;
}
.transactions__table tr:hover {
	opacity: 0.5;
}

.transactions__table th {
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	background-color: @primary;
	color: white;
}
</style>
