
/*
 * The evolver will be used to combine all genetic operators
 * and loop to evolve the wanted program
 *
 * mutate => {Function} used to mutate a selection of programs
 * generate => {Function} used to create random programs and fill the new population until it has its initial size
 * crossover => {Function} used to mate random programs of a selection
 * population => {Array<Program>} initial random population
 * stopWhen => {Function} used to decide when to stop the evolve loop
 * onIteration => {Function} called on each evolve iteration
 * select => {Function} used to select the best individuals for the next generation
 */
export const createEvolver = ({
  mutate,
  generate,
  crossover,
  population,
  stopWhen,
  onIteration,
  select,
}) => () => {

  let counter = 0

  while (++counter) {

    const [ selection, bestFitness, bestProgram ] = select(population)

    const newPopulation = [
      ...selection,
      ...mutate(population),
      //...mutate(selection),
      //...crossover(selection),
      ...crossover(population),
    ]

    while (newPopulation.length < population.length) {
      newPopulation.push(generate())
    }

    population = newPopulation

    onIteration(counter, bestFitness, bestProgram)

    if (stopWhen(counter, bestFitness)) {
      return [ bestProgram, bestFitness ]
    }
  }
}
