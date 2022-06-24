module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
