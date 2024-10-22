<template>
  <v-app>
    <v-main>
<!--      <component v-bind:is="appComponents"/>-->
      <ScheduleCalendar v-if="user" />
      <Login v-else/>
    </v-main>
<!--    <ScheduleCalendar v-if="false" />-->
<!--    <Login v-if="false"/>-->
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Login from "@/components/Login.vue";
import ScheduleCalendar from "@/components/ScheduleCalendar.vue";
//import firebase from "firebase/compat/app";
import {auth} from '@/main.js'


export default {
  name: 'App',

  components: {
    Login,
    ScheduleCalendar,
  },

  data: () => {
    return {
      user: auth.currentUser,
      //appComponents: Login
    }
  },
};
</script>