
import { add, minus, times, pow } from './functions'
import { number } from './stack'

const randomFunction = (functions, stacks) => {

  if (Math.random() > .5) {
    const keys = Object.keys(stacks)
    const random = keys[Math.floor(Math.random() * keys.length)]
    return [ random, stacks[random].random() ]
  }

  const names = Object.keys(functions)
  const random = names[Math.floor(Math.random() * names.length)]
  return [ random, ...functions[random].randomParams() ]
}

const randomInstructions = (functions, stacks) => {
   return randomFunction(functions, stacks)
}

export const generate = (functions, stacks) => length => {

  const ret = []

  let i = 0
  while (i++ < length) {
    ret.push(randomInstructions(functions, stacks))
  }
  return ret
}

const num = number(['x'])

/*
console.log(generate(
  { add: add(num),
    minus: minus(num),
    times: times(num),
    pow: pow(num) },
  { number: num },
  10
))
*/

export const example = (depth = 10) => generate({
  add: add(num),
  minus: minus(num),
  times: times(num),
  pow: pow(num)
}, { number: num })(depth)
