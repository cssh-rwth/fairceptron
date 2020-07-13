<template>
  <div
    class="rounded-full flex border-gray-300 border text-gray-700 p-1 w-full leading-relaxed"
  >
    <div class="text-xs mx-2">Fortschritt</div>
    <div
      :style="{ width: progress + '%' }"
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
