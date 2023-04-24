import { Entries, isObject } from './objects'

function bindMethods< T extends object >( target: T ) {
	const propNames = Object.getOwnPropertyNames( Object.getPrototypeOf( target ) ) as Array< keyof T >
	const keys = ( ( Object.keys( target ) as Array< keyof T > ) ).concat( propNames )

	keys.forEach( ( k ) => {
		const v = target[ k ]
		if ( v instanceof Function ) {
			target[ k ] = v.bind( target )
		}
	} )

	return target
}

export function bindMethodsWithNested< T extends object >( target: T ) {
	bindMethods( target )

	;( Object.entries( target ) as Entries< T > ).forEach( ( [ k, v ] ) => {
		if ( isObject( v ) ) {
			target[ k ] = bindMethods( v as unknown as object ) as unknown as T[keyof T]
		}
	} )

	return target
}
