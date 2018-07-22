<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  id="email"
                  v-model="email"
                  type="text"></v-text-field>
                  <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"></v-text-field>

                  <v-card-actions>
                 <p>Have no account? <router-link to="/signup">Register</router-link> here</p>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
                </v-form>
              </v-card-text>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default{
  
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
    computed: {
    user () {
      return this.$store.getters.user
    }
  },
    watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        console.log(value)
        this.$router.push('/main')
      }
    }
  },
  methods: {
    login(){
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    }
  }
}
</script>

<style scoped>
</style>
