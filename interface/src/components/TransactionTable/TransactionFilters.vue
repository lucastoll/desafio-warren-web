<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';

const searchInput = ref<string>('');
const filterValue = ref<string>('none');

const handleInputChange = (event: Event): void => {
	const target = event.target as HTMLInputElement;
	searchInput.value = target.value;
};

const handleSelectChange = (event: Event): void => {
	const target = event.target as HTMLSelectElement;
	filterValue.value = target.value;
};

const emit = defineEmits(['update:searchInput', 'update:filterValue']);

watch(searchInput, () => {
	emit('update:searchInput', searchInput.value);
});
watch(filterValue, () => {
	emit('update:filterValue', filterValue.value);
});
</script>

<template>
	<form class="transactions__filters">
		<input
			class="transactions__filters__searchBar"
			@input="handleInputChange"
			placeholder="Pesquise por título ou descrição"
		/>
		<select class="transactions__filters__selectFilter" @change="handleSelectChange">
			<option value="none">Filtrar</option>
			<option value="date">Data</option>
			<option value="created">Criado</option>
			<option value="processed">Processado</option>
			<option value="processing">Processing</option>
		</select>
	</form>
</template>

<style scoped lang="less">
@import '../../assets/css/variables.less';
.transactions__filters {
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-around;
	align-items: center;
	gap: 16px;
	max-width: @screen-xl;
	margin-bottom: 32px;

	@media screen and (min-width: @screen-lg) {
		gap: 0px;
		flex-direction: row;
	}
}

.transactions__filters__searchBar {
	width: 100%;
	max-width: 300px;
	padding: 8px;
	border: 1px solid @primary;
	border-radius: 4px;
	background-color: @secondary;
	color: @primary;
	font-size: 16px;
	font-weight: bold;
	box-sizing: border-box;
}

.transactions__filters__selectFilter {
	width: 100%;
	max-width: 300px;
	padding: 8px;
	border: 1px solid @primary;
	border-radius: 4px;
	background-color: @secondary;
	color: @primary;
	font-size: 16px;
	font-weight: bold;
	box-sizing: border-box;
}
</style>
