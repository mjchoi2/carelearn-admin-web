module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        sorange: '#ff6029',
        syellow: '#ffba00',
        sgray :'#e5e5e5',
      },
    },
    fontFamily: {
      NotoSans: ['NotoSans'],
    },
  },
  plugins: [require("daisyui")],
}
