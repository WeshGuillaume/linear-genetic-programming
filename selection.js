
const biggest = v => v.reduce((p, c, i, v) => c > v[p] ? i : p, 0)

const smallest = v => v.reduce((p, c, i, v) => c < v[p] ? i : p, 0)

const pick = (n, population) => {
  const ret = []

  while(n--) {
    ret.push(population[Math.floor(Math.random() * population.length)])
  }
  return ret
}

export const select = (size, tournament, fitness) => population => {

  let i = 0

  let bestFitness = null
  let bestProgram = null
  const selection = []

  while (i++ < size) {
    const group = pick(tournament, population)
    const fitnesses = group.map(fitness)
    const best = biggest(fitnesses)

    selection.push(group[best])

    if (bestFitness === null || fitnesses[best] > bestFitness) {
      bestFitness = fitnesses[best]
      bestProgram = group[best]
    }
  }

  return [ selection, bestFitness, bestProgram ]
}
