<template>
  <div class="flex flex-grow justify-center items-start">
    <div
      class="w-32 text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap text-right"
    >
      {{ labelLeft }}
    </div>
    <div class="mx-4 w-full relative">
      <div
        v-if="rangeValue !== null"
        :style="rangeValueCSS"
        style="left: var(--range-value); bottom: 2.25rem;"
        class="absolute bg-white text-gray-700 w-8 rounded-full text-center select-none"
      >
        {{ Math.round(rangeValue * 100) }}
      </div>
      <input
        :value="rangeValue"
        type="range"
        :min="rangeMin"
        :max="rangeMax"
        :step="rangeStep"
        :class="rangeValue !== null ? 'range-visible' : 'range-invisible'"
        class="w-full"
        @input="$emit('update:rangeValue', parseFloat($event.target.value))"
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
    rangeValue: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      rangeMin: 0,
      rangeMax: 1,
      rangeStep: 0.01,
    }
  },
  computed: {
    rangeValueCSS() {
      return {
        '--range-value':
          'calc(' +
          this.rangeValue * 100 +
          '% - ' +
          (this.rangeValue * 0.5 + 0.75) +
          'rem)',
      }
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
