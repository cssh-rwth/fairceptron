<template>
  <div
    class="rounded-full w-full flex items-center border-gray-300 border text-gray-700 leading-relaxed"
  >
    <div class="text-xs w-20 text-center">Fortschritt</div>
    <div
      :style="css"
      class="text-right text-xs pr-2 rounded-full bg-gray-200 my-1 min-w-10"
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
  },
}
</script>

<style scoped></style>
