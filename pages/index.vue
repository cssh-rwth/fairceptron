<template>
  <div>
    <div v-if="language === 'de'" class="max-w-3xl mx-auto justify-center">
      <div class="w-full mb-12 mt-4 px-4">
        <button
          class="border border-green-600 hover:bg-green-100 text-green-700 rounded px-4 py-2"
          @click="$store.dispatch('setLanguage', 'en')"
        >
          English
        </button>
      </div>
      <img
        src="~/static/logo.png"
        alt="Logo des FairCeptrons"
        class="w-64 mb-8 mx-auto"
      />
      <div class="text-gray-700 px-4">
        <div class="mb-2">
          Algorithmen übernehmen zunehmend Entscheidungen über Menschen, die
          bisher von Menschen getroffen wurden. Solche Entscheidungen umfassen
          unter anderem die Vergabe von Krediten, das Gewähren von Kaution oder
          die Rangfolge möglicher Kandidat:innen für eine offene Arbeitsstelle.
        </div>
        <div class="mb-2">
          Das Fai<span class="tracking-widest">r</span>Ceptron ist eine
          <span class="font-bold">
            Plattform zur Erfassung der menschlichen Perspektive
          </span>
          auf solche maschinell getroffenen
          <span class="font-bold">Auswahl- und Rangfolge-Entscheidungen</span>.
        </div>
        <h2 class="text-xl font-semibold mt-6 mb-2">Ablauf und Inhalt</h2>
        <div class="mb-2">
          Im Kontext der
          <span class="font-bold"> Vergabe von Studienplätzen </span>
          werden dir
          <span class="font-bold">
            {{ $store.getters.totalQuestions }} Szenarien
          </span>
          mit unterschiedlichen Auswahlen und Rangfolgen gezeigt. Jedes Szenario
          beinhaltet 10 Personen mit verschiedenen Eigenschaften, die sich alle
          jeweils auf gleiche Studienplätze bewerben. In Auswahlszenarien werden
          jeweils weniger als 10 Bewerber:innen ausgewählt. In
          Rangfolge-Szenarien werden alle Bewerber:innen so sortiert, dass die
          ersten mit der höchsten Wahrscheinlichkeit einen Studienplatz erhalten
          und die letzten mit der geringsten.
        </div>
        <div class="mb-2">
          Als
          <span class="font-bold"> außenstehender Beobachter </span>
          bewertest du die verschiedenen algorithmisch getroffenen
          Entscheidungen nach ihrer Fairness. Dabei stehen dir genau
          <span class="font-bold">
            dieselben anonymisierten Informationen
          </span>
          über die Bewerber:innen zur Verfügung, wie auch dem Algorithmus.
        </div>
        <div class="mb-2">
          Noch ein Hinweis: Das FairCeptron unterscheidet Bewerber:innen
          ausschließlich hinsichtlich ihres Geschlechts. Dabei handelt es sich
          um ein fiktives Szenario und eine starke Vereinfachung. Mir ist
          bewusst, dass es mehr als die beiden dargestellten Geschlechter gibt.
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
          den von dir explizit eingegebenen Daten, deiner Bildschirmgröße und
          der Bearbeitungsdauer pro Frage werden keine weiteren Daten erhoben.
          Genauere Informationen zum Datenschutz findest du im folgenden
          Abschnitt. Darüber hinaus wird eine eindeutige Benutzerkennung im
          Lokalen Speicher deines Webbrowsers hinterlegt (ähnlich zu einem
          Cookie), welche für die Verwendung des Fai<span
            class="tracking-widest"
            >r</span
          >Ceptrons notwendig ist. Indem du das Fai<span class="tracking-widest"
            >r</span
          >Ceptron startest, stimmst du der Verwendung dieser Benutzerkennung zu
          und bestätigst, dass du über die Studie aufgeklärt wurdest und
          freiwillig an ihr teilnimmst.
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
          erfasst. Es werden keine IP-Adressen erfasst. Deine Eingaben im
          Verlauf der Studie, sowie die Bearbeitungsdauer pro Frage und deine
          Bildschirmgröße speichere ich auf meinem Server und stelle sie ggf.
          anderen Forschern am Lehrstuhl für Computational Social Sciences der
          RWTH Aachen für zur Verfügung. Alle Daten werden nur in anonymisierter
          Form veröffentlicht.
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
    <div v-else-if="language === 'en'" class="max-w-3xl mx-auto justify-center">
      <div class="w-full mb-12 mt-4 px-4">
        <button
          class="border border-green-600 hover:bg-green-100 text-green-700 rounded px-4 py-2"
          @click="$store.dispatch('setLanguage', 'de')"
        >
          Deutsch
        </button>
      </div>
      <img
        src="~/static/logo.png"
        alt="Logo des FairCeptrons"
        class="w-64 mb-8 mx-auto"
      />
      <div class="text-gray-700 px-4">
        <div class="mb-2">
          Algorithms increasingly decide over humans &ndash; decisions
          previously only made by humans. Such decisions include for example,
          the granting of credit, the admission of bail or the ranking of
          possible candidates for a job opening.
        </div>
        <div class="mb-2">
          The Fai<span class="tracking-widest">r</span>Ceptron is a
          <span class="font-bold">
            platform capturing the human perspective
          </span>
          on such automated
          <span class="font-bold"> selection and ranking decisions</span>.
        </div>
        <h2 class="text-xl font-semibold mt-6 mb-2">Procedure and content</h2>
        <div class="mb-2">
          In the context of
          <span class="font-bold"> university admission</span>,
          <span class="font-bold">
            {{ $store.getters.totalQuestions }} scenarios
          </span>
          with different selections and rankings are shown. Each scenario
          consists of 10 applicants with different characteristics, all of whom
          apply for the same university. In each selection scenario less than 10
          applicants are selected. In ranking scenarios all applicants are
          sorted in such a way that the first ones are most likely to be
          admitted to university and last ones are least likely.
        </div>
        <div class="mb-2">
          As an
          <span class="font-bold"> outside observer </span>
          you evaluate the different algorithmic decisions according to their
          fairness. You have access to exactly
          <span class="font-bold"> the same anonymous information </span>
          about the applicants, as does the algorithm.
        </div>
        <div class="mb-2">
          One more thing: The FairCeptron distinguishes applicants only by their
          gender. This is a fictitious scenario and a strong simplification. I
          am aware that there are more than the two genders shown.
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
          Participation and consent
        </h2>
        <div v-if="showAgreement" class="mb-2">
          Participation in the study is voluntary. You can always abort. The
          study will take about 15 minutes. In addition to the data you have
          explicitly entered, your screen size and the time required to fill in
          each question, no further data will be collected. More detailed
          information about the privacy policy can be found in the following
          section. In addition a unique user ID will be stored in the local
          storage of your web browser (similar to a cookie), which are necessary
          for the use of the Fai<span class="tracking-widest">r</span>Ceptron.
          By starting the Fai<span class="tracking-widest">r</span>Ceptron, you
          agree to the use of the user ID, and confirm that you have been
          informed about the study and that you participate in it voluntarily.
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
          Privacy policy
        </h2>
        <div v-if="showPrivacyStatement" class="mb-2">
          Responsible for the collection, processing and use of your personal
          data within the meaning of Art. 4 No. 7 DSGVO is <br />
          Georg Ahnert <br />
          Jupp-Müller-Str. 5 <br />
          52072 Aachen <br />
          Germany
        </div>
        <div v-if="showPrivacyStatement" class="mb-2">
          You have the right to request free of charge about stored personal
          data and/or to request rectification, blocking or erasure. A blocking
          or deletion cannot take place if legal regulations are opposed to
          this. Please contact me at georg.ahnert&nbsp;[ät]&nbsp;rwth-aachen.de.
        </div>
        <div v-if="showPrivacyStatement" class="mb-2">
          Access to this website is not automatically recorded. No IP addresses
          are recorded. Your entries during the course of the study, as well as
          the processing time per question and your screen size are stored on my
          server and can be made available to other researchers at the chair of
          Computational Social Sciences at RWTH Aachen University. Data will be
          anonymized before publishing.
        </div>
      </div>
      <div class="w-full text-center my-16">
        <nuxt-link
          to="/questions/1"
          class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
          @click.native="startSurvey()"
        >
          Start the Fai<span class="tracking-widest">r</span>Ceptron
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'index') return 'slide-left'
    if (to.name === 'index') return 'slide-right'
  },
  data() {
    return {
      showPrivacyStatement: false,
      showAgreement: false,
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
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
}
</script>

<style scoped></style>
