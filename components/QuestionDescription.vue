<template>
  <div
    class="p-4 sm:pt-6 lg:pt-8 xl:pt-16 text-gray-700 text-sm sm:text-base md:text-lg xl:text-xl leading-loose"
  >
    <ProgressBar class="mb-6 sm:mb-8 lg:mb-10 xl:mb-20" :progress="progress" />

    Es bewerben sich {{ personas.length }} Personen auf gleiche Studienplätze:
    <span v-for="n in noOfGroups" :key="n"
      >{{ n === noOfGroups ? ' und' : n > 1 ? ',' : '' }}
      <span :class="colors[n - 1]" class="font-bold">
        {{ personasPerGroup[n - 1] }} {{ groupDescriptions[n - 1] }}</span
      ></span
    >.
    <br />
    <span v-if="questionType === 'selection'">
      Aus den Bewerber:innen
      <span v-if="noSelected > 1">werden {{ noSelected }} Personen</span>
      <span v-else>wird eine Person</span>
      von einem Algorithmus
      <span class="border-2 p-px px-1 border-green-500 rounded bg-green-100"
        >ausgewählt</span
      >
      und
      <span v-if="noSelected > 1">erhalten</span>
      <span v-else>erhält</span>
      einen Studienplatz.
    </span>
    <span v-else-if="questionType === 'ranking'">
      Sie werden von einem Algorithmus in folgender Rangfolge sortiert. Je höher
      eine Person in der Rangfolge steht, desto wahrscheinlicher erhält sie
      einen Studienplatz.
    </span>
    <br />
    <span v-if="showScores">
      Zusätzlich wird die
      <span class="text-white bg-gray-600 rounded-full px-2 py-px"
        >Qualifikation</span
      >
      jeder Person neben ihr angezeigt.
    </span>
    <br />
    Für wie fair empfindest du
    <span v-if="questionType === 'selection'">die Auswahl</span>
    <span v-else-if="questionType === 'ranking'">die Rangfolge</span>?
    <!-- force postcss to load classes -->
    <div
      class="text-teal-300 text-orange-300 text-yellow-300 text-purple-300"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProgressBar from '~/components/ProgressBar'

export default {
  name: 'QuestionDescription',
  components: {
    ProgressBar,
  },
  computed: {
    ...mapGetters([
      'personas',
      'colors',
      'showScores',
      'groupNames',
      'questionType',
      'personasPerGroup',
      'noOfGroups',
      'noSelected',
      'currentNo',
      'totalQuestions',
    ]),
    progress() {
      if (!this.totalQuestions) return 0
      return Math.round(
        ((this.currentNo + 1) / (this.totalQuestions + 3)) * 100 // + landingPage + 2xdemographics
      )
    },
    groupDescriptions() {
      const names = this.groupNames
      if (names.length === 0) {
        const descriptions = []
        for (let i = 0; i < this.noOfGroups; i++) {
          const descr = this.personasPerGroup[i] === 1 ? 'Person' : 'Personen'
          descriptions.push(descr + ' in Gruppe ' + (i + 1).toString())
        }
        return descriptions
      } else if (names.length === 2) {
        if (names[0] === 'Männer' && this.personasPerGroup[0] === 1)
          names[0] = 'Mann'
        if (names[1] === 'Männer' && this.personasPerGroup[1] === 1)
          names[1] = 'Mann'
        if (names[0] === 'Frauen' && this.personasPerGroup[0] === 1)
          names[0] = 'Frau'
        if (names[1] === 'Frauen' && this.personasPerGroup[1] === 1)
          names[1] = 'Frau'
      }
      return names
    },
  },
}
</script>

<style scoped></style>
