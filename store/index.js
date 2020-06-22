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
      'text-purple-300',
    ],
    groupNames: [],
    number: -1,
  },
  nextQuestion: {
    personas: [],
    questionType: '',
    showScores: true,
    colors: [
      'text-teal-300',
      'text-orange-300',
      'text-yellow-300',
      'text-purple-300',
    ],
    groupNames: [],
    number: -1,
  },
  answer: {},
  userID: '',
  startTime: null,
  timeElapsed: null,
  totalQuestions: 20,
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
  },
  nextNo(state) {
    return state.nextQuestion.number
  },
  timeElapsed(state) {
    return state.timeElapsed
  },
  totalQuestions(state) {
    return state.totalQuestions
  },
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
  },
  startTimer(state) {
    state.startTime = new Date()
  },
  stopTimer(state) {
    const endTime = new Date()
    if (state.startTime === null) state.timeElapsed = null
    else {
      const timeDiff = endTime - state.startTime
      state.timeElapsed = timeDiff
      state.startTime = null
    }
  },
  setTotalQuestions(state, totalQuestions) {
    state.totalQuestions = totalQuestions
  },
}

const normalizeQuestion = (question) => {
  question.personas = question.personas || []
  question.questionType = question.questionType || ''
  question.showScores = question.showScores || true
  question.colors = question.colors || [
    'text-teal-300',
    'text-orange-300',
    'text-yellow-300',
    'text-purple-300',
  ]
  question.groupNames = question.groupNames || []
  question.number = question.number || -1
  return question
}

export const actions = {
  getRandomQuestion({ commit }) {
    this.$axios.get('api/random').then((response) => {
      commit('setQuestion', normalizeQuestion(response.data))
    })
  },

  rotateQuestions({ commit, getters }) {
    // rotate next question to become current question
    commit('setQuestion', getters.nextQuestion)
    // get new next question asychronously
    this.$axios
      .get('api/question', { params: { number: getters.currentNo + 1 } })
      .then((response) => {
        const nextQuestion = normalizeQuestion(response.data)
        nextQuestion.number = getters.currentNo + 1
        commit('setTotalQuestions', nextQuestion.totalQuestions)
        delete nextQuestion.totalQuestions
        commit('setNextQuestion', nextQuestion)
      })
  },

  // get the first questions
  initQuestions({ commit }, startAt) {
    startAt = parseInt(startAt) || 1
    this.$axios
      .get('api/question', { params: { number: startAt } })
      .then((response) => {
        const question = normalizeQuestion(response.data)
        question.number = startAt
        commit('setTotalQuestions', question.totalQuestions)
        delete question.totalQuestions
        commit('setQuestion', question)
      })
    this.$axios
      .get('api/question', { params: { number: startAt + 1 } })
      .then((response) => {
        const question = normalizeQuestion(response.data)
        question.number = startAt + 1
        commit('setTotalQuestions', question.totalQuestions)
        delete question.totalQuestions
        commit('setNextQuestion', question)
      })
  },

  registerUser({ commit }) {
    this.$axios.post('api/user').then((response) => {
      commit('setUserID', response.data.id)
    })
  },

  sendAnswer({ getters, commit, dispatch }, rating) {
    const answer = {}
    answer.question = getters.question
    answer.rating = rating
    commit('stopTimer')
    answer.timeElapsed = getters.timeElapsed
    // get a new userID if unknown
    // TODO await successfull registration
    if (!getters.userID) dispatch('registerUser')
    answer.userID = getters.userID
    this.$axios.post('api/answer', answer)
  },

  sendDemographics({ getters, commit }, values) {
    values.userID = getters.userID
    commit('stopTimer')
    values.timeElapsed = getters.timeElapsed
    this.$axios.post('api/demographics', values)
  },
}
