import facebookLogin from 'facebook-login-vuejs'

export const facebookLoginPlugin = {
  install: function (Vue, options) {
    Vue.component(facebookLogin.name, facebookLogin)
  }
}
export default facebookLogin
