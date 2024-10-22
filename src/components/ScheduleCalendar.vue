<div>

</div>
<template>
  <div>
    <v-toolbar
        color="indigo"
        dark
    >
      <v-spacer></v-spacer>
      <v-toolbar-title>Scheduler App!</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-sheet
        tile
        height="54"
        class="d-flex"
    >
      <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
      ></v-select>
      <v-select
          v-model="mode"
          :items="modes"
          dense
          outlined
          hide-details
          label="event-overlap-mode"
          class="ma-2"
      ></v-select>
      <v-select
          v-model="weekday"
          :items="weekdays"
          dense
          outlined
          hide-details
          label="weekdays"
          class="ma-2"
      ></v-select>
      <NewTaskForm
          class="ma-2"
          @close="getEvents"
      ></NewTaskForm>
      <v-btn
          class="ma-2"
          color="primary"
          @click="logout">
        Log Out
      </v-btn>
      <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @click:event="showEvent"
          @change="getEvents"
      ></v-calendar>
      <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
      >
        <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
        >
          <v-toolbar
              :color="selectedEvent.color"
              dark
          >
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text >
            <span v-html="selectedEvent.tech"></span>
            <v-divider></v-divider>
            <span v-html="selectedEvent.address"></span>
            <v-divider></v-divider>
            <span v-html="selectedEvent.description"></span>
            <v-divider></v-divider>
            <form v-if="selectedEvent.statusComplete===false">
              <v-text-field
                  v-model="techNotes"
                  :error-messages="techNotesErrors"
                  label="Tech Notes"
                  required
                  @input="$v.techNotes.$touch()"
                  @blur="$v.techNotes.$touch()">
              </v-text-field>
            </form>
            <span v-else>
              <v-col>
                <v-row>
                  <span class="green--text">Complete!</span>
                </v-row>
                <v-row>
                  <span v-html="selectedEvent.techNotes"></span>
                </v-row>
              </v-col>
            </span>
          </v-card-text>
          <v-card-actions>
            <v-btn
                text
                color="secondary"
                @click="selectedOpen = false, clearError()">
              Close
            </v-btn>
            <v-btn
                text
                color="secondary"
                @click="completeEvent(selectedEvent)"
            >
              Complete
            </v-btn>
            <v-btn
                text
                color="secondary"
                @click="dbDeleteEvent(selectedEvent)"
            >
              Delete
            </v-btn>
          </v-card-actions>
          <span v-if="error" class="red--text" v-html="errorMessage"></span>
        </v-card>
      </v-menu>
    </v-sheet>
  </div>
</template>

<script>
import {doc, collection, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import {auth, db} from '@/main.js'
import NewTaskForm from "@/components/NewTaskForm.vue";
import { validationMixin } from 'vuelidate'
import {required} from "vuelidate/lib/validators";
//import {ref} from "vue";

export default {
  mixins: [validationMixin],

  validations: {
    techNotes: {required}
  },
  components: {NewTaskForm},
  data: () => ({
    techNotes: '',
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    type: 'month',
    types: ['month', 'week', 'day', '4day'],
    mode: 'stack',
    modes: ['stack', 'column'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: '',
    events: [],
    techs: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    error: null,
    errorMessage: ''
  }),

  computed: {
    techNotesErrors() {
      const errors = []
      if (!this.$v.techNotes.$dirty) return errors
      !this.$v.techNotes.required && errors.push('Item is required')
      return errors
    }
  },
  methods: {
    async getEvents() {
      let snapshot = await getDocs(collection(db, 'CalendarEvent'))
      let techSnapshot = await getDocs(collection(db, 'Techs'))
      let techs = []
      let events = []

      techSnapshot.forEach((doc) => {
        let techdata = doc.data()
        techdata.id = doc.id;
        techs.push({
          tech: techdata.Name,
          color: techdata.color,
        })
      })

      snapshot.forEach((doc) => {
        let eventdata = doc.data()
        eventdata.id = doc.id
        //if (eventdata.statusComplete === false) {
          events.push({
            id: eventdata.id,
            name: eventdata.eventType,
            tech: eventdata.tech,
            address: eventdata.address,
            description: eventdata.description,
            start: new Date(eventdata.startTimestamp.toDate()),
            end: new Date(eventdata.endTimestamp.toDate()),
            allDay: eventdata.allDay,
            techNotes: eventdata.techNotes || '',
            statusComplete: eventdata.statusComplete,
            color: 'blue'
          })
        //}

      })
      this.techs = techs
      this.events = events
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    getEventColor (event) {
      let techName = event.tech
      this.techs.forEach(tech => {
        if (tech.tech === techName){
          event.color = tech.color
        }
      })
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    completeEvent(selectedEvent) {
      this.$v.$touch()
      console.log(this.$v.$invalid)
      if (!this.$v.$invalid) {
        console.log(selectedEvent.id)
        this.dbCompleteEvent(selectedEvent)
      }
    },
    async dbCompleteEvent(selectedEvent) {
      const data = {
        eventType: selectedEvent.name,
        tech: selectedEvent.tech,
        address: selectedEvent.address,
        description: selectedEvent.description,
        startTimestamp: selectedEvent.start,
        endTimestamp: selectedEvent.end,
        allDay: selectedEvent.allDay,
        color: selectedEvent.color,
        techNotes: this.techNotes,
        statusComplete: true
      }
      await updateDoc(doc(db, 'CalendarEvent', selectedEvent.id), data)
          .then(() => {
            console.log('Document successfully updated!')
            this.clearError()
          })
          .catch((error) => {
            // Handle update errors
            this.error = error
            console.error('Error updating document:', error)
          })
      this.selectedOpen = false

      //return update


    },

    async dbDeleteEvent(selectedEvent) {
      const docRef = doc(collection(db, 'CalendarEvent'),selectedEvent.id)
      await deleteDoc(docRef)
          .then(() => {
            console.log('Document successfully deleted!')
            this.selectedOpen = false
            this.clearError()
        })
          .catch((error) => {
            // Handle update errors
            this.error = error
            console.error('Error deleting document:', error)
            this.errorMessage = ('Error deleting document:' + error)
          })

    },
    clearError(){
      this.error = null
      this.errorMessage = ''
    },
    logout(){
      auth.signOut()

    },
  },
}
</script>


<!--<style scoped>-->
<!--</style>-->