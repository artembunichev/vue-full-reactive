export class NestedCounter {

	value = 90

	dec() {
		this.value --
	}

	get half() {
		console.log( 'trigger half' )
		return Math.floor( this.value / 2 )
	}

}
