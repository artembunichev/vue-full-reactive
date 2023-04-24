import { inject } from 'vue'
import { makeFullReactive } from '../../../src'

class CounterStore {

	constructor() {
		// making a reactive class instance
		return makeFullReactive( this )
	}

	// becomes a reactive value
	value = 0

	// 'this' will always be CounterStore's reactive instance
	inc() {
		this.value++
	}

	// 'this' will always be CounterStore's reactive instance
	reset() {
		this.value = 0
	}

	// becomes a computed
	get double() {
		console.log( 'double triggers only when counter changes' )
		return this.value * 2
	}

}

export const counterStore = new CounterStore()

export const useCounterStore = (): CounterStore => inject( 'counterStore' ) as CounterStore
