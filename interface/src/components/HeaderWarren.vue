<template>
	<header class="header">
		<img class="header__logo" src="../assets/images/logo.svg" alt="Warren investimentos" />
	</header>
</template>

<style scoped lang="less">
@import '../assets/css/variables.less';

.header {
	background-color: @primary;
	padding: 16px;
	display: flex;
	justify-content: center;

	@media (min-width: @screen-lg) {
		justify-content: flex-start;
	}
}

.header__logo {
	height: 50px;
}
</style>
