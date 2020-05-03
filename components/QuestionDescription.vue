<template>
  <div
    class="p-4 sm:pt-6 lg:pt-8 xl:pt-16 text-gray-700 text-sm sm:text-base md:text-lg xl:text-xl leading-loose"
  >
    Dieses Szenario besteht aus {{ personas.length }} Personen in
    {{ noOfGroups }} Gruppen:
    <span v-for="n in noOfGroups" :key="n">
      {{ n === noOfGroups ? 'und' : n > 1 ? ',' : '' }}
      <span :class="colors[n - 1]" class="font-bold">
        {{ personasPerGroup[n - 1] }} {{ groupNames[n - 1] }}</span
      ></span
    >.
    <br />
    <span v-if="questionType === 'selection'">
      Es werden {{ noSelected }} Personen
      <span class="border-2 p-px px-1 border-green-500 rounded bg-green-100">
        ausgewählt</span
      >.
    </span>
    <span v-else-if="questionType === 'ranking'">
      Sie werden in folgendem Ranking sortiert.
    </span>
    <span v-if="showScores">
      Zusätzlich wird die
      <span class="text-white bg-gray-600 rounded-full px-2 py-px">
        Qualifikation</span
      >
      jeder Person neben ihr angezeigt.
    </span>
    <br />
    Für wie fair empfindest du
    <span v-if="questionType === 'selection'">die Auswahl</span>
    <span v-else-if="questionType === 'ranking'">das Ranking</span>?
  </div>
</template>

<script>
export default {
  name: 'QuestionDescription',
  props: {
    personas: {
      type: Array,
      required: true
    },
    questionType: {
      type: String,
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
    },
    groupNames: {
      type: Array,
      default: () => [
        'Personen in Gruppe 1',
        'Personen in Gruppe 2',
        'Personen in Gruppe 3',
        'Personen in Gruppe 4',
        'Personen in Gruppe 5'
      ]
    }
  },
  computed: {
    personasPerGroup() {
      const groupCount = []
      for (let i = 0; i < 5; i++)
        groupCount.push(this.personas.filter((p) => p.group === i).length)
      return groupCount
    },
    noOfGroups() {
      return this.personasPerGroup.filter((g) => g !== 0).length
    },
    noSelected() {
      return this.personas.filter((p) => p.selected).length
    }
  }
}
</script>

<style scoped></style>
