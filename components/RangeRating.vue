<template>
  <div class="w-full sm:px-8">
    <form
      class="w-full max-w-4xl p-4 mb-4 sm:mb-8 lg:mb-16 mx-auto flex flex-wrap items-center justify-center"
      @submit.prevent="handleSubmit"
    >
      <div class="flex flex-grow justify-center items-center my-4">
        <div
          class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
        >
          {{ ratingLabelsDE[0] }}
        </div>
        <input
          type="range"
          :min="ratingMin"
          :max="ratingMax"
          :value="ratingValue"
          :step="ratingStep"
          :class="ratingSelected ? 'range-visible' : 'range-invisible'"
          class="mx-4 w-full"
          @mousedown="enterSelection"
          @touchstart="enterSelection"
        />
        <div
          class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
        >
          {{ ratingLabelsDE[1] }}
        </div>
      </div>
      <button
        type="submit"
        :disabled="!ratingSelected"
        class="px-2 py-1 my-4 mx-4 sm:ml-8 lg:ml-12 sm:mr-0 sm:px-4 sm:py-2 rounded text-white flex-none button"
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
    },
    enterSelection() {
      this.ratingSelected = true
    }
  }
}
</script>

<style scoped>
@import '~assets/css/range.css';

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

.range-visible::-moz-range-thumb {
  visibility: visible;
}
.range-visible::-webkit-slider-thumb {
  visibility: visible;
}
.range-visible::-ms-thumb {
  visibility: visible;
}
.range-invisible::-moz-range-thumb {
  visibility: hidden;
}
.range-invisible::-webkit-slider-thumb {
  visibility: hidden;
}
.range-invisible::-ms-thumb {
  visibility: hidden;
}
</style>
