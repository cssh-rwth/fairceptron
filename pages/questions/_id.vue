<template>
  <div class="max-w-6xl min-h-screen mx-auto grid grid-cols-1">
    <QuestionDescription class="self-start" />
    <SelectionPersonas
      v-if="questionType === 'selection'"
      :personas="this.$store.getters.personas"
      class="self-center my-12"
    />
    <RankingPersonas
      v-if="questionType === 'ranking'"
      :personas="this.$store.getters.personasSorted"
      class="self-center my-12"
    />
    <RatingBar class="self-end" />
  </div>
</template>

<script>
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
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    questionType() {
      return this.id % 2 === 0 ? 'ranking' : 'selection'
    }
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style></style>
