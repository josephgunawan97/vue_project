<template>
      <v-container align-center>  
        <v-btn flat @click.stop="dialogadd = !dialogadd">
            <v-icon>add</v-icon> Add Product
          </v-btn>

    <v-dialog v-model="dialogadd" width="800px">
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
            <v-btn flat color="primary" @click="dialogadd = false">Cancel</v-btn>
            <v-btn flat @click="dialogadd = false"  v-on:click="createProduct()">Save</v-btn>
          </v-card-actions>
         </v-container>
        </v-form>
        </v-card>
    </v-dialog> 

        <table style="width:100%; text-align:center">
          <thead>
            <tr>

          <th>
              Nama
          </th>
          <th>
              Category
          </th>
          <th>
              Price
          </th>
          <th>
              Amount
          </th>
          <th>
              Description
          </th>
          <th>
              Edit
          </th>
          <th>
              Delete
          </th>
            </tr>
            </thead>
          <tr v-for="product in productslist" :key="product[0]">
          <td>
            <span >{{product[1].title}}</span>
          </td>
          <td>
            <span >{{product[1].category}}</span>
          </td>
          <td>
            <span >{{product[1].price}}</span>
          </td>
          <td>
            <span >{{product[1].amount}}</span>
          </td>
          <td>
            <span >{{product[1].description}}</span>
          </td>
          <td>
           <v-btn flat  @click.stop="dialog = !dialog" v-on:click="onUpdate(product[0])">
            <v-icon>edit</v-icon>
             </v-btn>
          </td>
          <td>
            <v-btn xs1 flat v-on:click="onDelete(product[0])" >
            <v-icon>delete</v-icon>
            </v-btn>
          </td>
          </tr>
          </table>


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
        dialog: false,
        dialogadd: false
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
        
      this.$toasted.show("Product Deleted").goAway(1000)
      console.log(productid)
      this.$dialog.confirm("Delete this item?", {okText: "Delete"}).then(function(){
      var currentRef = firebase.database().ref('products/'+productid);
      currentRef.remove();
       window.location.reload();      
      });
      
      
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
      
    createProduct(){
      this.$toasted.show("Product Added").goAway(3000)
      
      let loader = this.$loading.show();
      setTimeout(() => loader.hide(), 700)
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
     
      
    },
    onChange: function(productid){
      console.log("test" + productid)
      this.$toasted.show("Product Updated").goAway(1000)
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
table, th, td {
    border: 1px solid black;
}
tr:nth-child(even){background-color: #f2f2f2}
</style>
