<template>
  <v-app>
    <v-main>
      <ScheduleCalendar></ScheduleCalendar>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import ScheduleCalendar from "@/components/ScheduleCalendar.vue";

export default {
  name: 'App',

  components: {
    ScheduleCalendar,
  },

  data: () => ({
    //
  }),
};
</script>
