<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="userName">User Name:</label>
        <input type="email" id="userName" v-model="userName" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userName: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Perform login logic here, e.g., send credentials to an API
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }
};
</script>

<style scoped>

</style>