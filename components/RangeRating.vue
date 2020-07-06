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
        <div class="mx-4 w-full relative">
          <div
            v-if="ratingSelected"
            :style="ratingValueCSS"
            style="left: var(--rating-value);"
            class="absolute range-bubble bg-gray-400 rounded-full text-white flex items-center justify-center"
          >
            <div class="range-arrow-down absolute"></div>
            <div class="mb-px text-gray-700 select-none text-xs">
              {{ Math.round(ratingValue * 100) }}
            </div>
          </div>
          <input
            v-model="ratingValue"
            type="range"
            :min="ratingMin"
            :max="ratingMax"
            :step="ratingStep"
            :class="ratingSelected ? 'range-visible' : 'range-invisible'"
            class="w-full"
            @mousedown="enterSelection"
            @touchstart="enterSelection"
          />
        </div>
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
      ratingValue: null,
      ratingMin: 0,
      ratingMax: 1,
      ratingStep: 0.01,
      ratingLabelsDE: ['sehr unfair', 'sehr fair'],
      confirmLabelDE: 'Nächste Frage',
    }
  },
  computed: {
    ratingValueCSS() {
      return {
        '--rating-value':
          'calc(' +
          this.ratingValue * 100 +
          '% - ' +
          (this.ratingValue * 0.5 + 0.5) +
          'rem)',
      }
    },
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch('sendAnswer', this.ratingValue)
      if (this.$store.getters.nextQuestion.questionType === 'demographics')
        this.$router.push('/demographics')
      else this.$router.push(this.$store.getters.nextNo.toString())
    },
    enterSelection() {
      this.ratingSelected = true
    },
  },
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
