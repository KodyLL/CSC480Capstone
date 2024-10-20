<template>
  <v-app>
    <v-main>
      <component v-bind:is="appComponents"/>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Login from "@/components/Login.vue";
import ScheduleCalendar from "@/components/ScheduleCalendar.vue";


export default {
  name: 'App',

  components: {
    Login,
    ScheduleCalendar,
  },

  data: () => {
    return {
      appComponents: Login
    }
  },
};
</script>