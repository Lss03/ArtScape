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
import userData from '@/api/user.js'; // Adjust the path as necessary

export default {
  name: 'LoginForm',
  props: {
    isRegistering: Boolean // Received from parent component
  },
  data() {
    return {
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
      this.$emit('toggle-signup');
    },
    signIn() {
      userData.getUserInfo(users => {
        const user = users.find(u => u.username === this.login.username);
        if (!user) {
          alert('User does not exist.');
          this.clearLoginForm();
          return;
        }
        if (user.password === this.login.password) {
          this.$router.replace('/Mypage'); // 导航到用户页面
        } else {
          alert('Username or Password is incorrect.');
          this.clearLoginForm();
        }
      });
    },

    signUp() {
      // 注册逻辑
      if (!this.register.username || !this.register.email || !this.register.password) {
        alert("Username, Email Address, and Password cannot be empty");
        return;
      }
      if (this.register.password !== this.register.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      userData.getUserInfo(users => {
        const userExists = users.some(u => u.username === this.register.username);
        if (userExists) {
          alert("Username already exists");
          this.clearRegistrationForm();
          return;
        }
        const newUser = {
          id: users.length + 1,
          username: this.register.username,
          email: this.register.email,
          password: this.register.password,
          // 其他属性
        };
        // 调用 updateUserInfo 或 addUser（取决于您如何命名）
        userData.updateUserInfo(newUser, () => {
          alert("Registration successful");
          this.toggleSignup();
        });
      });
    },
    clearRegistrationForm() {
      this.register.username = '';
      this.register.email = '';
      this.register.password = '';
      this.register.confirmPassword = '';
    },
    clearLoginForm() {
      this.login.username = '';
      this.login.password = '';
 },
  }
};
</script>

<style scoped>
@import '@/assets/css/loginFormStyles.css';
/* Additional styles as needed */
</style>
