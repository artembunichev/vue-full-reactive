import { computed, markRaw, reactive } from '@vue/reactivity'
import { bindMethodsWithNested } from './lib/bind-methods'
import { isObject, objectEntries } from './lib/objects'

type Getter = {
	name: string
	fn: < T >() => T
}

function makeGettersComputed< T extends object >( target: T ) {
	const descriptors = Object.getOwnPropertyDescriptors( Object.getPrototypeOf( target ) )

	const getters = objectEntries( descriptors ).reduce( ( acc, [ k, v ] ) => {
		if ( v.get ) {
			acc.push( { name: k as string, fn: v.get.bind( target ) } )
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

	objectEntries( target ).forEach( ( [ k, v ] ) => {
		if ( isObject( v ) ) {
			target[ k ] = makeGettersComputed( v as unknown as object ) as unknown as T[ keyof T ]
		}
	} )

	return target
}

export function makeReactive< T extends object >( target: T ) {
	return bindMethodsWithNested( makeGettersComputedWithNested( reactive( target ) ) )
}
