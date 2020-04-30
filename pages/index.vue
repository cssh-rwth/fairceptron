<template>
  <div class="relative max-w-6xl h-screen bg-gray-400 mx-auto">
    <RatingBar class="absolute bottom-0 bg-gray-600" />
  </div>
</template>

<script>
import RatingBar from '~/components/ratingbar.vue'

export default {
  components: {
    RatingBar
  }
}
</script>

<style></style>
