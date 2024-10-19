import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//import vueTextareaAutosize from "vue-textarea-autosize";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
initializeApp(firebaseConfig)
const firebaseApp = initializeApp(firebaseConfig);
//const db = initializeApp(firebaseConfig)
//const db = firebaseApp.firestore()
const db =  getFirestore(firebaseApp)
export {db}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
