<template>
  <div
    class="rounded-full flex border-gray-300 border text-gray-700 p-1 w-full leading-relaxed"
  >
    <div class="text-xs w-20 text-center">Fortschritt</div>
    <div
      :style="{
        width: 'calc(' + progress + '% - ' + (progress * 5) / 100 + 'rem)',
      }"
      class="text-right text-xs pr-2 rounded-full bg-gray-200"
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
    previousProgress: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped></style>
