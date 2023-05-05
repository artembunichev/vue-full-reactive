import { computed, markRaw, reactive } from '@vue/reactivity'
import { bindMethodsWithNested } from './lib/bind-methods'
import { Entries, isObject } from './lib/objects'

function makeGettersComputed< T extends object >( target: T ) {
	const descriptors = Object.getOwnPropertyDescriptors( Object.getPrototypeOf( target ) )

	Object.entries( descriptors ).forEach( ( [ k, v ] ) => {
		if ( v.get ) {
			Object.defineProperty( target, k, {
				value: markRaw( computed( v.get.bind( target ) ) ),
				configurable: true,
				writable: false,
			} )
		}
	} )

	return target
}

function makeGettersComputedWithNested< T extends object >( target: T ) {
	makeGettersComputed( target )

	;( Object.entries( target ) as Entries< T > ).forEach( ( [ k, v ] ) => {
		if ( isObject( v ) ) {
			target[ k ] = makeGettersComputed( v as unknown as object ) as unknown as T[ keyof T ]
		}
	} )

	return target
}

export type MakeFullReactiveOptions = {
	autoBind?: boolean
}
export function makeFullReactive< T extends object >( target: T, options?: MakeFullReactiveOptions ): T {
	const fullReactive = makeGettersComputedWithNested( reactive( target ) ) as T

	const { autoBind = true } = options ?? {}

	if ( autoBind ) {
		return bindMethodsWithNested( fullReactive )
	}

	return fullReactive
}
