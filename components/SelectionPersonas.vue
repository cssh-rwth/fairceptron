<template>
  <div class="justify-center">
    <div
      class="grid w-full gap-1 xs:gap-2 sm:gap-4 lg:gap-8 grid-cols-3 xs:grid-cols-4 md:grid-cols-5"
    >
      <div
        v-for="(p, index) in personas"
        :key="index"
        :class="p.selected ? 'bg-green-100 border-green-400' : 'border-white'"
        class="p-2 flex-grow m-2 sm:p-4 relative rounded-lg border-4"
      >
        <svg
          :class="'text-' + colors[p.group] + '-400'"
          style="max-height: 10vh;"
          class="fill-current mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z"
          />
        </svg>
        <div
          v-if="showScores"
          class="absolute bottom-0 left-0 w-full text-center"
        >
          <div
            class="bg-gray-600 inline-block px-2 rounded-full text-xs lg:text-sm text-white"
          >
            {{ p.qualification }} %
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelectionPersonas',
  computed: {
    ...mapGetters(['personas', 'colors', 'showScores']),
  },
}
</script>

<style scoped></style>
