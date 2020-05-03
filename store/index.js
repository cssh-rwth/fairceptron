const comparePersonas = (a, b) => {
  const valueA = a.value
  const valueB = b.value
  if (valueA > valueB) return -1
  if (valueB > valueA) return 1
  else return 0
}

export const state = () => ({
  personas: [],
  question: {
    type: '',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-yellow-300',
      'text-purple-300'
    ],
    groupNames: []
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
  changeQuestionType(state, type) {
    state.question.type = type
  },
  changeScoreVisibility(state, visible) {
    state.question.showScores = visible
  },
  clearPersonas(state) {
    state.personas.length = 0
  },
  pushPersona(state, persona) {
    state.personas.push(persona)
  },
  selectPersona(state, id) {
    state.personas[id].selected = true
  }
}

export const actions = {
  generateQuestion({ commit, getters }) {
    commit('clearPersonas')
    const noOfPersonas = Math.floor(Math.random() * 12) + 3
    const noOfGroups = Math.floor(Math.random() * 3) + 1
    const noSelected = Math.floor(Math.random() * noOfPersonas * 0.3) + 1
    for (let i = 0; i < noOfPersonas; i++) {
      let group = i
      if (i > noOfGroups) group = Math.floor(Math.random() * noOfGroups)
      const value = Math.floor(Math.random() * 100)
      commit('pushPersona', { group, selected: false, value })
    }
    for (let i = 0; i < noSelected; i++) {
      commit('selectPersona', Math.floor(Math.random() * noOfPersonas))
    }
    const type = Math.random() > 0.5 ? 'selection' : 'ranking'
    if (type !== getters.questionType) commit('changeQuestionType', type)
    const scoreVisibility = Math.random() > 0.5
    if (scoreVisibility !== getters.showScores)
      commit('changeScoreVisibility', scoreVisibility)
  }
}
