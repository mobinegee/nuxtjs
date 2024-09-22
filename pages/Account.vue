<template>
  <div class="home">
    <Navbar />
    <div v-if="statuslogin">
      <Userinformation />
    </div>
    <div v-else>
      <div v-if="status">
        <Singup />
        <button class="signup-button" @click="setStatusFalse">ورود</button>
      </div>
      <div v-else>
        <Loginform />
        <button class="login-button" @click="setStatustrue">ثبت نام</button>
      </div>

      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar/Navbar.vue";
import Footer from "../components/footer/footer.vue";
import Loginform from "../components/LoginForm/LoginForm.vue";
import Singup from "../components/Singup/Singup.vue";
import Userinformation from '../components/Userinformation/Userinformation.vue'

export default {
  name: "ACCOUNT",
  components: {
    Navbar,
    Footer,
    Loginform,
    Singup,
    Userinformation
  },
  data() {
    return {
      status: false,
      statuslogin: false
    };
  },
  created() {
    // بررسی وجود authtoken و تنظیم وضعیت login
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.statuslogin = true;
    } else {
      this.statuslogin = false;
    }
  },
  methods: {
    setStatusFalse() {
      this.status = false; // تغییر وضعیت به false
    },
    setStatustrue() {
      this.status = true; // تغییر وضعیت به true
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
.footer {
  /* position: fixed; */
  /* bottom: 0px; */
}
.login-button {
  /* width: 100%; */
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
  .signup-button {
    /* width: 100%; */
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
