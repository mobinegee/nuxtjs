<template>
  <div class="profile-container">
    <div class="profile-card">
      <img :src="user.avatar" alt="User Avatar" class="avatar" />
      <h1 class="name">{{ user.name }}</h1>
      <p class="email">{{ user.email }}</p>
      <p class="bio">{{ user.bio }}</p>
      <button @click="exitaccount">خروج از حساب کاربری</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "USERINFORMATION",
  data() {
    return {
      user: {
        avatar: "https://via.placeholder.com/150",
        name: "John Doe",
        email: "john.doe@example.com",
        bio: "Software developer with a passion for open source and new technologies.",
      },
    };
  },
  methods: {
    exitaccount() {
      // پاک کردن Authtoken از Local Storage
      localStorage.removeItem('authToken');
      
      // هدایت کاربر به صفحه ورود
      this.$router.push('/');
      
      // در صورت عدم استفاده از Vue Router، می‌توانید از window.location استفاده کنید:
      // window.location.href = '/login';
    },
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.profile-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 300px;
}

.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.name {
  margin: 10px 0;
  font-size: 24px;
  color: #333;
}

.email {
  color: #777;
  font-size: 16px;
}

.bio {
  margin-top: 15px;
  color: #555;
  font-size: 14px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
