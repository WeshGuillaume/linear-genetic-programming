
export const createMathFitness = ({
  definition,
  minDataset,
  maxDataset,
  evaluate,
}) => {

  const dataset = createMathDataset(definition, minDataset, maxDataset)

  return program => {

    const evaluated = evaluate(program)
    
    const res = dataset.map(e => Math.abs(e.output - evaluated(e.input)) * -1)

    return dataset.map(e => Math.abs(e.output - evaluated(e.input)) * -1)
                  .reduce((p, c) => p + c, 0)
  }
}

export const createMathDataset = (fn, min = -10, max = 100) => {

  const ret = []
  while (min++ < max) {
    ret.push({ input: { x: min }, output: fn(min) })
  }

  return ret
}

