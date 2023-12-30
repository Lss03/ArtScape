<template>
  <div class="login-form-container" :class="{signup: isRegistering}">
    <div class="container">
        <span></span>
        <span></span>
        <span></span>
      <!-- Toggle between login and registration form -->
      <form id="signinForm" v-if="!isRegistering">
        <h2>Login</h2>
        <div class="inputBox">
          <input type="text" placeholder="Username" v-model="login.username">
        </div>
        <div class="inputBox">
          <input type="password" placeholder="Password" v-model="login.password">
        </div>
        <div class="inputBox group">
          <a href="#">Forgot Password?</a>
          <a href="#" @click="toggleSignup">Signup</a>
        </div>
        <div class="inputBox">
          <input type="submit" value="Sign in" @click.prevent="signIn">
        </div>
      </form>
      <form id="signupForm" v-else>
        <h2>Registration</h2>
        <div class="inputBox">
          <input type="text" placeholder="Username" v-model="register.username">
        </div>
        <div class="inputBox">
          <input type="text" placeholder="Email Address" v-model="register.email">
        </div>
        <div class="inputBox">
          <input type="password" placeholder="Create Password" v-model="register.password">
        </div>
        <div class="inputBox">
          <input type="password" placeholder="Confirm Password" v-model="register.confirmPassword">
        </div>
        <div class="inputBox">
          <input type="submit" value="Register Account" @click.prevent="signUp">
        </div>
        <div class="inputBox group">
          <a href="#" @click="toggleSignup">Already Have an Account ? <b>Login</b></a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'LoginForm',
  data() {
    return {
      isRegistering: false,
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    toggleSignup() {
      this.isRegistering = !this.isRegistering;
    },
    signIn() {
      axios.get(`http://localhost:3000/users?username=${this.login.username}`)
        .then(response => {
          const user = response.data[0];
          if (!user) {
            alert('User does not exist.');
            this.clearLoginForm();
          } else if (user.password === this.login.password) {
            this.$router.replace('/Mypage'); // Replace with actual route
          } else {
            alert('Username or Password is incorrect.');
            this.clearLoginForm();
          }
        });
    },
    signUp() {
      if (!this.register.username || !this.register.email || !this.register.password) {
        alert("Username, Email Address, and Password cannot be empty");
        return;
      }
      if (this.register.password !== this.register.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      axios.get(`http://localhost:3000/users?username=${this.register.username}`)
        .then(response => {
          if (response.data.length > 0) {
            alert("Username already exists");
            this.clearRegistrationForm();
          } else {
            axios.post('http://localhost:3000/users', {
              username: this.register.username,
              email: this.register.email,
              password: this.register.password
            }).then(() => {
              alert("Registration successful");
              this.toggleSignup();
            });
          }
        });
    },
    clearLoginForm() {
      this.login.username = '';
      this.login.password = '';
    },
    clearRegistrationForm() {
      this.register.username = '';
      this.register.email = '';
      this.register.password = '';
      this.register.confirmPassword = '';
    }
  }
};
</script>
<style scoped>
@import '@/assets/css/loginFormStyles.css';
/* Additional styles as needed */
</style>
