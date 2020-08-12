<template>
  <div></div>
</template>
<script>
export default {
  mounted() {
    this.$store.commit('setLanguage', 'en')
    this.$router.push('/')
  },
}
</script>
