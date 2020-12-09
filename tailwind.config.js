module.exports = {
  purge: {
    content: [
      './public/index.html',
      './src/**/*.js',
      './src/**/*.jsx',
    ],
    options: {
      // using TailwindUI extractor => https://tailwindui.com/documentation
      defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
    }
  },
  theme: {
    extend: {
      height: {
        'screen-1/4': '25vh',
        'screen-1/2': '50vh',
        'screen-3/4': '75vh',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
