
/*
 * Crossover Operator
 *
 * The crossover operator is a genetic operator that will
 * take 2 programs and mix them together in order to create a new one
 *
 * In this scenario, crossoverOnce will take two programs and return a single one,
 * and crossover will take an array of programs and return an array of new programs
 *
 */

/*
 * For each parent,
 * we choose a random split point
 * then we take the first part of parent1 and concat it with the last part of parent2
 *
 * parent1 => {Program}
 * parent2 => {Program}
 *
 * return => {Program}
 */
export const crossoverOnce = (parent1, parent2) => {

  const p1 = Math.floor(Math.random() * parent1.length)
  const p2 = Math.floor(Math.random() * parent2.length)

  return [ ...parent1.slice(0, p1), ...parent2.slice(p2) ]
}

/*
 * Given an amount representing how many children we want to create,
 * return an Array of programs with the given population
 *
 * amount => {Integer}
 * population => {Array<Program>}
 *
 * return => {Array<Program>}
 */
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
