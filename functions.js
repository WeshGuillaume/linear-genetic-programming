
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

export const add = createOperator((a, b) => a + b)
export const minus = createOperator((a, b) => a - b)
export const times = createOperator((a, b) => a * b)
export const pow = createOperator((a, b) => Math.pow(a, b))
