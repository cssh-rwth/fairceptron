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
    <RatingBar class="self-end" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import RatingBar from '~/components/RatingBar.vue'
import SelectionPersonas from '~/components/SelectionPersonas.vue'
import QuestionDescription from '~/components/QuestionDescription.vue'
import RankingPersonas from '~/components/RankingPersonas.vue'

export default {
  components: {
    RatingBar,
    SelectionPersonas,
    RankingPersonas,
    QuestionDescription
  },
  computed: {
    ...mapGetters(['questionType'])
  },
  beforeCreate() {
    this.$store.dispatch('generateQuestion')
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style></style>
