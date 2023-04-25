<script setup lang='ts'>

	import ActionButton from './action-button.vue'
	import { useCounterStore } from '../store/counter-store'

	const counterStore = useCounterStore()

	const logDouble = () => {
		console.log( 'get double from cache', counterStore.double )
	}

	const logHalf = () => {
		console.log( 'get half from cache', counterStore.nestedCounter.half )
	}

</script>

<template>

	<div class='demo-container'>

		<div class='demo-block'>

			<div class='demo-part'>

				<div class='demo-subtitle'>
					counter
				</div>

				<div class='values'>
					<span>
						counter = {{ counterStore.value }}
					</span>
					<span> -> </span>
					<span>
						double = {{ counterStore.double }}
					</span>
				</div>

				<div class='button-row'>
					<ActionButton class='action-button' @click='counterStore.inc'>+</ActionButton>
					<ActionButton class='action-button' @click='counterStore.reset'>0</ActionButton>
				</div>

				<div class='button-row'>
					<ActionButton @click='logDouble'>read double ( check console )</ActionButton>
				</div>

			</div>

			<div class='demo-part'>

				<div class='demo-subtitle'>
					nested counter
				</div>

				<div class='values'>
					<span>
						counter = {{ counterStore.nestedCounter.value }}
					</span>
					<span> -> </span>
					<span>
						half = {{ counterStore.nestedCounter.half }}
					</span>
				</div>

				<div class='button-row'>
					<ActionButton @click='counterStore.nestedCounter.dec'>-</ActionButton>
				</div>

				<div class='button-row'>
					<ActionButton @click='logHalf'>log half ( check console )</ActionButton>
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

	.demo-part {
		padding: 12px 0;
		border-bottom: 3px solid #000000;
	}

	.demo-part:first-child {
		padding-top: 0;
	}

	.demo-part:last-child {
		padding-bottom: 0;
	}

	.demo-part:last-child {
		border-bottom: none;
	}

	.demo-subtitle {
		font-size: 32px;
		font-style: italic;
		text-align: center;
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
		margin: 15px 0;
	}

	.button-row:last-child {
		margin-bottom: 0;
	}

	.action-button {
		width: 100%;
		margin: 0 7px;
	}

</style>
