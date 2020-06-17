<template>
  <div class="flex flex-grow justify-center items-center my-4">
    <div class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1">
      {{ labelLeft }}
    </div>
    <input
      v-model="ratingValue"
      type="range"
      :min="ratingMin"
      :max="ratingMax"
      :step="ratingStep"
      :class="ratingSelected ? 'range-visible' : 'range-invisible'"
      class="mx-4 w-full"
      @mousedown="enterSelection"
      @touchstart="enterSelection"
    />
    <div class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1">
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
      default: 'Gar nicht'
    },
    labelRight: {
      type: String,
      default: 'Sehr'
    }
  },
  data() {
    return {
      ratingSelected: false,
      ratingValue: undefined,
      ratingMin: 0,
      ratingMax: 1,
      ratingStep: 0.001
    }
  },
  watch: {
    ratingValue(val, oldVal) {
      this.$emit('value', val)
    }
  },
  methods: {
    enterSelection() {
      this.ratingSelected = true
    }
  }
}
</script>

<style scoped>
@import '~assets/css/range.css';
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
