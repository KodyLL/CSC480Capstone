<template>
  <v-app>
    <v-main>
      <ScheduleCalendar v-if="user" />
      <Login v-else/>
    </v-main>
  </v-app>
</template>

<script>
import Login from "@/components/Login.vue";
import ScheduleCalendar from "@/components/ScheduleCalendar.vue";
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
    }
  },
};
</script>