const comparePersonas = (a, b) => {
  const qualificationA = a.qualification
  const qualificationB = b.qualification
  if (qualificationA > qualificationB) return -1
  if (qualificationB > qualificationA) return 1
  else return 0
}

const qs = require('qs')

export const state = () => {
  const initialState = {
    questionNumbers: [],
    currentQuestion: 0,
    questions: [],
    answer: {},
    userID: '',
    localUserID: '',
    startTime: null,
    timeElapsed: null,
  }
  const question = {
    questionType: '',
    personas: [],
    colors: [],
    showScores: true,
    groupNames: [],
  }
  for (let i = 0; i < 100; i++) {
    initialState.questions.push(question)
  }
  return initialState
}

export const getters = {
  personasSorted(state) {
    return [...state.questions[state.currentQuestion].personas].sort(
      comparePersonas
    )
  },
  personas(state) {
    return state.questions[state.currentQuestion].personas
  },
  questionType(state) {
    return state.questions[state.currentQuestion].questionType
  },
  colors(state) {
    return state.questions[state.currentQuestion].colors
  },
  showScores(state) {
    return state.questions[state.currentQuestion].showScores
  },
  groupNames(state) {
    return state.questions[state.currentQuestion].groupNames
  },
  personasPerGroup(state) {
    const groupCount = []
    for (let i = 0; i < 5; i++)
      groupCount.push(
        state.questions[state.currentQuestion].personas.filter(
          (p) => p.group === i
        ).length
      )
    return groupCount
  },
  noOfGroups(_, getters) {
    return getters.personasPerGroup.filter((g) => g !== 0).length
  },
  noSelected(state) {
    return state.questions[state.currentQuestion].personas.filter(
      (p) => p.selected
    ).length
  },
  question(state) {
    return state.questions[state.currentQuestion]
  },
  userID(state) {
    return state.userID
  },
  localUserID(state) {
    return state.localUserID
  },
  currentNo(state) {
    return state.currentQuestion
  },
  nextQuestion(state) {
    return state.questions[state.currentQuestion + 1]
  },
  timeElapsed(state) {
    return state.timeElapsed
  },
  totalQuestions(state) {
    return state.questions.length !== 100 ? state.questions.length - 1 : null
  },
  questionNumbers(state) {
    return state.questionNumbers
  },
}

export const mutations = {
  setUserID(state, id) {
    state.userID = id
  },
  setQuestionNumbers(state, numbers) {
    state.questionNumbers = numbers
  },
  setQuestions(state, questions) {
    state.questions = questions
  },
  setCurrentQuestion(state, number) {
    state.currentQuestion = number
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
  persistUserID(state) {
    state.localUserID = state.userID
  },
  loadUserID(state) {
    state.userID = state.localUserID
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
  loadQuestions({ commit, getters }) {
    const questionNumbers = getters.questionNumbers
    this.$axios
      .get('api/questions', {
        params: { questionNumbers },
        paramsSerializer: (params) => {
          return qs.stringify(params)
        },
      })
      .then((response) => {
        const questions = response.data
        for (let i = 0; i < questions.length - 1; i++) {
          questions[i] = normalizeQuestion(questions[i])
        }
        commit('setQuestions', questions)
      })
  },

  async registerUser({ commit, dispatch }, persistant) {
    persistant = persistant || false
    const response = await this.$axios.post('api/user')
    commit('setUserID', response.data.id)
    commit('setQuestionNumbers', response.data.questionNumbers)
    if (persistant) {
      commit('persistUserID')
    }
    dispatch('loadQuestions')
  },

  async loadUser({ commit, dispatch }, userID) {
    const response = await this.$axios.get('api/user', { params: { userID } })
    commit('setQuestionNumbers', response.data.questionNumbers)
    dispatch('loadQuestions')
  },

  async sendAnswer({ getters, commit }, rating) {
    const answer = {}
    answer.question = {
      questionType: getters.questionType,
      number: getters.questionNumbers[getters.currentNo],
      showScores: getters.showScores,
    }
    answer.rating = rating
    commit('stopTimer')
    answer.timeElapsed = getters.timeElapsed
    // get a new userID if unknown
    if (!getters.userID) {
      const response = await this.$axios.post('api/user')
      commit('setUserID', response.data.id)
      commit('setQuestionNumbers', response.data.questionNumbers)
    }
    answer.userID = getters.userID
    this.$axios.post('api/answer', answer)
  },

  sendDemographics({ getters, commit }, values) {
    values.userID = getters.userID
    commit('stopTimer')
    values.timeElapsed = getters.timeElapsed
    this.$axios.post('api/demographics', values)
  },

  sendPersonality({ getters, commit }, values) {
    values.userID = getters.userID
    commit('stopTimer')
    values.timeElapsed = getters.timeElapsed
    this.$axios.post('api/personality', values)
  },
}
