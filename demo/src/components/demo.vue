<script setup lang='ts'>

	import ActionButton from './action-button.vue'
	import { useCounterStore } from '../store/counter-store'

	const counterStore = useCounterStore()

	const logDouble = () => {
		console.log( 'get double from cache', counterStore.double )
	}

</script>

<template>

	<div class='demo-container'>

		<div class='demo-block'>

			<div class='values'>
				<span>
					counter = {{ counterStore.value }}
				</span>
				<span> -> </span>
				<span>
					double = {{ counterStore.double }}
				</span>
			</div>

			<div class='action-buttons'>

				<div class='button-row'>
					<ActionButton class='action-button' @click='counterStore.inc'>+</ActionButton>
					<ActionButton class='action-button' @click='counterStore.reset'>0</ActionButton>
				</div>

				<div class='button-row'>
					<ActionButton @click='logDouble'>read double ( check console )</ActionButton>
				</div>

			</div>

		</div>
	</div>

</template>

<style scoped>

	.demo-container {
		width: 100%;
		display: inline-flex;
		justify-content: center;
		padding: 16px 0;
	}

	.demo-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 15px 30px;
		background-color: #ffffff;
		border-radius: 7px;
	}

	.values {
		font-size: 28px;
		color: #000000;
	}

	.action-buttons {
		width: 100%;
		margin-top: 15px;
	}

	.button-row {
		width: 100%;
		display: flex;
		margin-bottom: 15px;
	}

	.button-row:last-child {
		margin-bottom: 0;
	}

	.action-button {
		width: 100%;
		margin: 0 7px;
	}

</style>
