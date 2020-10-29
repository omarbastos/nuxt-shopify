import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import colors from 'vuetify/es5/util/colors'

export default {
  iconfont: 'fa',
  theme: {
    dark: false,
    themes: {
      light: {
        background: colors.yellow.lighten4,

        primary: colors.yellow.lighten4,
        accent: colors.yellow.lighten4,
        secondary: colors.blue.lighten3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
}
