
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
      ...mutate(selection),
      ...crossover(selection),
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
