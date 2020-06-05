<template>
  <div class="w-full sm:px-8">
    <form
      class="w-full max-w-4xl p-4 mb-4 sm:mb-8 lg:mb-16 mx-auto flex flex-wrap items-end justify-center"
      @submit.prevent="handleSubmit"
    >
      <input
        type="range"
        :min="ratingMin"
        :max="ratingMax"
        :value="ratingValue"
        :step="ratingStep"
        class="mr-4"
      />
      <button
        type="submit"
        :disabled="!ratingSelected"
        class="px-2 py-1 sm:px-4 sm:py-2 mt-6 rounded text-white flex-none button"
      >
        {{ confirmLabelDE }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RatingBar',
  data() {
    return {
      ratingSelected: false,
      ratingValue: 0,
      ratingMin: -1,
      ratingMax: 1,
      ratingStep: 0.001,
      ratingLabelsDE: ['sehr unfair', 'sehr fair'],
      confirmLabelDE: 'Nächste Frage'
    }
  },
  methods: {
    handleSubmit() {
      this.$router.push((parseInt(this.$route.params.id) + 1).toString())
    }
  }
}
</script>

<style scoped>
.button {
  @apply bg-gray-600;
}
.button:disabled {
  @apply bg-gray-200;
  @apply cursor-default;
}
.button:enabled:hover {
  @apply bg-gray-700;
}
</style>
