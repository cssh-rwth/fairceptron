<template>
  <div class="max-w-6xl mx-auto">
    <SelectionPersonas />
    <RatingBar />
  </div>
</template>

<script>
import RatingBar from '~/components/RatingBar.vue'
import SelectionPersonas from '~/components/SelectionPersonas.vue'

export default {
  components: {
    RatingBar,
    SelectionPersonas
  }
}
</script>

<style></style>
