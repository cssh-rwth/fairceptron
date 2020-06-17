<template>
  <div class="flex flex-grow items-end relative justify-center">
    <div
      v-for="n in levels.length"
      :key="n"
      class="text-center flex-grow flex-1 z-10"
    >
      <div
        style="min-width: 3.7rem"
        class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
        @click="ratingSelected = n"
      >
        {{ levels[n - 1] }}
      </div>
      <input
        v-model="ratingSelected"
        type="radio"
        class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
        :name="name"
        :value="n"
      />
    </div>
    <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
  </div>
</template>

<script>
export default {
  name: 'RadioBar',
  props: {
    name: {
      type: String,
      default: ''
    },
    levels: {
      type: Array,
      default: () => {
        return [1, 2, 3, 4, 5]
      }
    }
  },
  data() {
    return {
      ratingSelected: ''
    }
  }
}
</script>

<style scoped></style>
