const comparePersonas = (a, b) => {
  const valueA = a.value
  const valueB = b.value
  if (valueA > valueB) return -1
  if (valueB > valueA) return 1
  else return 0
}

export const state = () => ({
  personas: [
    { group: 1, selected: false, value: 0.34 },
    { group: 0, selected: false, value: 0.56 },
    { group: 0, selected: true, value: 0.92 },
    { group: 1, selected: false, value: 0.87 },
    { group: 0, selected: true, value: 0.83 },
    { group: 0, selected: false, value: 0.54 },
    { group: 0, selected: false, value: 0.23 },
    { group: 1, selected: true, value: 0.81 },
    { group: 0, selected: false, value: 0.31 },
    { group: 1, selected: false, value: 0.31 },
    { group: 0, selected: false, value: 0.25 }
  ],
  question: {
    type: 'ranking',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-pink-300',
      'text-yellow-300',
      'text-purple-300'
    ],
    groupNames: [
      'Personen in Gruppe 1',
      'Personen in Gruppe 2',
      'Personen in Gruppe 3',
      'Personen in Gruppe 4',
      'Personen in Gruppe 5'
    ]
  }
})

export const getters = {
  personasSorted(state) {
    return [...state.personas].sort(comparePersonas)
  },
  personas(state) {
    return state.personas
  },
  questionType(state) {
    return state.question.type
  },
  colors(state) {
    return state.question.colors
  },
  showScores(state) {
    return state.question.showScores
  },
  groupNames(state) {
    return state.question.groupNames
  },
  personasPerGroup(state) {
    const groupCount = []
    for (let i = 0; i < 5; i++)
      groupCount.push(state.personas.filter((p) => p.group === i).length)
    return groupCount
  },
  noOfGroups(_, getters) {
    return getters.personasPerGroup.filter((g) => g !== 0).length
  },
  noSelected(state) {
    return state.personas.filter((p) => p.selected).length
  }
}

export const mutations = {
  questionType(state, type) {
    state.question.type = type
  }
}
