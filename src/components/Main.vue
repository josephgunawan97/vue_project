<template>

  <v-container fluid>
    <v-toolbar app >
      <v-toolbar-title><router-link to="/main">Klikdaily</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
          
          <v-btn flat v-on:click="signOut">
            <v-icon>exit_to_app</v-icon> Logout
          </v-btn>
    </v-toolbar>
    <v-content>
    </v-content> 
  </v-container>

  
</template>


<script>
  import firebase from 'firebase'
export default{
  name: 'main',
  data: function () {
    return {
      name:'',
      amount:'',
      price:'',
      description:'',
      category:'',
      dialog: false
      
    }
  },
  methods: {
    signOut: function(){
      this.$store.dispatch('logout')
      this.$router.replace('/login')
      console.log("logout")
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
