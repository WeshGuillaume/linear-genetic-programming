
import { mutate } from './mutate'
import { example as generate } from './generate'
import { crossover } from './crossover'
import { createPopulation } from './population'
import { createMathFitness } from './fitness'
import { createParser } from './parser'
import { evaluate } from './parser'
import { select } from './selection'
import { toString } from './utils'
import { createEvolver } from './evolve'

export const numericSolver = definition => {

  const fitness = createMathFitness({
    definition,
    minDataset: -10,
    maxDataset: 10,
    evaluate,
  })

  const population = createPopulation({
    depth: 5,
    size: 200,
    fitness,
    generate,
  })

  const [ bestProgram, bestFitness ] = createEvolver({
    mutate: mutate(generate),
    crossover: crossover(10),
    generate: generate,
    population,
    stopWhen: (counter, bestFitness) => counter === 2000 || bestFitness === 0,
    onIteration: (counter, fitness) => console.log(`Iteration ${counter} : ${fitness}`),
    select: select(30, 20, fitness),
  })()

  return [ bestProgram, bestFitness ]
}

const [ bestProgram ] = numericSolver(x => x * x + 2 * x + 2)
console.log(bestProgram)
