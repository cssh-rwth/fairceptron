<template>
  <div class="bg-gray-200 min-w-full md:min-w-0 md:w-lg mx-auto">
    <div v-for="(p, _, index) in personas" :key="index">
      {{ p.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankingPersonas',
  props: {
    personas: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
