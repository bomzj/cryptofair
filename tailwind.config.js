module.exports = {
	theme: {
    customForms: theme => ({
      default: {
        input: {
        '&:focus': {
          boxShadow: undefined,
          borderColor: undefined,
        },
      },
    }
  })
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}