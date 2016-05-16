
# Installation

```

$> git clone https://github.com/GuillaumeBadi/linear-genetic-programming

$> cd $_

$> npm i

```

# Setup a basic Algebra problem

``` javascript

import { numericSolver } from './example'
import { toString } from './utils'

const [ bestProgram, bestFitness ] = numericSolver(x => x * x + 2)
console.log(toString(bestProgram))

```

# What's inside?

``` javascript

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

/*
  Definition is the function we want our algorithm to find
*/
export const numericSolver = definition => {

  /*
    This is the fitness function.

    It will be used to evaluate our program performances and evolution

     - definition is the above
     - minDataset is the lower bound that will be used in the dataset to train our program
     - maxDataset is the upper bound
     - evaluate is a function that will take a program and turn it into a javascript function
  */
  const fitness = createMathFitness({
    definition,
    minDataset: -10,
    maxDataset: 10,
    evaluate,
  })

  /*
    This is the initial population

    It is an array of random programs that will be used to converge to the solution

     - depth: the initial programs length
     - size: the number of programs in the population
     - fitness: the above
     - generate: a function that will be used to generate random bits in our code
  */
  const population = createPopulation({
    depth: 5,
    size: 200,
    fitness,
    generate,
  })

  /*
    This will be the evolve function. It is going to turn the previous variables into a working 
    genetic algorithm.

    mutate: the mutaion operator, working on the best individuals on each iteration
    crossover: the crossover operator
    generate: same as the generate in createPopulation
    population: the above one
    stopWhen: a function that will tell when the algorithm should stop evolving
    onIteration: a function that will be executed on each iteration
    select: the selection operator
  */
  const [ bestProgram, bestFitness ] = createEvolver({
    mutate: mutate(generate),
    crossover: crossover(10),
    generate: generate,
    population,
    stopWhen: (counter, bestFitness) => counter === 2000 || bestFitness === 0,
    onIteration: counter => console.log(`Iteration ${counter}`),
    select: select(30, 20, fitness),
  })()

  return [ bestProgram, bestFitness ]
}

```
