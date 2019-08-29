const biggest = v => v.reduce((p, c, i, v) => (c > v[p] ? i : p), 0);

const smallest = v => v.reduce((p, c, i, v) => (c < v[p] ? i : p), 0);

const pick = (n, population) => {
  const ret = [];

  while (n--) {
    ret.push(population[Math.floor(Math.random() * population.length)]);
  }
  return ret;
};

export const select = (size, tournament, fitness) => population => {
  let i = 0;

  let bestFitness = null;
  let bestProgram = null;
  const selection = [];

  while (i++ < size) {
    const group = pick(tournament, population);
    const fitnesses = group.map(fitness);
    const best = biggest(fitnesses);

    selection.push(group[best]);

    if (bestFitness === null || fitnesses[best] > bestFitness) {
      bestFitness = fitnesses[best];
      bestProgram = group[best];
    }
  }

  return [selection, bestFitness, bestProgram];
};

const random = array => () => {
  return array[Math.floor(Math.random() * array.length)];
};

export const select2 = (size, tournament, fitness) => population => {
  const fitnesses = population.map(p => ({
    fitness: fitness(p),
    program: p
  }));

  const sortedPopulation = fitnesses.sort((a, b) => b.fitness - a.fitness);

  const best = sortedPopulation[0];

  sortedPopulation.length = size / 2;

  const selection = sortedPopulation.map(e => e.program);

  while (sortedPopulation.length < size) {
    sortedPopulation.push(random(population));
  }

  return [selection, best.fitness, best.program];
};
