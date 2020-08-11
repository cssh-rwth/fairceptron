<template>
  <div
    class="max-w-6xl min-h-screen mx-auto flex flex-col p-4 sm:p-6 lg:p-8 xl:p-12"
  >
    <ProgressBar :progress="progress" class="mb-4 flex-grow-0" />
    <QuestionDescription class="flex-grow flex-initial flex items-center" />
    <SelectionPersonas
      v-if="questionType === 'selection'"
      class="my-4 flex-grow flex-initial flex items-start self-center"
    />
    <RankingPersonas v-if="questionType === 'ranking'" class="my-4 flex-grow" />
    <div v-if="questionType === 'ranking'" class="flex-grow"></div>
    <RangeRating class="mt-4 flex-grow-0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RangeRating from '~/components/RangeRating'
import SelectionPersonas from '~/components/SelectionPersonas'
import QuestionDescription from '~/components/QuestionDescription'
import RankingPersonas from '~/components/RankingPersonas'
import ProgressBar from '~/components/ProgressBar'

export default {
  components: {
    RangeRating,
    SelectionPersonas,
    RankingPersonas,
    QuestionDescription,
    ProgressBar,
  },
  computed: {
    ...mapGetters(['questionType', 'totalQuestions', 'currentNo']),
    progress() {
      if (!this.totalQuestions) return 0
      return Math.round(
        ((this.currentNo + 1) / (this.totalQuestions + 3)) * 100 // + landingPage + 2xdemographics
      )
    },
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  beforeCreate() {
    // point to the correct question
    this.$store.commit(
      'setCurrentQuestion',
      parseInt(this.$route.params.id - 1)
    )

    // if this is a demographics question, redirect
    if (this.$store.getters.questionType === 'demographics')
      this.$router.push('/demographics')

    // start the timer
    this.$store.commit('startTimer')
  },
  mounted() {
    // user unknown
    if (!this.$store.getters.userID) {
      // load previously persisted UserID
      if (this.$store.getters.localUserID) {
        this.$store.commit('loadUserID')
        this.$store.dispatch('loadUser', this.$store.getters.userID)
      }
      // register a new user
      else {
        const persistant = true
        this.$store.dispatch('registerUser', persistant)
      }
    }
    // user known, but questions not loaded
    else if (!this.$store.getters.totalQuestions) {
      this.$store.dispatch('loadQuestions')
    }
  },
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'index') return 'slide-left'
    if (from.name === 'demographics' || from.name === 'finish')
      return 'slide-right'
    if (from.name === 'questions-id') {
      if (parseInt(to.params.id) < parseInt(from.params.id)) {
        return 'slide-right'
      } else {
        return 'slide-left'
      }
    }
  },
}
</script>

<style scoped></style>
