<template>
  <div
    class="min-w-full sm:min-w-0 sm:w-xl mx-auto divide-y divide-gray-400 px-4"
  >
    <div
      v-for="(p, index) in personas"
      :key="index"
      class="flex flex-no-wrap justify-around"
    >
      <div class="text-gray-700 m-2 text-lg w-4 text-right self-center">
        <span class="align-middle">{{ index + 1 + '.' }}</span>
      </div>
      <svg
        :class="colors[p.group]"
        class="fill-current w-8 sm:w-10 lg:w-12 my-4 mx-12"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
        />
      </svg>
      <div
        v-if="showScores"
        class="self-center bg-gray-600 inline-block px-2 rounded-full text-xs lg:text-sm text-white"
      >
        {{ p.qualification }} %
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RankingPersonas',
  computed: {
    ...mapGetters({
      personas: 'personasSorted',
      colors: 'colors',
      showScores: 'showScores',
    }),
  },
}
</script>

<style scoped></style>
