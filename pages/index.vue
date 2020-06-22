<template>
  <div class="max-w-6xl min-h-screen mx-auto flex flex-col justify-center">
    <h1
      class="self-end text-4xl font-semibold text-gray-700 w-full text-center mt-16 mb-8"
    >
      Fai<span class="tracking-widest">r</span>Ceptron
    </h1>
    <div class="text-gray-700 px-4">
      <div class="mb-2">
        Algorithmen übernehmen zunehmend Entscheidungen über Menschen, die
        bisher von Menschen getroffen wurden. Solche Entscheidungen umfassen
        unter unter anderem die Vergabe von Krediten, das Gewähren von Kaution
        oder die Rangfolge möglicher Kandidat:innen für eine offene
        Arbeitsstelle.
      </div>
      <div class="mb-2">
        Das Fai<span class="tracking-widest">r</span>Ceptron ist eine Plattform
        zur Erfassung der menschlichen Perspektive auf solche maschinell
        getroffenen Auswahl- und Rangfolge-Entscheidungen.
      </div>
      <h1 class="text-xl font-semibold mt-6 mb-2">Ablauf und Inhalt</h1>
      <div class="mb-2">
        Im Kontext der Vergabe von Studienplätzen werden dir 20 Szenarien mit
        unterschiedlichen Auswahlen und Rangfolgen gezeigt. Jedes Szenario
        beinhaltet 10 Personen mit verschiedenen Eigenschaften, die sich alle
        jeweils um dieselben Studienplätze bewerben. In Auswahlszenarien werden
        jeweils weniger als 10 Bewerber:innen ausgewählt. In Rangfolge-Szenarien
        werden alle Bewerber:innen so sortiert, dass die ersten mit der höchsten
        Wahrscheinlichkeit einen Studienplatz erhalten und die letzten mit der
        geringsten.
      </div>
      <div class="mb-2">
        Als außenstehender Beobachter bewertest du die verschiedenen
        algorithmisch getroffenen Entscheidungen nach ihrer Fairness. Dabei
        stehen dir genau dieselben anonymisierten Informationen über die
        Bewerber:innen zur Verfügung, wie auch dem Algorithmus.
      </div>
      <h1 class="text-xl font-semibold mt-6 mb-2">Teilnahme und Zustimmung</h1>
      <div class="mb-2">
        Die Teilnahme an der Studie ist freiwillig. Du kannst sie jederzeit
        abbrechen. Die Studie nimmt etwa ?? Minuten in Anspruch. Zusätzlich zu
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
      <h1
        class="text-xl font-semibold mt-6 mb-2 cursor-pointer"
        @click="togglePrivacyStatement"
      >
        Datenschutz
        <span v-if="!showPrivacyStatement" class="font-normal">
          [Anzeigen]
        </span>
        <span v-if="showPrivacyStatement" class="font-normal">
          [Verbergen]
        </span>
      </h1>
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
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        @click.prevent="startSurvey()"
      >
        Fai<span class="tracking-widest">r</span>Ceptron starten
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPrivacyStatement: false,
    }
  },
  mounted() {
    this.$store.dispatch('initQuestions')
  },
  methods: {
    startSurvey() {
      if (!this.$store.getters.userID) this.$store.dispatch('registerUser')
      this.$router.push('/questions/1')
    },
    togglePrivacyStatement() {
      this.showPrivacyStatement = !this.showPrivacyStatement
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
