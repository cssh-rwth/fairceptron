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
    groupNames: [],
    number: 0
  },
  nextQuestion: {
    personas: [],
    questionType: '',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-yellow-300',
      'text-purple-300'
    ],
    groupNames: [],
    number: 0
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
  },
  currentNo(state) {
    return state.question.number
  },
  nextQuestion(state) {
    return state.nextQuestion
  }
}

export const mutations = {
  setQuestion(state, question) {
    state.question = question
  },
  setNextQuestion(state, question) {
    state.nextQuestion = question
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

  rotateQuestions({ commit, getters }) {
    // rotate next question to become current question
    commit('setQuestion', getters.nextQuestion)
    // get new next question asychronously
    this.$axios
      .get('api/question', { params: { number: getters.currentNo + 1 } })
      .then((response) => {
        const nextQuestion = response.data
        nextQuestion.number = getters.currentNo + 1
        commit('setNextQuestion', nextQuestion)
      })
  },

  // get the first questions
  initQuestion({ commit }) {
    this.$axios
      .get('api/question', { params: { number: 1 } })
      .then((response) => {
        const question = response.data
        question.number = 1
        commit('setQuestion', question)
      })
    this.$axios
      .get('api/question', { params: { number: 2 } })
      .then((response) => {
        const question = response.data
        question.number = 2
        commit('setNextQuestion', question)
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
