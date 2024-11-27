import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";


Vue.config.productionTip = false
// FireStore Database Connection Configurator
const firebaseConfig = {
    apiKey: "AIzaSyDjiu_rhcq6Wj-XfuBrOkpt49DGDU2BAnQ",
    authDomain: "csc480capstonedb.firebaseapp.com",
    projectId: "csc480capstonedb",
    storageBucket: "csc480capstonedb.appspot.com",
    messagingSenderId: "55466067119",
    appId: "1:55466067119:web:d321d3c54123852989005a",
    measurementId: "G-XW0XYWGZT1"
}

// Initialize Database Instance
const app = initializeApp(firebaseConfig);
const db =  getFirestore(app)
const auth = getAuth(app);
export { auth, db}

//Connection to Firestore Emulator when no network connection for testing
if (location.hostname === 'localhost') {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(db, 'localhost', 8080); // Use the ports you configure
}

//Starts Vue
auth.onAuthStateChanged(() => new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app'))


