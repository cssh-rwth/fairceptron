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
  beforeCreate() {
    // TODO: register user, load questions

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
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
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
