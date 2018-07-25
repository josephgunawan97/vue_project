<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Signup form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="signUp"> 
                  <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Mail"
                  id="email"
                  v-model="email"
                  type="email"></v-text-field>
                  <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"
                  required></v-text-field>
                  <v-text-field
                  prepend-icon="lock"
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :rules="[comparePasswords]"></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Sign Up</v-btn>
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
  name: 'signup',
  data: function () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/main')
        }
      }
    },
  methods: {
    signUp () {
      this.$toasted.show("Sign Up Success").goAway(1000)
      let loader = this.$loading.show();
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      setTimeout(() => loader.hide(), 2 * 1000)
      
    }
  }
}
</script>

<style scoped>
</style>
