<template>
  <div class="max-w-3xl mx-auto justify-center">
    <img
      src="~/static/logo.png"
      alt="Logo des FairCeptrons"
      class="w-64 mt-16 mb-8 mx-auto"
    />
    <div class="text-gray-700 px-4">
      <div class="mb-2">
        Algorithmen übernehmen zunehmend Entscheidungen über Menschen, die
        bisher von Menschen getroffen wurden. Solche Entscheidungen umfassen
        unter anderem die Vergabe von Krediten, das Gewähren von Kaution oder
        die Rangfolge möglicher Kandidat:innen für eine offene Arbeitsstelle.
      </div>
      <div class="mb-2">
        Das Fai<span class="tracking-widest">r</span>Ceptron ist eine Plattform
        zur Erfassung der menschlichen Perspektive auf solche maschinell
        getroffenen Auswahl- und Rangfolge-Entscheidungen.
      </div>
      <h2 class="text-xl font-semibold mt-6 mb-2">Ablauf und Inhalt</h2>
      <div class="mb-2">
        Im Kontext der Vergabe von Studienplätzen werden dir
        {{ $store.getters.totalQuestions }} Szenarien mit unterschiedlichen
        Auswahlen und Rangfolgen gezeigt. Jedes Szenario beinhaltet 10 Personen
        mit verschiedenen Eigenschaften, die sich alle jeweils auf gleiche
        Studienplätze bewerben. In Auswahlszenarien werden jeweils weniger als
        10 Bewerber:innen ausgewählt. In Rangfolge-Szenarien werden alle
        Bewerber:innen so sortiert, dass die ersten mit der höchsten
        Wahrscheinlichkeit einen Studienplatz erhalten und die letzten mit der
        geringsten.
      </div>
      <div class="mb-2">
        Als außenstehender Beobachter bewertest du die verschiedenen
        algorithmisch getroffenen Entscheidungen nach ihrer Fairness. Dabei
        stehen dir genau dieselben anonymisierten Informationen über die
        Bewerber:innen zur Verfügung, wie auch dem Algorithmus.
      </div>
      <h2
        class="text-xl font-semibold mt-6 mb-2 cursor-pointer"
        @click="toggleAgreement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :class="showAgreement ? 'rotate-90' : 'rotate-0'"
          class="w-4 h-4 mt-2 mr-2 float-left transform transition-transform duration-150 ease-in-out fill-current"
        >
          <path
            d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
          />
        </svg>
        Teilnahme und Zustimmung
      </h2>
      <div v-if="showAgreement" class="mb-2">
        Die Teilnahme an der Studie ist freiwillig. Du kannst sie jederzeit
        abbrechen. Die Studie nimmt etwa 15 Minuten in Anspruch. Zusätzlich zu
        den von dir explizit eingegebenen Daten und der Bearbeitungsdauer pro
        Frage werden keine weiteren Daten erhoben. Genauere Informationen zum
        Datenschutz findest du im folgenden Abschnitt. Darüber hinaus wird eine
        eindeutige Benutzerkennung im Lokalen Speicher deines Webbrowsers
        hinterlegt (ähnlich zu einem Cookie), welche für die Verwendung des
        Fai<span class="tracking-widest">r</span>Ceptrons notwendig ist. Indem
        du das Fai<span class="tracking-widest">r</span>Ceptron startest,
        stimmst du der Verwendung dieser Benutzerkennung zu und bestätigst, dass
        du über die Studie aufgeklärt wurdest und freiwillig an ihr teilnimmst.
      </div>
      <h2
        class="text-xl font-semibold mt-6 mb-2 cursor-pointer"
        @click="togglePrivacyStatement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          :class="showPrivacyStatement ? 'rotate-90' : 'rotate-0'"
          class="w-4 h-4 mt-2 mr-2 float-left transform transition-transform duration-150 ease-in-out fill-current"
        >
          <path
            d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
          />
        </svg>
        Datenschutz
      </h2>
      <div v-if="showPrivacyStatement" class="mb-2">
        Verantwortlich für die Erhebung, Verarbeitung und Nutzung deiner
        personenbezogenen Daten Sinne von Art. 4 Nr. 7 DSGVO ist <br />
        Georg Ahnert <br />
        Jupp-Müller-Str. 5 <br />
        52072 Aachen <br />
        Germany
      </div>
      <div v-if="showPrivacyStatement" class="mb-2">
        Du hast das Recht, auf Antrag unentgeltlich eine Auskunft über die
        gespeicherten personenbezogenen Daten anzufordern und/oder eine
        Berichtigung, Sperrung oder Löschung zu verlangen. Eine Sperrung oder
        Löschung kann nicht erfolgen, wenn gesetzliche Regelungen dem
        entgegenstehen. Bitte kontaktiere mich unter
        georg.ahnert&nbsp;[ät]&nbsp;rwth-aachen.de .
      </div>
      <div v-if="showPrivacyStatement" class="mb-2">
        Der Zugriff auf diese Webseite wird grundsätzlich nicht automatisiert
        erfasst. Es werden keine IP-Adressen erfasst. Deine Eingaben im Verlauf
        der Studie, sowie die Bearbeitungsdauer pro Frage speichere ich auf
        meinem Server und stelle sie ggf. anderen Forschern am Lehrstuhl für
        Computational Social Sciences der RWTH Aachen für zur Verfügung.
      </div>
    </div>
    <div class="w-full text-center my-16">
      <nuxt-link
        to="/questions/1"
        class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        @click.native="startSurvey()"
      >
        Fai<span class="tracking-widest">r</span>Ceptron starten
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPrivacyStatement: false,
      showAgreement: false,
    }
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
        this.$store.dispatch('registerUser')
      }
    }
    // user known, but questions not loaded
    else if (!this.$store.getters.totalQuestions) {
      this.$store.dispatch('loadQuestions')
    }
  },
  methods: {
    startSurvey() {
      this.$store.commit('persistUserID') // persist the ID only with user agreement
    },
    togglePrivacyStatement() {
      this.showPrivacyStatement = !this.showPrivacyStatement
    },
    toggleAgreement() {
      this.showAgreement = !this.showAgreement
    },
  },
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'index') return 'slide-left'
    if (to.name === 'index') return 'slide-right'
  },
}
</script>

<style scoped></style>
