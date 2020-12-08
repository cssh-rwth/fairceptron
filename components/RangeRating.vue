<template>
  <form class="w-full mx-auto flex flex-wrap items-center justify-center">
    <Range
      class="my-4"
      :label-left="language === 'de' ? ratingLabelsDE[0] : ratingLabelsEN[0]"
      :label-right="language === 'de' ? ratingLabelsDE[1] : ratingLabelsEN[1]"
      :range-value.sync="ratingValue"
    />
    <nuxt-link
      :to="nextPage"
      :class="ratingValue === null ? 'disabled' : 'enabled'"
      :event="ratingValue !== null ? 'click' : ''"
      class="px-2 py-1 my-4 mx-4 sm:ml-8 lg:ml-12 sm:mr-0 sm:px-4 sm:py-2 rounded text-white flex-none button"
      @click.native="handleSubmit()"
    >
      {{ language === 'de' ? confirmLabelDE : confirmLabelEN }}
    </nuxt-link>
  </form>
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
      localRatingValue: null,
      ratingLabelsDE: ['sehr unfair', 'sehr fair'],
      ratingLabelsEN: ['very unfair', 'very fair'],
      confirmLabelDE: 'Nächstes Szenario',
      confirmLabelEN: 'Next scenario',
    }
  },
  computed: {
    ratingValue: {
      // can't use shorthand () => {} because we need the correct scope
      get() {
        return this.localRatingValue !== null
          ? this.localRatingValue
          : this.$store.getters.currentAnswer
      },
      set(rating) {
        this.localRatingValue = rating
      },
    },
    nextPage() {
      if (this.$store.getters.nextQuestion.questionType === 'demographics')
        return '/demographics'
      else return '/questions/' + (this.$store.getters.currentNo + 2).toString()
    },
    language() {
      return this.$store.getters.language
    },
  },
  watch: {
    ratingValue(newRating, oldRating) {
      if (oldRating !== null) {
        this.$store.commit('addInconfidence', {
          diff: Math.abs(newRating - oldRating),
          number: this.$store.getters.currentNo,
        })
      }
    },
  },
  mounted() {
    this.localRatingValue = this.$store.getters.currentAnswer
  },
  methods: {
    handleSubmit() {
      if (this.ratingValue !== null)
        this.$store.dispatch('sendAnswer', this.localRatingValue)
    },
  },
}
</script>

<style scoped>
.button {
  @apply bg-green-600;
}
.button.disabled {
  @apply bg-gray-200;
  @apply cursor-default;
}
.button.enabled:hover {
  @apply bg-green-700;
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
