<template>
  <div class="max-w-6xl min-h-screen mx-auto flex flex-col justify-center">
    <div class="w-full text-center">
      <svg
        class="w-32 h-32 lg:w-64 lg:h-64 fill-current text-gray-700 mx-auto"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.508 13.941c-1.513 1.195-3.174 1.931-5.507 1.931-2.335 0-3.996-.736-5.509-1.931l-.492.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.492-.493zm.492-3.939l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002zm-7 0l-.755.506s-.503-.948-1.746-.948c-1.207 0-1.745.948-1.745.948l-.754-.506c.281-.748 1.205-2.002 2.499-2.002 1.295 0 2.218 1.254 2.501 2.002z"
        />
      </svg>
    </div>
    <h1
      class="self-end text-4xl font-semibold text-gray-700 w-full text-center my-16"
    >
      {{
        language === 'de'
          ? 'Vielen Dank für deine Teilnahme!'
          : 'Thank you very much for your participation!'
      }}
    </h1>
  </div>
</template>

<script>
export default {
  transition: 'slide-left',
  computed: {
    language() {
      return this.$store.getters.language
    },
  },
}
</script>

<style scoped></style>
