<script setup lang='ts'>

	const emit = defineEmits( [ 'click' ] )

</script>

<template>

	<button class='action-button' @click="emit( 'click' )">
		<slot />
	</button>

</template>

<style scoped>

	.action-button {
		padding: 10px;
		font-size: 25px;
		background-color: #42b883;
		color: #ffffff;
		border-radius: 7px;
	}

</style>
