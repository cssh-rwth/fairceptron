<template>
  <div
    class="p-4 sm:pt-6 lg:pt-8 xl:pt-16 text-gray-700 text-sm sm:text-base md:text-lg xl:text-xl leading-loose"
  >
    Dieses Szenario besteht aus {{ personas.length }} Personen in
    {{ noOfGroups }} Gruppen:
    <span v-for="n in noOfGroups" :key="n"
      >{{ n === noOfGroups ? ' und' : n > 1 ? ',' : '' }}
      <span :class="colors[n - 1]" class="font-bold">
        {{ personasPerGroup[n - 1] }} {{ groupDescriptions[n - 1] }}</span
      ></span
    >.
    <br />
    <span v-if="questionType === 'selection'">
      <span v-if="noSelected > 1">Es werden {{ noSelected }} Personen</span>
      <span v-else>Es wird eine Person</span>
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
    <!-- force postcss to load classes -->
    <div
      class="text-teal-300 text-orange-300 text-yellow-300 text-purple-300"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionDescription',
  computed: {
    ...mapGetters([
      'personas',
      'colors',
      'showScores',
      'groupNames',
      'questionType',
      'personasPerGroup',
      'noOfGroups',
      'noSelected'
    ]),
    groupDescriptions() {
      if (this.groupNames.length > 0) return this.groupNames
      else {
        const descriptions = []
        for (let i = 0; i < this.noOfGroups; i++) {
          const descr = this.personasPerGroup[i] === 1 ? 'Person' : 'Personen'
          descriptions.push(descr + ' in Gruppe ' + (i + 1).toString())
        }
        return descriptions
      }
    }
  }
}
</script>

<style scoped></style>
