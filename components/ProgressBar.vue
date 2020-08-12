<template>
  <div
    class="text-xs rounded-full w-full flex items-center border-gray-300 border text-gray-700"
  >
    <div
      v-if="language === 'de'"
      class="flex-none pl-3 pr-2 text-center cursor-pointer border-r"
      @click="$store.dispatch('setLanguage', 'en')"
    >
      English
    </div>
    <div
      v-else-if="language === 'en'"
      class="flex-none pl-3 pr-2 text-center cursor-pointer border-r"
      @click="$store.dispatch('setLanguage', 'de')"
    >
      Deutsch
    </div>
    <div v-if="language === 'de'" class="flex-none text-right px-2">
      Fortschritt
    </div>
    <div v-else-if="language === 'en'" class="flex-none text-right px-2">
      Progress
    </div>
    <div
      :style="css"
      class="text-right pr-2 rounded-full bg-gray-200 my-1 min-w-10"
    >
      {{ progress }} %
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    css() {
      return {
        width:
          'calc(' + this.progress + '% - ' + (this.progress * 5) / 100 + 'rem)',
      }
    },
    language() {
      return this.$store.getters.language
    },
  },
}
</script>

<style scoped></style>
