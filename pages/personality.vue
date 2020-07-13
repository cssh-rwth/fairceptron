<template>
  <div
    class="max-w-6xl min-h-screen mx-auto p-4 sm:pt-6 lg:pt-8 xl:pt-16 sm:px-8"
  >
    <ProgressBar class="mb-4 sm:mb-6 lg:mb-8 xl:mb-16" :progress="progress" />

    <div
      class="font-semibold mb-0 lg:mb-6 text-gray-700 text-base sm:text-lg md:text-xl xl:text-2xl"
    >
      Gleich fertig! Inwieweit treffen die folgenden Aussagen auf dich zu?
    </div>
    <div class="flex flex-col text-gray-700 text-sm sm:text-base xl:text-lg">
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">&nbsp;</div>
        <div class="flex flex-grow items-start justify-center lg:max-w-3/5">
          <div
            v-for="n in levels.length"
            :key="n"
            class="text-center flex-grow flex-1"
          >
            <div
              class="mx-1 sm:mx-2 lg:mx-3 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700 leading-tight"
              @click="ratingSelected = n"
            >
              {{ n }}: <br />
              {{ levels[n - 1] }}
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich bin eher zurückhaltend, reserviert.
        </div>
        <RadioBar name="BFI-1" @value="values.bfi1 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich schenke anderen leicht Vertrauen, glaube an das Gute im Menschen.
        </div>
        <RadioBar name="BFI-2" @value="values.bfi2 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich bin bequem, neige zur Faulheit.
        </div>
        <RadioBar name="BFI-3" @value="values.bfi3 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich bin entspannt, lasse mich durch Stress nicht aus der Ruhe bringen.
        </div>
        <RadioBar name="BFI-4" @value="values.bfi4 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich habe nur wenig künstlerisches Interesse.
        </div>
        <RadioBar name="BFI-5" @value="values.bfi5 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich gehe aus mir heraus, bin gesellig.
        </div>
        <RadioBar name="BFI-6" @value="values.bfi6 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich neige dazu, andere zu kritisieren.
        </div>
        <RadioBar name="BFI-7" @value="values.bfi7 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich erledige Aufgaben gründlich.
        </div>
        <RadioBar name="BFI-8" @value="values.bfi8 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich werde leicht nervös und unsicher.
        </div>
        <RadioBar name="BFI-9" @value="values.bfi9 = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Ich habe eine aktive Vorstellungskraft, bin phantasievoll.
        </div>
        <RadioBar name="BFI-10" @value="values.bfi10 = $event" />
      </div>
    </div>
    <div
      class="font-semibold text-gray-700 text-base sm:text-lg mt-24 md:text-xl xl:text-2xl"
    >
      Hast du noch Kommentare oder Hinweise?
    </div>
    <div class="text-gray-700 text-sm sm:text-base xl:text-lg mt-4 mb-12">
      Was ist dir durch den Kopf gegangen, als du mit den verschiedenen
      Szenarien konfrontiert wurdest? Was war für deine Entscheidungen
      ausschlaggebend? Welche Parameter wurden im Design des FairCeptrons
      missachtet? Hast du weitere Anmerkungen?
    </div>
    <textarea
      v-model="values.comment"
      class="form-textarea mt-1 block w-full text-gray-700 text-sm sm:text-base xl:text-lg"
      rows="10"
      placeholder="Text eingeben."
    ></textarea>
    <div class="w-full text-center my-16">
      <nuxt-link
        to="finish"
        class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        @click.native="finishSurvey()"
      >
        Absenden
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RadioBar from '~/components/RadioBar'
import ProgressBar from '~/components/ProgressBar'

export default {
  components: {
    RadioBar,
    ProgressBar,
  },
  data() {
    return {
      values: {
        bfi1: null,
        bfi2: null,
        bfi3: null,
        bfi4: null,
        bfi5: null,
        bfi6: null,
        bfi7: null,
        bfi8: null,
        bfi9: null,
        bfi10: null,
        comment: null,
      },
      levels: [
        'Trifft überhaupt nicht zu',
        'Trifft eher nicht zu',
        'Weder noch',
        'Eher zutreffend',
        'Trifft voll und ganz zu',
      ],
    }
  },
  computed: {
    ...mapGetters(['totalQuestions']),
    progress() {
      return Math.round(
        ((this.totalQuestions + 2) / (this.totalQuestions + 3)) * 100 // + landingPage + 2xdemographics
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
    finishSurvey() {
      this.$store.dispatch('sendPersonality', this.values)
    },
  },
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'demographics') return 'slide-left'
    if (from.name === 'finish') return 'slide-right'
  },
}
</script>

<style scoped></style>
