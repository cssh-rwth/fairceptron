<template>
  <div class="content-around flex flex-wrap justify-around">
    <svg
      v-for="(n, _, index) in people"
      :key="index"
      :class="n ? colors[0] : colors[1]"
      class="fill-current w-12 h-12 sm:w-16 sm:h-16 xl:h-24 xl:w-24 mx-6 sm:mx-12 lg:mx-20 xl:mx-24"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SelectionPersonas',
  props: {
    people: {
      type: Array,
      default: () => [0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1]
    },
    colors: {
      type: Array,
      default: () => ['text-teal-300', 'text-orange-300']
    }
  }
}
</script>

<style scoped></style>
