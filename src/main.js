// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.min.css'
// Init plugin
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VDialog,
  VToolbar,
  VForm,
  VTextField,
  VCard,
  VAvatar,
  transitions
} from 'vuetify'
import { store } from './store'
import * as firebase from 'firebase'
import '../node_modules/vuetify/src/stylus/app.styl'

import VuejsDialog from 'vuejs-dialog'
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import Toasted from 'vue-toasted'

Vue.use(Toasted);

// Tell Vue to install the plugin.

Vue.use(VuejsDialog);

Vue.use(Loading);
Vue.use(Vuetify, {
  components: {
    VApp,
    VAvatar,
    VDialog,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VCard,
    VForm,
    VGrid,
    VToolbar,
    VTextField,
    transitions
  },
  theme: {
    primary: '#1565C0',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

const config ={
  apiKey: "AIzaSyAIzFAt3K_vujSPFMoT_I5W4NcGeSRPbuY",
  authDomain: "klikdaily-project.firebaseapp.com",
  databaseURL: "https://klikdaily-project.firebaseio.com",
  projectId: "klikdaily-project",
  storageBucket: "klikdaily-project.appspot.com",
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/main')
      } else {
        this.$router.push('/login')
      }
     });
    },
})
