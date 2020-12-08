<template>
  <div>
    <div
      v-if="language === 'de'"
      class="max-w-6xl min-h-screen mx-auto p-4 sm:pt-6 lg:pt-8 xl:pt-16 sm:px-8"
    >
      <ProgressBar class="mb-4 sm:mb-6 lg:mb-8 xl:mb-16" :progress="progress" />

      <div
        class="font-semibold text-gray-700 text-base sm:text-lg md:text-xl xl:text-2xl"
      >
        Bitte beantworte abschließend noch die folgenden Fragen:
      </div>
      <div class="text-gray-700 text-sm sm:text-base xl:text-lg mt-4 mb-12">
        Alle Angaben sind selbstverständlich freiwillig. Für meine
        Bachelorarbeit bin ich aber auf möglichst vollständige Angaben
        angewiesen.
      </div>
      <div class="flex flex-col text-sm sm:text-base xl:text-lg text-gray-700">
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Wie wichtig ist dir, dass der Algorithmus genauso viele Frauen wie
            Männer auswählt bzw. Frauen und Männer abwechselnd in der Rangfolge
            auflistet?
          </div>
          <Range class="mt-4" :range-value.sync="values.genderParity" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Wie wichtig ist dir, dass der Algorithmus die am besten
            qualifizierten Kandidat:innen auswählt bzw. am höchsten in der
            Rangfolge auflistet?
          </div>
          <Range class="mt-4" :range-value.sync="values.accuracy" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Wenn Kandidat:innen ausgewählt werden, die weniger qualifiziert sind
            als andere: Wie wichtig ist dir, dass der Algorithmus dies in beiden
            Gruppen in gleichem Maße tut?
          </div>
          <Range class="mt-4" :range-value.sync="values.comparativeAccuracy" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Inwieweit glaubst du, dass deine Bewertungen aus dem FairCeptron für
            die Entwicklung fairer Entscheidungs-Algorithmen eingesetzt werden
            sollten?
          </div>
          <Range class="mt-4 lg:mt-0" :range-value.sync="values.believe" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Wie hoch ist dein Vertrauen in maschinell getroffene Entscheidungen?
          </div>
          <Range
            class="mt-4 lg:mt-0"
            label-left="Sehr niedrig"
            label-right="Sehr hoch"
            :range-value.sync="values.confidence"
          />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Inwieweit befürchtest du, dass maschinell getroffene Entscheidungen
            außer Kontrolle geraten könnten?
          </div>
          <Range class="mt-4 lg:mt-0" :range-value.sync="values.fear" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Wie hoch ist deine Bereitschaft, an einem maschinell durchgeführten
            Bewerbungsverfahren teilzunehmen, statt an einem Verfahren mit
            menschlichen Entscheidern?
          </div>
          <Range
            class="mt-4 xl:mt-0"
            label-left="Sehr niedrig"
            label-right="Sehr hoch"
            :range-value.sync="values.will"
          />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">Wie religiös bist du?</div>
          <Range class="mt-4" :range-value.sync="values.religious" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Wie sind deine politischen Ansichten?
          </div>
          <Range
            class="mt-4"
            label-left="Konservativ"
            label-right="Progressiv"
            :range-value.sync="values.political"
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
              <option value="doktor">Promotion oder gleichwertig</option>
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
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            Was ist dein Geschlecht?
          </div>
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
    <div
      v-else-if="language === 'en'"
      class="max-w-6xl min-h-screen mx-auto p-4 sm:pt-6 lg:pt-8 xl:pt-16 sm:px-8"
    >
      <ProgressBar class="mb-4 sm:mb-6 lg:mb-8 xl:mb-16" :progress="progress" />

      <div
        class="font-semibold text-gray-700 text-base sm:text-lg md:text-xl xl:text-2xl"
      >
        Finally, please answer the following questions:
      </div>
      <div class="text-gray-700 text-sm sm:text-base xl:text-lg mt-4 mb-12">
        All information is of course voluntary. For my bachelor thesis, however,
        I am dependent on information that is as complete as possible.
      </div>
      <div class="flex flex-col text-sm sm:text-base xl:text-lg text-gray-700">
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            How important is it to you that the algorithm selects as many women
            as men and alternately lists women and men in the ranking?
          </div>
          <Range class="mt-4" :range-value.sync="values.genderParity" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            How important is it to you that the algorithm selects the best
            qualified candidates and lists them highest in the ranking?
          </div>
          <Range class="mt-4" :range-value.sync="values.accuracy" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            When candidates are selected who are less qualified than others: How
            important is it to you that the algorithm does this equally in both
            groups?
          </div>
          <Range class="mt-4" :range-value.sync="values.comparativeAccuracy" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            To what extent do you believe that your evaluations from the
            FairCeptron should be used to develop fair decision algorithms?
          </div>
          <Range class="mt-4 lg:mt-0" :range-value.sync="values.believe" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            How high is your confidence in machine-made decisions?
          </div>
          <Range
            class="mt-4 lg:mt-0"
            label-left="Very low"
            label-right="Very high"
            :range-value.sync="values.confidence"
          />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            To what extent do you fear that machine-made decisions could get out
            of control?
          </div>
          <Range class="mt-4 lg:mt-0" :range-value.sync="values.fear" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-center min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            How willing are you to participate in an automated application
            procedure instead of a procedure with human decision-makers?
          </div>
          <Range class="mt-4 xl:mt-0" :range-value.sync="values.will" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">How religious are you?</div>
          <Range class="mt-4" :range-value.sync="values.religious" />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap items-end min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            What are your political views
          </div>
          <Range
            class="mt-4"
            label-left="Conservative"
            label-right="Progressive"
            :range-value.sync="values.political"
          />
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
            What is your highest educational level?
          </div>
          <div class="flex-grow lg:ml-8">
            <select
              v-model="values.edu"
              class="form-select block w-full sm:w-1/2 lg:w-2/5"
            >
              <option value="none">none</option>
              <option value="realschule">lower secondary education</option>
              <option value="abitur">graduated highschool</option>
              <option value="ausbildung">vocational training</option>
              <option value="bachelor">bachelor</option>
              <option value="master">master</option>
              <option value="doktor">doctoral</option>
            </select>
          </div>
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">How old are you?</div>
          <div class="flex-grow lg:ml-8">
            <select
              v-model="values.age"
              class="form-select block w-full sm:w-1/2 lg:w-2/5"
            >
              <option value="18">18 or younger</option>
              <option value="25">19 to 25</option>
              <option value="35">26 to 35</option>
              <option value="45">36 to 45</option>
              <option value="55">46 to 55</option>
              <option value="65">56 to 65</option>
              <option value="75">66 to 75</option>
              <option value="76">older than 75</option>
            </select>
          </div>
        </div>
        <hr class="my-6" />
        <div class="flex flex-wrap min-w-full">
          <div class="w-full lg:w-2/5 mb-4 lg:mb-0">What is your gender?</div>
          <div class="flex-grow lg:ml-8">
            <select
              v-model="values.gender"
              class="form-select block w-full sm:w-1/2 lg:w-2/5"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
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
          Next
        </nuxt-link>
      </div>
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
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'questions-id') return 'slide-left'
    if (from.name === 'personality') return 'slide-right'
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
        screenHeight: null,
        screenWidth: null,
        genderParity: null,
        accuracy: null,
        comparativeAccuracy: null,
      },
    }
  },
  computed: {
    ...mapGetters(['totalQuestions', 'language']),
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
    // query the screen size
    this.values.screenHeight = window.screen.height
    this.values.screenWidth = window.screen.width
  },
  methods: {
    sendDemographics() {
      this.$store.dispatch('sendDemographics', this.values)
    },
  },
}
</script>

<style scoped></style>
