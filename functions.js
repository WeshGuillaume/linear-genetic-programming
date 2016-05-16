
/*
 * Functions, in our case, represents the operations that can be used by our
 * algorithm to build programs
 *
 * A function definition should include its type { type: number, randomParams, template? (I had a reason to use `templates`, but I forgot it) }
 * and its definition
 *
 * The definition is a javascript function that takes the allowed stacks and the provided parameters
 */

/*
 * This function is a shorthand to create basic functions for our algorithm
 */
export const createOperator = fn => number =>
  Object.assign(({ number }, c) =>
    number.push(fn(parseInt(number.pop()), parseInt(c || number.pop()))),
    {
      type: number,
      templates: [[ number ], [ number, number ]],

      randomParams () {
        return Math.random() > .5 ? [] : [ number.random() ]
      },
    })

/*
 * And these are the basic functions
 */
export const add = createOperator((a, b) => a + b)
export const minus = createOperator((a, b) => a - b)
export const times = createOperator((a, b) => a * b)
export const pow = createOperator((a, b) => Math.pow(a, b))
