import { computed, markRaw, reactive } from '@vue/reactivity'
import { bindMethodsWithNested } from './lib/bind-methods'
import { Entries, isObject } from './lib/objects'

type Getter = {
	name: string
	fn: < T >() => T
}

function makeGettersComputed< T extends object >( target: T ) {
	const descriptors = Object.getOwnPropertyDescriptors( Object.getPrototypeOf( target ) )

	const getters = Object.entries( descriptors ).reduce( ( acc, [ k, v ] ) => {
		if ( v.get ) {
			acc.push( { name: k, fn: v.get.bind( target ) } )
		}
		return acc
	}, [] as Array< Getter > )

	getters.forEach( ( getter ) => {
		Object.defineProperty( target, getter.name, {
			value: markRaw( computed( getter.fn ) ),
			configurable: true,
			writable: false,
		} )
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
