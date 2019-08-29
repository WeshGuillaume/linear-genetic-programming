const random = array => () => {
  return array[Math.floor(Math.random() * array.length)];
};

export const createStack = ({
  initial = [],
  randomParameter,
  serialize = a => a.toString(),
  defaultValue = 0,
  deserialize = parseInt
} = {}) => params => {
  const stack = initial;

  return {
    random() {
      return Math.random() > 0.5 ? randomParameter() : random(params)();
    },

    pop() {
      return stack.pop() || defaultValue;
    },

    push(v) {
      return stack.push(deserialize(v));
    },

    fetch() {
      return stack.map(serialize);
    }
  };
};

export const number = createStack({
  randomParameter: random([1, 2, 3, 4])
});
