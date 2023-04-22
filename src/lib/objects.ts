export function isObject( target: any ) {
	return typeof target === 'object' && target !== null && !Array.isArray( target )
}

export function objectKeys< T extends object >( obj: T ) {
	return Object.keys( obj ) as Array< keyof T >
}

export function objectEntries< T extends object >( obj: T ) {
	return Object.entries( obj ) as Array< [ keyof T, T[ keyof T ] ] >
}
