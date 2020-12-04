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
    extend: {},
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
