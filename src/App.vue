<template>
  <v-app>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-title><router-link to="/main">Klikdaily</router-link></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view />
      <router-view name="product"/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
    }
  }
}
</script>
