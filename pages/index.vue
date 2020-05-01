<template>
  <div class="relative max-w-6xl h-screen mx-auto">
    <SelectionPersonas style="height: 80%" />
    <RatingBar class="absolute bottom-0" />
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
