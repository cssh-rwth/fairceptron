<template>
  <div class="w-full sm:px-8">
    <form
      class="w-full max-w-4xl p-4 mb-4 sm:mb-8 lg:mb-16 xl:mb-32 mx-auto flex flex-wrap items-end justify-center"
    >
      <div class="flex flex-grow items-end relative justify-center">
        <div
          v-for="n in ratingLevels"
          :key="n"
          class="text-center flex-grow flex-1 z-10"
        >
          <div
            class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
            @click="ratingSelected = n"
          >
            {{ ratingLevelsDE[n - 1] }}
          </div>
          <input
            v-model="ratingSelected"
            type="radio"
            class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
            name="ratingLevel"
            :value="n"
          />
        </div>
        <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
      </div>
      <button
        type="submit"
        :disabled="ratingSelected === ''"
        class="px-2 py-1 sm:px-4 sm:py-2 mt-6 rounded text-white flex-none button"
      >
        {{ confirmNameDE }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RatingBar',
  data() {
    return {
      ratingSelected: '',
      ratingLevels: 5,
      ratingLevelsDE: [
        'sehr unfair',
        'unfair',
        'ausgeglichen',
        'fair',
        'sehr fair'
      ],
      confirmNameDE: 'Nächste Frage'
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
</style>
