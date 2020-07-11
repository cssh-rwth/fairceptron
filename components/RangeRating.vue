<template>
  <div class="w-full sm:px-8">
    <form
      class="w-full max-w-4xl p-4 mb-4 sm:mb-8 lg:mb-16 mx-auto flex flex-wrap items-center justify-center"
    >
      <Range
        class="my-4"
        :label-left="ratingLabelsDE[0]"
        :label-right="ratingLabelsDE[1]"
        @value="ratingValue = $event"
      />
      <nuxt-link
        :to="nextPage"
        :class="ratingValue === null ? 'disabled' : 'enabled'"
        :event="ratingValue !== null ? 'click' : ''"
        class="px-2 py-1 my-4 mx-4 sm:ml-8 lg:ml-12 sm:mr-0 sm:px-4 sm:py-2 rounded text-white flex-none button"
        @click.native="handleSubmit()"
      >
        {{ confirmLabelDE }}
      </nuxt-link>
    </form>
  </div>
</template>

<script>
import Range from '~/components/Range'

export default {
  name: 'RatingBar',
  components: {
    Range,
  },
  data() {
    return {
      ratingValue: null,
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
          (this.ratingValue * 0.5 + 0.75) +
          'rem)',
      }
    },
    nextPage() {
      if (this.$store.getters.nextQuestion.questionType === 'demographics')
        return '/demographics'
      else return (this.$store.getters.currentNo + 2).toString()
    },
  },
  methods: {
    handleSubmit() {
      if (this.ratingValue !== null)
        this.$store.dispatch('sendAnswer', this.ratingValue)
    },
  },
}
</script>

<style scoped>
.button {
  @apply bg-gray-600;
}
.button.disabled {
  @apply bg-gray-200;
  @apply cursor-default;
}
.button.enabled:hover {
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
