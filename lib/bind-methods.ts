import { isObject, objectEntries, objectKeys } from './objects'

const bindMethods = < T extends object >( target: T ): T => {
	const propNames = Object.getOwnPropertyNames( Object.getPrototypeOf( target ) ) as Array< keyof T >
	const keys = ( objectKeys( target )  ).concat( propNames )

	keys.forEach( ( k ) => {
		const v = target[ k ]
		if ( v instanceof Function ) {
			target[ k ] = v.bind( target )
		}
	} )

	return target
}

export const bindMethodsWithNested = < T extends object >( target: T ) => {
	bindMethods( target )

	objectEntries( target ).forEach( ( [ k, v ] ) => {
		if ( isObject( v ) ) {
			target[ k ] = bindMethods( v as unknown as object ) as unknown as T[keyof T]
		}
	} )

	return target
}
