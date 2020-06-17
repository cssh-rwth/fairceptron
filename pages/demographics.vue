<template>
  <div class="max-w-6xl min-h-screen mx-auto">
    <div class="text-base sm:text-lg my-12 md:text-xl xl:text-2xl">
      Gleich fertig! Bitte beantworte abschließend noch die folgenden Fragen:
    </div>
    <div class="flex flex-col text-sm sm:text-base md:text-lg xl:text-xl">
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Wie religiös bist du?</div>
        <div class="flex flex-grow justify-center items-center my-4">
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Gar nicht
          </div>
          <input
            v-model="ratingValue"
            type="range"
            :min="ratingMin"
            :max="ratingMax"
            :step="ratingStep"
            :class="ratingSelected ? 'range-visible' : 'range-invisible'"
            class="mx-4 w-full"
            @mousedown="enterSelection"
            @touchstart="enterSelection"
          />
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Sehr
          </div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Wie sind deine politischen Ansichten?</div>
        <div class="flex flex-grow justify-center items-center my-4">
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Konservativ
          </div>
          <input
            v-model="ratingValue"
            type="range"
            :min="ratingMin"
            :max="ratingMax"
            :step="ratingStep"
            :class="ratingSelected ? 'range-visible' : 'range-invisible'"
            class="mx-4 w-full"
            @mousedown="enterSelection"
            @touchstart="enterSelection"
          />
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Progressiv
          </div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Wie hoch ist dein Vertrauen in maschinell getroffene Entscheidungen?
        </div>
        <div class="flex flex-grow justify-center items-center my-4">
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Sehr niedrig
          </div>
          <input
            v-model="ratingValue"
            type="range"
            :min="ratingMin"
            :max="ratingMax"
            :step="ratingStep"
            :class="ratingSelected ? 'range-visible' : 'range-invisible'"
            class="mx-4 w-full"
            @mousedown="enterSelection"
            @touchstart="enterSelection"
          />
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Sehr hoch
          </div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Inwieweit befürchtest du, dass Maschinen außer Kontrolle geraten
          könnten?
        </div>
        <div class="flex flex-grow justify-center items-center my-4">
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Gar nicht
          </div>
          <input
            v-model="ratingValue"
            type="range"
            :min="ratingMin"
            :max="ratingMax"
            :step="ratingStep"
            :class="ratingSelected ? 'range-visible' : 'range-invisible'"
            class="mx-4 w-full"
            @mousedown="enterSelection"
            @touchstart="enterSelection"
          />
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Sehr
          </div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Wie groß ist deine Bereitschaft, an einem maschinell durchgeführten
          Bewerbungsverfahren teilzunehmen?
        </div>
        <div class="flex flex-grow justify-center items-center my-4">
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Gar nicht
          </div>
          <input
            v-model="ratingValue"
            type="range"
            :min="ratingMin"
            :max="ratingMax"
            :step="ratingStep"
            :class="ratingSelected ? 'range-visible' : 'range-invisible'"
            class="mx-4 w-full"
            @mousedown="enterSelection"
            @touchstart="enterSelection"
          />
          <div
            class="text-xs sm:text-sm text-gray-700 sm:whitespace-no-wrap flex-1"
          >
            Sehr
          </div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Was ist dein höchster Bildungsgrad?
        </div>
        <div class="flex-grow">
          <select class="form-select block">
            <option selected disabled value="">Bitte auswählen</option>
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
          <select class="form-select block">
            <option selected disabled value="">Bitte auswählen</option>
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
            type="text"
            class="form-input block"
            placeholder="Alter eingeben"
          />
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Was ist dein Geschlecht?</div>
        <div class="flex-grow">
          <select class="form-select block">
            <option selected disabled value="">Bitte auswählen</option>
            <option value="female">Weiblich</option>
            <option value="male">Männlich</option>
            <option value="other">Sonstiges</option>
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
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich schenke anderen leicht Vertrauen, glaube an das Gute im Menschen.
        </div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Ich bin bequem, neige zur Faulheit.</div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich bin entspannt, lasse mich durch Stress nicht aus der Ruhe bringen.
        </div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich habe nur wenig künstlerisches Interesse.
        </div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich gehe aus mir heraus, bin gesellig.
        </div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich neige dazu, andere zu kritisieren.
        </div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Ich erledige Aufgaben gründlich.</div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">Ich werde leicht nervös und unsicher.</div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
      <div class="flex flex-wrap min-w-full mb-6 xl:mb-8">
        <div class="w-full sm:w-2/5">
          Ich habe eine aktive Vorstellungskraft, bin phantasievoll.
        </div>
        <div class="flex flex-grow items-end relative justify-center">
          <div
            v-for="n in ratingLevelsDE.length"
            :key="n"
            class="text-center flex-grow flex-1 z-10"
          >
            <div
              style="min-width: 3.7rem"
              class="mx-1 mb-2 text-xs sm:text-sm cursor-pointer text-gray-700"
              @click="ratingSelected = n"
            >
              {{ ratingLevelsDE[n - 1] }}
            </div>
            <input
              v-model="ratingSelected"
              type="radio"
              class="form-radio h-6 w-6 cursor-pointer text-gray-600 bg-gray-400 border-none"
              name="ratingLevel"
              :value="n"
            />
          </div>
          <div class="w-4/5 h-2 bg-gray-400 absolute bottom-0 mb-2 z-0"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratingLevelsDE: [
        'trifft überhaupt nicht zu',
        'trifft eher nicht zu',
        'weder noch',
        'eher zutreffend',
        'trifft voll und ganz zu'
      ]
    }
  }
}
</script>

<style scoped>
@import '~assets/css/range.css';
.range-visible::-moz-range-thumb {
  visibility: visible;
}
.range-visible::-webkit-slider-thumb {
  visibility: visible;
}
.range-visible::-ms-thumb {
  visibility: visible;
}
.range-invisible::-moz-range-thumb {
  visibility: hidden;
}
.range-invisible::-webkit-slider-thumb {
  visibility: hidden;
}
.range-invisible::-ms-thumb {
  visibility: hidden;
}
</style>
