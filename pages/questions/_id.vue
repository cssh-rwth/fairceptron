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
    QuestionDescription
  },
  computed: {
    ...mapGetters(['questionType'])
  },
  /* beforeCreate() {
    this.$store.dispatch('getRandomQuestion')
  }, */
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style></style>
