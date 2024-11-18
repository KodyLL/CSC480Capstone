

<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Add New Task
        </v-btn>
      </template>
      <v-card
      class="pa-3">
        <v-card-title class=" justify-center text-h5" >
          New Task
        </v-card-title>
        <form>
          <v-row>
            <v-col
                cols="11"
                sm="5"
            >
              <v-select
                  v-model="eventType"
                  :items="eventTypes"
                  :error-messages="eventTypeErrors"
                  label="Event Type"
                  required
                  @change="$v.eventType.$touch()"
                  @blur="$v.eventType.$touch()"
                  @click = "getEventTypes()"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
                cols="11"
                sm="5"
            >
              <v-select
                  v-model="tech"
                  :items="techs"
                  :error-messages="techErrors"
                  label="Tech"
                  required
                  @change="$v.tech.$touch()"
                  @blur="$v.tech.$touch()"
                  @click ="getTechs()"
              ></v-select>
            </v-col>
          </v-row>
          <v-text-field
              v-model="address"
              :error-messages="addressErrors"
              label="Address"
              required
              @input="$v.address.$touch()"
              @blur="$v.address.$touch()"
          ></v-text-field>
          <v-text-field
              v-model="description"
              :error-messages="descriptionErrors"
              label="Description"
              required
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
          ></v-text-field>
          <v-row>
            <v-col
                cols="11"
                sm="5"
            >
              <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="startDate"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      required
                      v-bind="attrs"
                      v-on="on"
                      @input="$v.startDate.$touch()"
                      @blur="$v.startDate.$touch()"
                      :error-messages="startDateErrors"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="startDate"
                    @input="startDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
                cols="11"
                sm="5"
            >
              <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="endDate"
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      readonly

                      v-bind="attrs"
                      v-on="on"

                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="endDate"
                    @input="endDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col
                cols="11"
                sm="5"
            >
              <v-menu
                  ref="startTimeMenu"
                  v-model="startTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="startTime"
                      label="Start Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      RequiredIf
                      v-bind="attrs"
                      v-on="on"
                      @input="$v.startTime.$touch()"
                      @blur="$v.startTime.$touch()"
                      :error-messages="startTimeErrors"
                  ></v-text-field>
                </template>
                <v-time-picker
                    v-if="startTimeMenu"
                    v-model="startTime"
                    full-width
                    @click:minute="$refs.startTimeMenu.save(startTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
                cols="11"
                sm="5"
            >
              <v-menu
                  ref="endTimeMenu"
                  v-model="endTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="endTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="endTime"
                      label="End Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      @input="$v.endTime.$touch()"
                      @blur="$v.endTime.$touch()"
                      :error-messages="endTimeErrors"
                  ></v-text-field>
                </template>
                <v-time-picker
                    v-if="endTimeMenu"
                    v-model="endTime"
                    full-width

                    @click:minute="$refs.endTimeMenu.save(endTime)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-checkbox
              v-model="allDay"

              label="All Day?"

              @click ="clearTimes"
          ></v-checkbox>

          <v-btn
              class="mr-4"
              @click="submit"
          >
            submit
          </v-btn>
          <v-btn
              class="mr-4"
              @click="clear"
          >
            clear
          </v-btn>
          <v-btn @click="clear(), dialog = false">
            Cancel
          </v-btn>
          <p class="red--text mt-4" v-if="submitFail"> Event creation failed! {{ this.error }}</p>

        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import {db} from '@/main.js'
import { validationMixin } from 'vuelidate'
import {required, requiredIf} from 'vuelidate/lib/validators'
import {collection, getDocs, addDoc, Timestamp} from "firebase/firestore";
import moment from 'moment'


export default {
  mixins: [validationMixin],

  validations: {
    eventType:{required},
    tech:{required},
    address:{required},
    description:{required},
    startDate: {required},
    startTime:{
      required: requiredIf(function () {
        return this.allDay === false
      })
    },
    endTime:{
      required: requiredIf(function () {
        return this.allDay === false
      })
    },
  },

  data: () => ({
    techs:[],
    eventTypes:[],
    eventType:null,
    tech:null,
    address:'',
    description:'',
    startDate: null,
    endDate: null,
    startTime:null,
    endTime:null,
    allDay: false,
    dialog: false,
    menu: false,
    modal: false,
    startDateMenu: false,
    endDateMenu: false,
    startTimeMenu: false,
    endTimeMenu: false,
    submitFail: false,
    error: null
  }),

  computed: {
    eventTypeErrors () {
      const errors = []
      if (!this.$v.eventType.$dirty) return errors
      !this.$v.eventType.required && errors.push('Item is required')
      return errors
    },
    techErrors () {
      const errors = []
      if (!this.$v.tech.$dirty) return errors
      !this.$v.tech.required && errors.push('Item is required')
      return errors
    },
    addressErrors () {
      const errors = []
      if (!this.$v.address.$dirty) return errors
      !this.$v.address.required && errors.push('Address is required.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('Description is required')
      return errors
    },
    startTimeErrors () {
      const errors = []
      if (!this.$v.startTime.$dirty) return errors
      !this.$v.startTime.required && errors.push('Start time is required')
      return errors
    },
    endTimeErrors () {
      const errors = []
      if (!this.$v.endTime.$dirty) return errors
      !this.$v.endTime.required && errors.push('End time is required')
      return errors
    },
    startDateErrors () {
      const errors = []
      if (!this.$v.startDate.$dirty) return errors
      !this.$v.startDate.required && errors.push('Start date is required')
      return errors
    },
  },

  methods: {
    formatToTimeStamp(date, time){
      const formatedDate = new Date(moment(date, 'YYYY-MM-DD').valueOf())
      if(this.allDay===false) {
        const startTimeParts = time.split(':')
        formatedDate.setHours(startTimeParts[0], startTimeParts[1], 0, 0)
      }
      return Timestamp.fromDate(formatedDate)
    },
    async getTechs(){
      let techList = []
      let snapshot = await getDocs(collection(db, 'Techs'))
      snapshot.forEach((doc) => {
        let techdata = doc.data()
        techList.push(
          techdata.Name,
        )
      })
      this.techs = techList
    },
    async getEventTypes(){
      let eventTypeList = []
      let snapshot = await getDocs(collection(db, 'EventTypes'))
      snapshot.forEach((doc) => {
        let eventTypeData = doc.data()
        eventTypeList.push(
            eventTypeData.eventType,
        )
      })
      this.eventTypes = eventTypeList
    },

    submit () {
      if (this.allDay===true) {
        this.clearTimes()
      }
      if (this.endDate === null ){
        this.endDate = this.startDate
      }
      this.$v.$touch()
      console.log(this.$v.$invalid)
      if (!this.$v.$invalid) {
        this.dbEntry()
      }
    },
    clearTimes () {
      if (this.allDay === true) {
        this.startTime = null
        this.$v.startTime.$reset()
        this.endTime = null
        this.$v.endTime.$reset()
      }
    },
    clear () {
      this.$v.$reset()
      this.eventType = null
      this.tech = null
      this.address = ''
      this.description = ''
      this.startDate = null
      this.endDate =  null
      this.startTime = null
      this.endTime = null
      this.allDay =  false
    },
    async dbEntry() {
      const docRef = await addDoc(collection(db, "CalendarEvent"), {
        eventType: this.eventType,
        tech: this.tech,
        address: this.address,
        description: this.description,
        startTimestamp: this.formatToTimeStamp(this.startDate, this.startTime),
        endTimestamp: this.formatToTimeStamp(this.endDate, this.endTime),
        allDay: this.allDay,
        statusComplete: false,
        techNotes: ''
      }).then(() => {
          this.clear()
          this.dialog = false
          this.$emit('close')
      }).catch((error) => {
        // Handle login errors
        this.submitFail = true
        this.error = error
        console.error('Login failed:', error)
      })
      return docRef
    }
  },
}
</script>

<style scoped>

</style>