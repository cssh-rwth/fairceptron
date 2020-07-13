<template>
  <div
    class="max-w-6xl min-h-screen mx-auto p-4 sm:pt-6 lg:pt-8 xl:pt-16 sm:px-8"
  >
    <ProgressBar class="mb-4 sm:mb-6 lg:mb-8 xl:mb-16" :progress="progress" />

    <div
      class="font-semibold text-gray-700 text-base sm:text-lg md:text-xl xl:text-2xl"
    >
      Bitte beantworte abschließend noch die folgenden Fragen:
    </div>
    <div class="text-gray-700 text-sm sm:text-base xl:text-lg mt-4 mb-12">
      Alle Angaben sind selbstverständlich freiwillig. Für meine Bachelorarbeit
      bin ich aber auf möglichst vollständige Angaben angewiesen.
    </div>
    <div class="flex flex-col text-sm sm:text-base xl:text-lg text-gray-700">
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Inwieweit glaubst du, dass deine Bewertungen aus dem Fairceptron für
          die Entwicklung fairer Entscheidungs-Algorithmen eingesetzt werden
          sollten?
        </div>
        <Range class="mt-4 xl:mt-0" @value="values.believe = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">Wie religiös bist du?</div>
        <Range class="mt-4 xl:mt-0" @value="values.religious = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Wie sind deine politischen Ansichten?
        </div>
        <Range
          class="mt-4 xl:mt-0"
          label-left="Konservativ"
          label-right="Progressiv"
          @value="values.political = $event"
        />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Wie hoch ist dein Vertrauen in maschinell getroffene Entscheidungen?
        </div>
        <Range
          class="mt-4 xl:mt-0"
          label-left="Sehr niedrig"
          label-right="Sehr hoch"
          @value="values.confidence = $event"
        />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Inwieweit befürchtest du, dass maschinell getroffene Entscheidungen
          außer Kontrolle geraten könnten?
        </div>
        <Range class="mt-4 xl:mt-0" @value="values.fear = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Wie hoch ist deine Bereitschaft, an einem maschinell durchgeführten
          Bewerbungsverfahren teilzunehmen, statt an einem Verfahren mit
          menschlichen Entscheidern?
        </div>
        <Range
          class="mt-4 xl:mt-0"
          label-left="Sehr niedrig"
          label-right="Sehr hoch"
          @value="values.will = $event"
        />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Was ist dein höchster Bildungsabschluss?
        </div>
        <div class="flex-grow lg:ml-8">
          <select
            v-model="values.edu"
            class="form-select block w-full sm:w-1/2 lg:w-2/5"
          >
            <option value="none">Kein Schulabschluss</option>
            <option value="realschule">
              Mittlerer Schulabschluss (10. Klasse)
            </option>
            <option value="abitur">Abitur</option>
            <option value="ausbildung">Abgeschlossene Ausbildung</option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master oder Diplom</option>
          </select>
        </div>
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">Wie alt bist du?</div>
        <div class="flex-grow lg:ml-8">
          <select
            v-model="values.age"
            class="form-select block w-full sm:w-1/2 lg:w-2/5"
          >
            <option value="18">18 oder jünger</option>
            <option value="25">19 bis 25</option>
            <option value="35">26 bis 35</option>
            <option value="45">36 bis 45</option>
            <option value="55">46 bis 55</option>
            <option value="65">56 bis 65</option>
            <option value="75">66 bis 75</option>
            <option value="76">älter als 75</option>
          </select>
        </div>
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">Was ist dein Geschlecht?</div>
        <div class="flex-grow lg:ml-8">
          <select
            v-model="values.gender"
            class="form-select block w-full sm:w-1/2 lg:w-2/5"
          >
            <option value="female">Weiblich</option>
            <option value="male">Männlich</option>
            <option value="other">Divers</option>
          </select>
        </div>
      </div>
    </div>
    <div class="w-full text-center my-16">
      <nuxt-link
        to="personality"
        class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        @click.native="sendDemographics()"
      >
        Weiter
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Range from '~/components/Range'
import ProgressBar from '~/components/ProgressBar'

export default {
  components: {
    Range,
    ProgressBar,
  },
  data() {
    return {
      values: {
        religious: null,
        political: null,
        confidence: null,
        fear: null,
        will: null,
        believe: null,
        edu: null,
        income: null,
        age: null,
        gender: null,
      },
    }
  },
  computed: {
    ...mapGetters(['totalQuestions']),
    progress() {
      return Math.round(
        ((this.totalQuestions + 1) / (this.totalQuestions + 3)) * 100 // + landingPage + 2xdemographics
      )
    },
  },
  beforeCreate() {
    // start the timer
    this.$store.commit('startTimer')
  },
  mounted() {
    // user unknown
    if (!this.$store.getters.userID) {
      // load previously persisted UserID
      if (this.$store.getters.localUserID) {
        this.$store.commit('loadUserID')
        this.$store.dispatch('loadUser', this.$store.getters.userID)
      }
      // register a new user
      else {
        const persistant = true
        this.$store.dispatch('registerUser', persistant)
      }
    }
    // user known, but questions not loaded
    else if (!this.$store.getters.totalQuestions) {
      this.$store.dispatch('loadQuestions')
    }
  },
  methods: {
    sendDemographics() {
      this.$store.dispatch('sendDemographics', this.values)
    },
  },
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'questions-id') return 'slide-left'
    if (from.name === 'personality') return 'slide-right'
  },
}
</script>

<style scoped></style>
