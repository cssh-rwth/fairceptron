<template>
  <div class="max-w-6xl min-h-screen mx-auto">
    <div class="text-base sm:text-lg my-12 md:text-xl xl:text-2xl">
      Gleich fertig! Bitte beantworte abschließend noch die folgenden Fragen:
    </div>
    <div class="flex flex-col text-sm sm:text-base md:text-lg xl:text-xl">
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Wie religiös bist du?</div>
        <Range @value="values.religious = $event" />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Wie sind deine politischen Ansichten?</div>
        <Range
          label-left="Konservativ"
          label-right="Progressiv"
          @value="values.political = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Wie hoch ist dein Vertrauen in maschinell getroffene Entscheidungen?
        </div>
        <Range
          label-left="Sehr niedrig"
          label-right="Sehr hoch"
          @value="values.confidence = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Inwieweit befürchtest du, dass Maschinen außer Kontrolle geraten
          könnten?
        </div>
        <Range @value="values.fear = $event" />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Wie groß ist deine Bereitschaft, an einem maschinell durchgeführten
          Bewerbungsverfahren teilzunehmen?
        </div>
        <Range @value="values.will = $event" />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Was ist dein höchster Bildungsgrad?
        </div>
        <div class="flex-grow">
          <select v-model="values.edu" class="form-select block">
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
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Wie hoch ist dein Jahreseinkommen? (Netto, inklusive Kapitalerträge,
          Renten etc.)
        </div>
        <div class="flex-grow">
          <select v-model="values.income" class="form-select block">
            <option value="5000">weniger als 5000 €</option>
            <option value="10000">5.001 € bis 10.000 €</option>
            <option value="15000">10.001 € bis 15.000 €</option>
            <option value="25000">15.001 € bis 25.000 €</option>
            <option value="35000">25.001 € bis 35.000 €</option>
            <option value="50000">35.001 € bis 50.000 €</option>
            <option value="85000">50.001 € bis 85.000 €</option>
            <option value="100000">85.001 € bis 100.000 €</option>
            <option value="more">Mehr als 100.000 €</option>
          </select>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Wie alt bist du?</div>
        <div class="flex-grow">
          <input
            v-model="values.age"
            type="number"
            class="form-input block"
            placeholder="Alter eingeben"
          />
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Was ist dein Geschlecht?</div>
        <div class="flex-grow">
          <select v-model="values.gender" class="form-select block">
            <option value="female">Weiblich</option>
            <option value="male">Männlich</option>
            <option value="other">Divers</option>
          </select>
        </div>
      </div>
    </div>
    <div class="text-base sm:text-lg my-12 md:text-xl xl:text-2xl">
      Inwieweit treffen die folgenden Aussagen auf dich zu?
    </div>
    <div class="flex flex-col text-sm sm:text-base md:text-lg xl:text-xl">
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich bin eher zurückhaltend, reserviert.
        </div>
        <RadioBar
          name="BFI-1"
          :levels="linkertLevelsDE"
          @value="values.bfi1 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich schenke anderen leicht Vertrauen, glaube an das Gute im Menschen.
        </div>
        <RadioBar
          name="BFI-2"
          :levels="linkertLevelsDE"
          @value="values.bfi2 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Ich bin bequem, neige zur Faulheit.</div>
        <RadioBar
          name="BFI-3"
          :levels="linkertLevelsDE"
          @value="values.bfi3 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich bin entspannt, lasse mich durch Stress nicht aus der Ruhe bringen.
        </div>
        <RadioBar
          name="BFI-4"
          :levels="linkertLevelsDE"
          @value="values.bfi4 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich habe nur wenig künstlerisches Interesse.
        </div>
        <RadioBar
          name="BFI-5"
          :levels="linkertLevelsDE"
          @value="values.bfi5 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich gehe aus mir heraus, bin gesellig.
        </div>
        <RadioBar
          name="BFI-6"
          :levels="linkertLevelsDE"
          @value="values.bfi6 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich neige dazu, andere zu kritisieren.
        </div>
        <RadioBar
          name="BFI-7"
          :levels="linkertLevelsDE"
          @value="values.bfi7 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Ich erledige Aufgaben gründlich.</div>
        <RadioBar
          name="BFI-8"
          :levels="linkertLevelsDE"
          @value="values.bfi8 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Ich werde leicht nervös und unsicher.</div>
        <RadioBar
          name="BFI-9"
          :levels="linkertLevelsDE"
          @value="values.bfi9 = $event"
        />
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich habe eine aktive Vorstellungskraft, bin phantasievoll.
        </div>
        <RadioBar
          name="BFI-10"
          :levels="linkertLevelsDE"
          @value="values.bfi10 = $event"
        />
      </div>
    </div>
    <div>Absenden</div>
  </div>
</template>

<script>
import RadioBar from '~/components/RadioBar'
import Range from '~/components/Range'

export default {
  components: {
    RadioBar,
    Range
  },
  data() {
    return {
      linkertLevelsDE: [
        'trifft überhaupt nicht zu',
        'trifft eher nicht zu',
        'weder noch',
        'eher zutreffend',
        'trifft voll und ganz zu'
      ],
      values: {
        religious: undefined,
        political: undefined,
        confidence: undefined,
        fear: undefined,
        will: undefined,
        edu: undefined,
        income: undefined,
        age: undefined,
        gender: undefined,
        bfi1: undefined,
        bfi2: undefined,
        bfi3: undefined,
        bfi4: undefined,
        bfi5: undefined,
        bfi6: undefined,
        bfi7: undefined,
        bfi8: undefined,
        bfi9: undefined,
        bfi10: undefined
      }
    }
  },
  methods: {}
}
</script>

<style scoped></style>
