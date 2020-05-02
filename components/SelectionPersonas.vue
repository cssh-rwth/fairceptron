<template>
  <div
    class="grid gap-2 p-2 grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7"
  >
    <div
      v-for="(p, _, index) in personas"
      :key="index"
      :class="p.selected ? 'bg-green-100' : 'border-none'"
      class="p-2 m-2 sm:p-4 sm:m-4 lg:m-8 relative rounded-lg border-4 border-green-400"
    >
      <svg
        :class="colors[p.group]"
        class="fill-current"
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
          {{ p.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectionPersonas',
  props: {
    personas: {
      type: Array,
      required: true
    },
    colors: {
      type: Array,
      default: () => [
        'text-teal-300',
        'text-orange-300',
        'text-pink-300',
        'text-yellow-300',
        'text-purple-300'
      ]
    },
    showScores: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped></style>
