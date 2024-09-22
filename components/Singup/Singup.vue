<template>
  <div class="signup-container">
    <form class="signup-form" @submit.prevent="handleSubmit">
      <h2>ثبت نام</h2>
      <div class="input-group">
        <label for="username">نام کاربری</label>
        <input v-model="username" id="username" type="text" required />
      </div>
      <div class="input-group">
        <label for="email">ایمیل</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div class="input-group">
        <label for="password">رمز</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <div class="input-group">
        <label for="confirm-password">تکرار رمز</label>
        <input
          v-model="confirmPassword"
          id="confirm-password"
          type="password"
          required
        />
      </div>
      <button type="submit" class="signup-button">ثبت نام</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        await Swal.fire({
          title: "خطا",
          text: "رمز عبور با تکرار آن مطابقت ندارد.",
          icon: "error",
          confirmButtonText: "باشه",
        });
        return;
      }

      try {
        const response = await axios.post(
          "https://backendvue.vercel.app/api/users/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
          }
        );

        console.log("Signup successful:", response.data);

        if (response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("authToken", token);
          await Swal.fire({
            title: "موفقیت",
            text: "ثبت نام با موفقیت انجام شد!",
            icon: "success",
            confirmButtonText: "باشه",
          });

          this.$router.push("/");
        } else {
          console.error("No token found in response data.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        await Swal.fire({
          title: "خطا",
          text: "در ثبت نام مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  direction: rtl;
}

.signup-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.signup-form h2 {
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

.signup-button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.signup-button:hover {
  background-color: #218838;
}
</style>
