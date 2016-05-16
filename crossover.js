
export const crossoverOnce = (parent1, parent2) => {

  const p1 = Math.floor(Math.random() * parent1.length)
  const p2 = Math.floor(Math.random() * parent2.length)

  return [ ...parent1.slice(0, p1), ...parent2.slice(p2) ]
}

export const crossover = amount => population => {

  let i = 0
  const ret = []
  while (i++ < amount) {
    const parent1 = population[Math.floor(Math.random() * population.length)]
    const parent2 = population[Math.floor(Math.random() * population.length)]
    ret.push(crossoverOnce(parent1, parent2))
  }

  return ret
}
