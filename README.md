# vue-make-reactive

Extended version of [ @vue/reactivity ]( https://github.com/vuejs/core/tree/main/packages/reactivity ) `reactive` function.

Package provides a single function - `makeReactive`, that adds the following functionality to Vue's `reactive`:

1. Turns all target's getters into Vue's `computed`.
2. *( Optional )* Binds all target's method's `this` to target.

These modifications are **deep** — changes will be applied to all nested objects.

## Installation

```
npm i vue-make-reactive
```

## API

```js
makeReactive< T extends object >( target: T, options?: Options ): T
```

*Note: in fact, `makeReactive` return type is Vue's `UnwrapNestedRefs< T >`, but actually `T` and `UnwrapNestedRefs< T >` are identical types. So, `T` is used solely for convenience.*

### Options

- `autoBind: boolean`

	Bind all target's method's `this` to target.

	Default: `true`

## Usage

With classes:

```js
import { makeReactive } from 'vue-make-reactive'

class CounterStore {

	constructor() {
		// making a reactive class instance
		return makeReactive( this )
	}

	// becomes a reactive value
	value = 0

	// 'this' will always be CounterStore's reactive instance
	inc() {
		this.value++
	}

	// becomes a computed
	get double() {
		return this.value * 2
	}

}

const counterStore = new CounterStore()
```

or with object literals:

```js
import { makeReactive } from 'vue-make-reactive'

const counterStore = makeReactive(
	{
		value: 0,

		inc() {
			this.value++
		},

		get double() {
			return this.value * 2
		}
	}
)
```

## Demo
You can find demo project in `./demo` folder.
