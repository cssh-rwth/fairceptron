<template>
  <div class="flex flex-grow justify-center items-center">
    <div
      class="w-32 text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap text-right"
    >
      {{ labelLeft }}
    </div>
    <div class="mx-4 w-full relative">
      <div
        v-if="ratingSelected"
        :style="ratingValueCSS"
        style="left: var(--rating-value); bottom: 2.25rem;"
        class="absolute bg-white text-gray-700 w-8 rounded-full text-white text-center select-none"
      >
        {{ Math.round(ratingValue * 100) }}
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
    <div class="w-32 text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap">
      {{ labelRight }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Range',
  props: {
    labelLeft: {
      type: String,
      default: 'Gar nicht',
    },
    labelRight: {
      type: String,
      default: 'Sehr',
    },
  },
  data() {
    return {
      ratingSelected: false,
      ratingValue: undefined,
      ratingMin: 0,
      ratingMax: 1,
      ratingStep: 0.01,
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
  },
  watch: {
    ratingValue(val, oldVal) {
      this.$emit('value', val)
    },
  },
  methods: {
    enterSelection() {
      this.ratingSelected = true
    },
  },
}
</script>

<style scoped>
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
