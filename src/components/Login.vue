<template>
  <v-app >
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                      id = 'logInEmailField'
                      v-model="email"
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Email"
                      required
                  ></v-text-field>
                  <v-text-field
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      required
                  ></v-text-field>
                  <v-row>
                  <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                    <v-spacer></v-spacer>
                  <p class="red--text mt-4" v-if="loginFail"> Log in Failed! </p>
                    <v-spacer></v-spacer>
                  </v-row>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/main.js'

export default {
  name: "app-Login",
  data() {

    return {
      loginFail: false,
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
          })
          .catch((error) => {
            // Handle login errors
            this.loginFail = true
            console.error('Login failed:', error);
          });
    },
  },
};
</script>