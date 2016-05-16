
export const toString = program =>
  program
    .map(l => l.join(' '))
    .join('\n')
