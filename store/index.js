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
    questionType: '',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-yellow-300',
      'text-purple-300'
    ],
    groupNames: []
  },
  answer: {},
  userID: ''
})

export const getters = {
  personasSorted(state) {
    return [...state.question.personas].sort(comparePersonas)
  },
  personas(state) {
    return state.question.personas
  },
  questionType(state) {
    return state.question.questionType
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
  },
  question(state) {
    return state.question
  },
  userID(state) {
    return state.userID
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
  },
  sendAnswer({ getters }, rating) {
    const answer = {}
    answer.question = getters.question
    answer.rating = rating
    answer.userID = getters.userID
    this.$axios.post('api/answer', answer)
  },
  sendDemographics({ getters }, values) {
    values.userID = getters.userID
    this.$axios.post('api/demographics', values)
  }
}
