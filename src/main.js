import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//import vueTextareaAutosize from "vue-textarea-autosize";
//import {auth} from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDjiu_rhcq6Wj-XfuBrOkpt49DGDU2BAnQ",
  authDomain: "csc480capstonedb.firebaseapp.com",
  projectId: "csc480capstonedb",
  storageBucket: "csc480capstonedb.appspot.com",
  messagingSenderId: "55466067119",
  appId: "1:55466067119:web:d321d3c54123852989005a",
  measurementId: "G-XW0XYWGZT1"
};
//initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);
// const db = initializeApp(firebaseConfig)
// const db = firebaseApp.firestore()
const db =  getFirestore(app)
const auth = getAuth(app);
// export {db}
export { auth, db };

// firebase.initializeApp(firebaseConfig);
auth.onAuthStateChanged(() => new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app'))

// new Vue({
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
