const comparePersonas = (a, b) => {
  const valueA = a.value
  const valueB = b.value
  if (valueA > valueB) return 1
  if (valueB > valueA) return -1
  else return 0
}

export const state = () => ({
  personas: [
    {
      group: 1,
      selected: false,
      value: 0.34
    },
    {
      group: 0,
      selected: false,
      value: 0.56
    },
    {
      group: 0,
      selected: true,
      value: 0.92
    },
    {
      group: 1,
      selected: false,
      value: 0.87
    },
    {
      group: 0,
      selected: true,
      value: 0.83
    },
    {
      group: 0,
      selected: false,
      value: 0.54
    },
    {
      group: 0,
      selected: false,
      value: 0.23
    },
    {
      group: 1,
      selected: true,
      value: 0.81
    },
    {
      group: 0,
      selected: false,
      value: 0.31
    },
    {
      group: 1,
      selected: false,
      value: 0.31
    },
    {
      group: 0,
      selected: false,
      value: 0.25
    },
    {
      group: 0,
      selected: false,
      value: 0.57
    }
  ]
})

export const getters = {
  personasSorted(state) {
    return [...state.personas].sort(comparePersonas)
  },
  personas(state) {
    return [...state.personas]
  }
}
