<script setup lang="ts">
import { ref } from 'vue';
import * as TransactionGateway from '../../coreDist/gateways/transactions/TransactionGateway';
import * as TransactionUseCase from '../../coreDist/usecases/transactions/TransactionUseCases';

const gateway = new TransactionGateway.ApiTransactionGateway();
const useCase = new TransactionUseCase.default(gateway);

const transactions = ref(useCase.get());

console.log(transactions.value);
</script>