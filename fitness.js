
/*
 * The fitness function is used to quantify how well a program performed over a given dataset
 *
 * In our case, we want the result to be negative, and we assume the program is perfect when its
 * fitness reach 0. This convention will allow to use diferent types of fitnesses for different types
 * of problems
 */

/*
 * The Levenshtein Edit Distance is used to calculate the distance between 2 strings
 *
 * s1 => {String}
 * s2 => {String}
 *
 * return => {Number}
 */
const levenshtein = (s1, s2) => {

  if (!s1.length) { return s2.length }
  if (!s2.length) { return s1.length }

  return Math.min(
    levenshtein(s.substr(1), t) + 1,
    levenshtein(t.substr(1), s) + 1,
    levenshtein(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
  )
}

/*
 * Returns a fitness function that returns the overall program's performance,
 * 
 * dataset => {Array<{ input, output }>}
 * definition => {Function}
 * error => {Function} used to calculate the distance between the expected value and the actual result
 * evaluate => {Function} takes an array representing the program and turn it into a javascript function
 *
 * program => {Program}
 *
 * return => {Number} the program's performance
 */
export const createFitness = ({
  dataset,
  definition,
  error,
  evaluate,
}) => program => {

  const evaluated = evaluate(program)

  return dataset.map(e => error(e.output, evaluated(e.input)))
    .reduce((p, c) => p + c, 0)
}

/*
 * Create a fitness for math problems
 */
export const createMathFitness = ({
  definition,
  minDataset,
  maxDataset,
  evaluate,
}) =>
  createFitness({
    dataset: createMathDataset(fn, minDataset, maxDataset),
    definition: fn,
    error: (expected, got) => Math.abs(expected - got) * -1,
    evaluate,
  })

/*
 * Create a fitness for string problems
 */
export const createLevenshteinFitness = ({
  definition,
  dataset,
  evaluate,
}) =>
  createFitness({
    dataset,
    definition,
    evaluate,
    error: (expected, got) => levenshtein(expected, got) * -1,
  })

/*
 * Create a dataset for math problems
 */
export const createMathDataset = (fn, min = -10, max = 100) => {

  const ret = []
  while (min++ < max) {
    ret.push({ input: { x: min }, output: fn(min) })
  }

  return ret
}
