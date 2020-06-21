<template>
  <div class="max-w-6xl min-h-screen mx-auto flex flex-col justify-center">
    <h1
      class="self-end text-4xl font-semibold text-gray-700 w-full text-center my-16"
    >
      FairCeptron
    </h1>
    <div class="text-gray-700 p-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempor
      tempor congue consequat. Quisque maximus est enim, eget elementum sapien
      egestas vitae. Curabitur et est eu sem vestibulum vulputate. Nulla
      consectetur quam eget orci sollicitudin ornare. Quisque eu venenatis orci.
      Etiam ut volutpat augue, ac consectetur leo. Vestibulum urna dui,
      hendrerit sed dolor vel, efficitur semper ipsum. Cras sed aliquet mi.
      Pellentesque id vestibulum purus. Sed dictum vitae urna eu maximus. Mauris
      interdum libero eget libero tincidunt vehicula. Mauris lobortis lorem
      vitae tristique dictum. Vestibulum id maximus velit. Phasellus imperdiet
      pellentesque erat, vestibulum facilisis enim gravida quis. Integer a quam
      fermentum, fermentum orci in, venenatis quam. Phasellus augue justo,
      placerat ut tempor ac, finibus at risus. Vestibulum vitae diam libero. Ut
      eleifend, elit ut venenatis interdum, est mauris ornare lectus, in
      consequat leo tortor porttitor erat. Duis pellentesque rutrum arcu, eu
      mattis lectus interdum nec. Etiam non odio nec libero rutrum bibendum vel
      et eros. Nullam pharetra bibendum erat, ut rutrum ligula efficitur sit
      amet. Aenean ac condimentum dui, sit amet vulputate ante. Etiam eros ante,
      ultrices quis tellus in, laoreet laoreet nunc. Quisque a blandit tortor.
    </div>
    <div class="w-full text-center my-16">
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2"
        @click.prevent="startSurvey()"
      >
        {{ startDE }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDE: 'FairCeptron starten',
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
  },
  transition(to, from) {
    if (!from) return 'slide-left'
    if (from.name === 'index') return 'slide-left'
    if (to.name === 'index') return 'slide-right'
  },
}
</script>

<style scoped></style>
