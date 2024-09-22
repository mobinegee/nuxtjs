<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>ورود</h2>
      <div class="input-group">
        <label for="email">ایمیل</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">رمز</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">ورود</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  name: "LOGINFORM",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Send a POST request to your server with email and password
        const response = await axios.post(
          "https://backendvue.vercel.app/api/users/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        // Handle response
        console.log("Login successful:", response.data);
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        console.log("Token saved to localStorage:", token);

        await Swal.fire({
          title: 'ورود موفق',
          text: 'شما با موفقیت وارد شدید!',
          icon: 'success',
          confirmButtonText: 'باشه'
        });

        this.$router.push("/");

      } catch (error) {
        // Handle error
        console.error("Login failed:", error.response ? error.response.data : error.message);

        await Swal.fire({
          title: 'خطا',
          text: 'ورود ناموفق بود. لطفاً ایمیل و رمز عبور را بررسی کنید.',
          icon: 'error',
          confirmButtonText: 'باشه'
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  direction: rtl;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
