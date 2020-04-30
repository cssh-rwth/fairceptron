<template>
  <form>
    <ul>
      <li v-for="ratingLevel in ratingLevels" :key="ratingLevel">
        {{ ratingLevel }}
      </li>
    </ul>
    <button type="submit">{{ confirmName }}</button>
  </form>
</template>

<script>
export default {
  name: 'RatingBar',
  data() {
    return {
      ratingLevels: [
        'sehr unfair',
        'etwas unfair',
        'ausgeglichen',
        'etwas fair',
        'sehr fair'
      ],
      confirmName: 'Nächste Frage'
    }
  }
}
</script>

<style scoped></style>
