
export const evaluate = (fitness, select, population) =>
  select(population.map(e => [ fitness(e), e ]))

export const createPopulation = ({
  depth,
  size,
  fitness,
  generate,
}) => {
  const population = []

  while (population.length < size) {
    population.push(generate(depth))
  }

  return population
}
