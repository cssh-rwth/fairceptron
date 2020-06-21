<template>
  <div class="max-w-6xl min-h-screen mx-auto px-4 sm:px-8">
    <div
      class="font-semibold text-gray-700 text-base sm:text-lg mt-4 sm:mt-12 md:text-xl xl:text-2xl"
    >
      Gleich fertig! Bitte beantworte abschließend noch die folgenden Fragen:
    </div>
    <div class="text-gray-700 text-sm sm:text-base xl:text-lg mt-4 mb-12">
      Alle Angaben sind selbstverständlich freiwillig. Für meine Bachelorarbeit
      bin ich aber auf möglichst vollständige Angaben angewiesen
    </div>
    <div class="flex flex-col text-sm sm:text-base xl:text-lg text-gray-700">
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Inwieweit glaubst du, dass deine Bewertungen aus dem Fairceptron für
          die Entwicklung fairer Entscheidungs-Algorithmen eingesetzt werden
          sollten?
        </div>
        <Range
          label-left="Sehr niedrig"
          label-right="Sehr hoch"
          @value="values.believe = $event"
        />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">Wie religiös bist du?</div>
        <Range @value="values.religious = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Wie sind deine politischen Ansichten?
        </div>
        <Range
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
        <Range @value="values.fear = $event" />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Wie hoch ist deine Bereitschaft, an einem maschinell durchgeführten
          Bewerbungsverfahren teilzunehmen, statt an einem Verfahren mit
          menschlichen Entscheidern?
        </div>
        <Range
          label-left="Sehr niedrig"
          label-right="Sehr hoch"
          @value="values.will = $event"
        />
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Was ist dein höchster Bildungsgrad?
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
            <option value="attended_college">
              Hochschule / Universität besucht
            </option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master oder Diplom</option>
          </select>
        </div>
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">
          Wie hoch ist dein Jahreseinkommen?
          <br />
          (Netto und inklusive Kapitalerträge, Renten, Stipendien etc.)
        </div>
        <div class="flex-grow lg:ml-8">
          <select
            v-model="values.income"
            class="form-select block w-full sm:w-1/2 lg:w-2/5"
          >
            <option value="< 5000">weniger als 5000 €</option>
            <option value="5001 - 10000">5.001 € bis 10.000 €</option>
            <option value="10001 - 15000">10.001 € bis 15.000 €</option>
            <option value="15001 - 25000">15.001 € bis 25.000 €</option>
            <option value="25001 - 35000">25.001 € bis 35.000 €</option>
            <option value="35001 - 50000">35.001 € bis 50.000 €</option>
            <option value="50001 - 85000">50.001 € bis 85.000 €</option>
            <option value="85001 - 100000">85.001 € bis 100.000 €</option>
            <option value="> 100000">Mehr als 100.000 €</option>
          </select>
        </div>
      </div>
      <hr class="my-6" />
      <div class="flex flex-wrap min-w-full">
        <div class="w-full lg:w-2/5 mb-4 lg:mb-0">Wie alt bist du?</div>
        <div class="flex-grow lg:ml-8">
          <input
            v-model="values.age"
            type="number"
            class="form-input block w-full sm:w-1/2 lg:w-2/5"
            placeholder="Alter eingeben"
          />
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
    <div
      class="font-semibold text-gray-700 text-base sm:text-lg mt-24 md:text-xl xl:text-2xl"
    >
      Inwieweit treffen die folgenden Aussagen auf dich zu?
    </div>
    <div class="text-gray-700 text-sm sm:text-base xl:text-lg mt-4 mb-12">
      Die Antwortmöglichkeiten sind gegliedert wie folgt:
      <br />
      1: Trifft überhaupt nicht zu &ndash; 2: Trifft eher nicht zu &ndash; 3:
      Weder noch &ndash; 4: Eher zutreffend &ndash; 5: Trifft voll und ganz zu
    </div>
    <div class="flex flex-col text-gray-700 text-sm sm:text-base xl:text-lg">
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
      Was ist dir durch den Kopf gegangen, als du mit denverschiedenen Szenarien
      konfrontiert wurdest? Was war für deine Entscheidungen ausschlaggebend?
      Welche Paramter wurden im Design des Fairceptrons missachtet? Hast du
      weitere Anmerkungen?
    </div>
    <textarea
      v-model="values.comment"
      class="form-textarea mt-1 block w-full text-gray-700 text-sm sm:text-base xl:text-lg"
      rows="10"
      placeholder="Text eingeben."
    ></textarea>
    <div class="w-full text-center my-16">
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        @click.prevent="finishSurvey()"
      >
        Absenden
      </button>
    </div>
  </div>
</template>

<script>
import RadioBar from '~/components/demographics/RadioBar'
import Range from '~/components/demographics/Range'

export default {
  components: {
    RadioBar,
    Range,
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
    }
  },
  methods: {
    finishSurvey() {
      this.$store.dispatch('sendDemographics', this.values)
      this.$router.push('finish')
    },
  },
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'questions-id') return 'slide-left'
    if (from.name === 'finish') return 'slide-right'
  },
}
</script>

<style scoped></style>
