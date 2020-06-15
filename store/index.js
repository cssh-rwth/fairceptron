const comparePersonas = (a, b) => {
  const qualificationA = a.qualification
  const qualificationB = b.qualification
  if (qualificationA > qualificationB) return -1
  if (qualificationB > qualificationA) return 1
  else return 0
}

export const state = () => ({
  question: {
    personas: [],
    type: '',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-yellow-300',
      'text-purple-300'
    ],
    groupNames: []
  },
  userID: '-1'
})

export const getters = {
  personasSorted(state) {
    return [...state.question.personas].sort(comparePersonas)
  },
  personas(state) {
    return state.question.personas
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
      groupCount.push(
        state.question.personas.filter((p) => p.group === i).length
      )
    return groupCount
  },
  noOfGroups(_, getters) {
    return getters.personasPerGroup.filter((g) => g !== 0).length
  },
  noSelected(state) {
    return state.question.personas.filter((p) => p.selected).length
  }
}

export const mutations = {
  setQuestion(state, question) {
    state.question = question
  },
  setUserID(state, id) {
    state.userID = id
  }
}

export const actions = {
  getRandomQuestion({ commit }) {
    this.$axios.get('api/random').then((response) => {
      commit('setQuestion', response.data)
    })
  },
  registerUser({ commit }) {
    this.$axios.post('api/user').then((response) => {
      commit('setUserID', response.data.id)
    })
  }
}
