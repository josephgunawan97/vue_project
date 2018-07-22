<template>

  <v-container fluid>
    <v-toolbar app >
        <v-toolbar-title>Welcome to you Database</v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn flat @click.stop="dialog = !dialog">
            <v-icon>add</v-icon> Add Product
          </v-btn>
          <v-btn flat v-on:click="signOut">
            <v-icon>exit_to_app</v-icon> Logout
          </v-btn>
    </v-toolbar>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title">
          Add Product
        </v-card-title>

        <v-form>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                  <v-layout align-center>
                    <v-text-field
                      placeholder="Product Name"
                      name="name"
                      id="name"
                      v-model="name"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                  prepend-icon="notes"
                    placeholder="Category"
                    name="category"
                    id="category"
                    v-model="category"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    type="Amount"
                    prepend-icon="attach_money"
                    placeholder="Price"
                    name="price"
                    id="price"
                    v-model="price"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    type="Amount"
                    prepend-icon="assignment_late"
                    placeholder="Amount"
                    name="amount"
                    id="amount"
                    v-model="amount"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="details"
                    placeholder="Description"
                    name="description"
                    id="description"
                    v-model="description"
                  ></v-text-field>
                </v-flex>
              </v-layout>
           

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat @click="dialog = false"  v-on:click="createProduct">Save</v-btn>
          </v-card-actions>
         </v-container>
        </v-form>
        </v-card>
    </v-dialog> 
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
    },
    createProduct(){
       this.$store.dispatch('createProduct', {
        name: this.name,
        amount: this.amount,
        price: this.price,
        description: this.description,
        category: this.category
       })
      this.name='',
      this.amount='',
      this.price='',
      this.description='',
      this.category=''
     
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
