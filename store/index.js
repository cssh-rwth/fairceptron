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
    questions: Array(100),
    answer: {},
    userID: '',
    localUserID: '',
    startTime: null,
    timeElapsed: null,
    inconfidences: Array(100),
    answers: Array(100),
  }
  const question = {
    questionType: '',
    personas: [],
    colors: [],
    showScores: true,
    groupNames: [],
  }
  initialState.questions.fill(question)
  initialState.answers.fill(null)
  initialState.inconfidences.fill(null)
  return initialState
}

export const getters = {
  personasSorted: (state) =>
    [...state.questions[state.currentQuestion].personas].sort(comparePersonas),
  personas: (state) => state.questions[state.currentQuestion].personas,
  questionType: (state) => state.questions[state.currentQuestion].questionType,
  colors: (state) => state.questions[state.currentQuestion].colors,
  showScores: (state) => state.questions[state.currentQuestion].showScores,
  groupNames: (state) => state.questions[state.currentQuestion].groupNames,
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
  noOfGroups: (_, getters) =>
    getters.personasPerGroup.filter((g) => g !== 0).length,
  noSelected: (state) =>
    state.questions[state.currentQuestion].personas.filter((p) => p.selected)
      .length,
  question: (state) => state.questions[state.currentQuestion],
  userID: (state) => state.userID,
  localUserID: (state) => state.localUserID,
  currentNo: (state) => state.currentQuestion,
  nextQuestion: (state) => state.questions[state.currentQuestion + 1],
  timeElapsed: (state) => state.timeElapsed,
  totalQuestions: (state) =>
    state.questions.length !== 100 ? state.questions.length - 1 : null,
  questionNumbers: (state) => state.questionNumbers,
  currentAnswer: (state) => state.answers[state.currentQuestion],
  inconfidences: (state) => state.inconfidences,
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
  setAnswer(state, { rating, number }) {
    state.answers[number] = rating
  },
  setAnswers(state, answers) {
    state.answers = answers
  },
  setInconfidences(state, inconfidences) {
    state.inconfidences = inconfidences
  },
  addInconfidence(state, { diff, number }) {
    if (state.inconfidences[number] === null)
      state.inconfidences[number] = 0 + diff
    else state.inconfidences[number] += diff
  },
}

const normalizeQuestion = (question) => {
  question.personas = question.personas || []
  question.questionType = question.questionType || ''
  question.showScores = question.showScores || true
  question.colors = question.colors || ['teal', 'orange', 'yellow', 'purple']
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

  async loadUser({ commit, dispatch, getters }, userID) {
    const response = await this.$axios.get('api/user', { params: { userID } })
    commit('setQuestionNumbers', response.data.questionNumbers)
    commit('setAnswers', response.data.answers)
    commit('setInconfidences', response.data.inconfidences)
    // the server might answer with a different userID -> new user was created
    if (getters.userID !== response.data.userID) {
      commit('setUserID', response.data.userID)
      commit('persistUserID')
    }
    dispatch('loadQuestions')
  },

  async sendAnswer({ getters, commit }, rating) {
    commit('setAnswer', { rating, number: getters.currentNo })
    const answer = {}
    answer.question = {
      questionType: getters.questionType,
      number: getters.questionNumbers[getters.currentNo],
      showScores: getters.showScores,
    }
    answer.rating = rating
    answer.inconfidence = getters.inconfidences[getters.currentNo]
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
