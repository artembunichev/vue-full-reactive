export function isObject( target: any ) {
	return typeof target === 'object' && target !== null && !Array.isArray( target )
}

export type Entries< T > = Array< [ keyof T, T[ keyof T ] ] >
