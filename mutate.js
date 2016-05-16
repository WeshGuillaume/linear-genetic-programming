
import { example as generate } from './generate'

export const mutateOne = generate => program => {

  const p1 = Math.floor(Math.random() * program.length)
  const p2 = Math.floor(Math.random() * program.length)

  const lower = p1 > p2 ? p1 : p2
  const upper = lower === p1 ? p2 : p1

  const min = Math.floor(Math.random() * lower)
  const max = Math.floor(Math.random() * (program.length - upper) + upper)

  return [ ...program.slice(min, lower), ...generate(), ...program.slice(upper, max) ]
}

export const mutate = generate => pop =>
  pop.map(mutateOne(generate))
