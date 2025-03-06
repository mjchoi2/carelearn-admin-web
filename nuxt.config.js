export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'carelearn-admin-web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css', '@/assets/css/fonts.css', '@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-agile'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8', '@nuxt-hero-icons/outline/nuxt', '@nuxt-hero-icons/solid/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/google-gtag',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
    },
  },

  auth: {
    cookie: {
        prefix: 'auth.',
        options: {
            // path: '/',
    domain:'.silveredu.net'
        },
    },
    strategies: {
        laravelPassport: {
            provider: 'laravel/passport',
            endpoints: {
                userInfo: { url: process.env.BASEURL + '/api/auth/me', method: 'get', propertyName: 'user' },
            },
            url: process.env.BASEURL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
        local: {
            local: {
                property: 'token',
                global: true,
            },
            user: {
                property: 'userinfo',
            },
            endpoints: {
                login: { url: process.env.BASEURL + '/api/login', method: 'post' },
                logout: { url: process.env.BASEURL + '/api/logout', method: 'post' },
                user: { url: process.env.BASEURL + '/api/oauth/me', method: 'get' },
            },
        },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
      // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
      baseURL: process.env.NOTEAPIURL,
  },

  'google-gtag': {
        id: process.env.GTAGID, // required
        config: {
            // this are the config options for `gtag
            // check out official docs: https://developers.google.com/analytics/devguides/collection/gtagjs/
            anonymize_ip: true, // anonymize IP
            send_page_view: true, // might be necessary to avoid duplicated page track on page reload
        },
        debug: true, // enable to track in dev mode
        disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...)
    },
};
