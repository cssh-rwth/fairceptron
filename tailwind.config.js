/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      spacing: {
        xl: '36rem'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')]
}
