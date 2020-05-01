<template>
  <div class="max-w-6xl min-h-screen mx-auto grid-cols-1 grid-rows-3">
    <QuestionDescription />
    <SelectionPersonas />
    <RatingBar />
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
