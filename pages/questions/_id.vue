<template>
  <div class="max-w-6xl min-h-screen mx-auto grid grid-cols-1">
    <QuestionDescription class="self-start" />
    <SelectionPersonas
      v-if="questionType === 'selection'"
      class="self-center my-12"
    />
    <RankingPersonas
      v-if="questionType === 'ranking'"
      class="self-center my-12"
    />
    <RangeRating class="self-end" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RangeRating from '~/components/RangeRating'
import SelectionPersonas from '~/components/SelectionPersonas'
import QuestionDescription from '~/components/QuestionDescription'
import RankingPersonas from '~/components/RankingPersonas'

export default {
  components: {
    RangeRating,
    SelectionPersonas,
    RankingPersonas,
    QuestionDescription,
  },
  computed: {
    ...mapGetters(['questionType']),
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
