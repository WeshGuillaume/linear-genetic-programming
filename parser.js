
import { add, minus, times, pow } from './functions'
import { number } from './stack'

const toFn = (params, functions) => line => stacks => {

  const fn = line[0]

  if (stacks[fn]) { return stacks[fn].push(resolve(params, line[1])) }
  if (functions[fn]) { return functions[fn](stacks, ...line.slice(1).map(e => resolve(params, e))) }
}

const resolve = (params, value) => {
  if (params[value]) { return params[value] }
  if (parseInt(value)) { return parseInt(value) }
  return value
}

export const createParser = (functions, stacks) => (code, params) => {

  const lines = code
    .map(toFn(params, functions))
    .forEach(fn => fn(stacks))
}

export const createEvaluator = (functions, stacks, ret) => code => params => {
  const parse = createParser(functions, stacks)
  parse(code, params)
  return ret(stacks)
}

export const evaluate = code => params => {

  const num = number(['x'])

  const parse = createParser({
    add: add(num),
    minus: minus(num),
    times: times(num),
    pow: pow(num),
  }, { number: num })

  parse(code, params)

  return num.pop()
}
