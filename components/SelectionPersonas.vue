<template>
  <div
    class="grid gap-2 p-2 grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7"
  >
    <div
      v-for="(n, _, index) in people"
      :key="index"
      class="p-4 sm:p-8 lg:p-12 relative"
    >
      <svg
        :class="n[0] ? colors[0] : colors[1]"
        class="fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
        />
      </svg>
      <svg
        v-if="n[1]"
        style="max-width: 20%"
        class="fill-current text-green-600 absolute bottom-0 right-0 mr-2 mb-2 w-full sm:mb-4 sm:mr-4 lg:mb-8 lg:mr-8 bg-white rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectionPersonas',
  props: {
    people: {
      type: Array,
      default: () => [
        [0, 0],
        [1, 0],
        [0, 0],
        [0, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [0, 0],
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 1],
        [0, 0],
        [1, 0],
        [1, 0],
        [1, 0]
      ]
    },
    colors: {
      type: Array,
      default: () => ['text-teal-300', 'text-orange-300']
    }
  }
}
</script>

<style scoped></style>
