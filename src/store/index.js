import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedProducts: [
  ],
    user: null,
    auth: null
  },
  mutations: {
    createproduct (state, payload) {
      state.loadedproducts.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createProduct ({commit}, payload) {
        
    var uid = firebase.auth().currentUser.uid;
      const product = {
        title: payload.name,
        category: payload.category,
        price: payload.price,
        amount: payload.amount,
        description: payload.description,
      }
      // Reach out to firebase and store it
      
      let db = firebase.database()
      let products = db.ref('products')
      products.push(product)
      commit('createproduct', product)
    },
    logout({commit}){
        firebase.auth().signOut();
        commit('setUser',null)
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            var uid = firebase.auth().currentUser.uid;
            const newUser = {
              email: payload.email,
              registeredproducts: []
            }
            let db = firebase.database()
            let users = db.ref('user').child(uid)
            users.set(newUser)
            commit('setUser', newUser)
            commit('setAuth',uid)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then((user) =>{
            var uid = firebase.auth().currentUser.uid;
            const loguser = {
                email: payload.email,
                registeredproducts: []
              }
              commit('setUser', loguser)
              console.log("User Sign In")
              commit('setAuth',uid)
              console.log(uid)
          }
          )
          .catch(
            error => {
              console.log(error)
            }
          )
      }
  },
  getters: {
    loadedproducts (state) {
      return state.loadedProducts
    },
    featuredproducts (state, getters) {
      return getters.loadedproducts.slice(0, 5)
    },
    loadedproduct (state) {
      return (productId) => {
        return state.loadedproducts.find((product) => {
          return product.id === productId
        })
      }
    },
    user (state) {
      return state.user
    },
    auth (state) {
        return state.auth
    }
  }
})