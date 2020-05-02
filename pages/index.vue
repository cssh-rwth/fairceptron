<template>
  <div class="max-w-6xl min-h-screen mx-auto grid grid-cols-1">
    <QuestionDescription class="self-start" />
    <SelectionPersonas
      :personas="this.$store.getters.personas"
      class="self-center"
    />
    <RatingBar class="self-end" />
  </div>
</template>

<script>
import RatingBar from '~/components/RatingBar.vue'
import SelectionPersonas from '~/components/SelectionPersonas.vue'
import QuestionDescription from '~/components/QuestionDescription.vue'

export default {
  components: {
    RatingBar,
    SelectionPersonas,
    QuestionDescription
  }
}
</script>

<style></style>
