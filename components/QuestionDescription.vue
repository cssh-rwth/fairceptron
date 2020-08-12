<template>
  <div>
    <div
      v-if="language === 'de'"
      class="text-gray-700 text-sm md:text-base lg:text-lg xl:text-xl leading-loose"
    >
      Es bewerben sich {{ personas.length }} Personen auf Studienplätze:
      <span v-for="n in noOfGroups" :key="n"
        >{{ n === noOfGroups ? ' und' : n > 1 ? ',' : '' }}
        <span :class="'text-' + colors[n - 1] + '-400'" class="font-semibold">
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
        Sie werden von einem Algorithmus in folgender Rangfolge sortiert. Je
        höher eine Person in der Rangfolge steht, desto wahrscheinlicher erhält
        sie einen Studienplatz.
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
    </div>
    <div
      v-else-if="language === 'en'"
      class="text-gray-700 text-sm md:text-base lg:text-lg xl:text-xl leading-loose"
    >
      {{ personas.length }} people apply for university admission:
      <span v-for="n in noOfGroups" :key="n"
        >{{ n === noOfGroups ? ' und' : n > 1 ? ',' : '' }}
        <span :class="'text-' + colors[n - 1] + '-400'" class="font-semibold">
          {{ personasPerGroup[n - 1] }} {{ groupDescriptions[n - 1] }}</span
        ></span
      >.
      <br />
      <span v-if="questionType === 'selection'">
        {{ noSelected }} of the applicants
        <span v-if="noSelected > 1">get</span>
        <span v-else>gets</span>
        <span class="border-2 p-px px-1 border-green-500 rounded bg-green-100"
          >selected</span
        >
        by the algorithm and
        <span v-if="noSelected > 1">are</span>
        <span v-else>is</span>
        admitted to university.
      </span>
      <span v-else-if="questionType === 'ranking'">
        They are ranked by the algorithm in the following order. The higher the
        rank of an applicant, the higher the chance of admission to university.
      </span>
      <br />
      <span v-if="showScores">
        Furthermore, the
        <span class="text-white bg-gray-600 rounded-full px-2 py-px"
          >qualification</span
        >
        of each person is displayed next to it.
      </span>
      <br />
      How fair do you think the
      <span v-if="questionType === 'selection'">selection</span>
      <span v-else-if="questionType === 'ranking'">ranking</span> is?
    </div>
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
      'noSelected',
      'currentNo',
      'totalQuestions',
      'language',
    ]),
    groupDescriptions() {
      const names = this.groupNames
      if (this.language === 'de') {
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
      } else if (this.language === 'en') {
        if (names.length === 0) {
          const descriptions = []
          for (let i = 0; i < this.noOfGroups; i++) {
            const descr = this.personasPerGroup[i] === 1 ? 'person' : 'people'
            descriptions.push(descr + ' in group ' + (i + 1).toString())
          }
          return descriptions
        } else if (names.length === 2) {
          if (names[0] === 'Männer' && this.personasPerGroup[0] === 1)
            names[0] = 'man'
          if (names[1] === 'Männer' && this.personasPerGroup[1] === 1)
            names[1] = 'man'
          if (names[0] === 'Männer' && this.personasPerGroup[0] > 1)
            names[0] = 'men'
          if (names[1] === 'Männer' && this.personasPerGroup[1] > 1)
            names[1] = 'men'
          if (names[0] === 'Frauen') names[0] = 'women'
          if (names[1] === 'Frauen') names[1] = 'women'
        }
      }
      return names
    },
  },
}
</script>

<style scoped></style>
