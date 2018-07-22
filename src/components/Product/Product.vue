<template>
      <v-container align-center>  
        <v-layout align-center>
          <v-flex xs2>
              Nama
          </v-flex>
          <v-flex xs2>
              Category
          </v-flex>
          <v-flex xs2>
              Price
          </v-flex>
          <v-flex xs2>
              Amount
          </v-flex>
          <v-flex xs2>
              Description
          </v-flex>
          <v-flex xs1>
              Edit
          </v-flex>
          <v-flex xs1 >
              Delete
          </v-flex>
        </v-layout>
        <v-layout align-center v-for="product in productslist" :key="product[0]">
          <v-flex xs2>
            <span >{{product[1].title}}</span>
          </v-flex>
          <v-flex xs2>
            <span >{{product[1].category}}</span>
          </v-flex>
          <v-flex xs2>
            <span >{{product[1].price}}</span>
          </v-flex>
          <v-flex xs2>
            <span >{{product[1].amount}}</span>
          </v-flex>
          <v-flex xs2>
            <span >{{product[1].description}}</span>
          </v-flex>
          <v-flex xs1>
           <v-btn flat  @click.stop="dialog = !dialog" v-on:click="onUpdate(product[0])">
            <v-icon>edit</v-icon>
             </v-btn>
          </v-flex>
          <v-flex xs1>
            <v-btn xs1 flat v-on:click="onDelete(product[0])" >
            <v-icon>delete</v-icon>
            </v-btn>
             </v-flex>
        </v-layout>


<v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title">
          Edit Product
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
            <v-btn flat @click="dialog = false"  v-on:click="onChange(id)">Save</v-btn>
          </v-card-actions>
         </v-container>
        </v-form>
        </v-card>
    </v-dialog> 
      </v-container>


      
</template>

<script>
import firebase from 'firebase'
  export default {
    data(){
      return{
        products:[],
        id: '',
        item: [],
        name:'',
        amount:'',
        price:'',
        description:'',
        category:'',
        dialog: false
      }
    },
    computed: {
      productslist () {
          this.products=[]
          const ref = firebase.database().ref('products');
          ref.on('child_added', (snap) => {
            const prods = [
              this.id = snap.key,
              this.item = snap.val()
            ]
            this.products.push(prods)
          });
          return this.products
      }
    },
    methods:{
      onDelete: function (productid) {
      console.log(productid)
      var currentRef = firebase.database().ref('products/'+productid);
      currentRef.remove()
      this.$router.go(0);
    },
    
    onUpdate: function(productid){
      this.id = productid
      var currentRef = firebase.database().ref('products/'+productid).on('value', (snap) =>{
        console.log(snap.val())
        
        this.name= snap.val().title,
        this.amount= snap.val().amount,
        this.price= snap.val().price,
        this.description= snap.val().description,
        this.category= snap.val().category
        
      });
    },
      
    onChange: function(productid){
      console.log("test" + productid)
      console.log(this.name + " " + this.category)
        var currentRef = firebase.database().ref('products').child(productid).set({
        title: this.name,
        amount: this.amount,
        price: this.price,
        description: this.description,
        category: this.category
      })
        
      this.$router.go(0);
    }
  }
  }
</script>

<style scoped>
</style>
