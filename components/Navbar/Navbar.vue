<template>
  <div>
    <!-- Navbar -->
    <div class="topnav" :class="{ responsive: isResponsive }" id="myTopnav">
      <router-link class="namesite" to="/">اپل پلاس</router-link>
      <router-link class="topnava" to="/Allproducts">فروشگاه</router-link>
      <router-link class="topnava" to="/Productcategory/mac">مک</router-link>
      <div class="dropdown">
        <router-link to="/Account">
          <button class="dropbtn">
            <img src="https://mobinegee.github.io/vuejs/assets/1.png" alt="" width="25px" height="25px" />
            <i class="fa fa-caret-down"></i>
          </button>
        </router-link>
      </div>
      <div class="dropdown">
        <router-link to="/card">
          <button class="dropbtn">
            <img
              src="https://mobinegee.github.io/vuejs/assets/icons8-shopping-cart-100.png"
              alt=""
              width="25px"
              height="25px"
            />
            <i class="fa fa-caret-down"></i>
          </button>
        </router-link>
      </div>
      <div class="dropdown">
        <button class="dropbtn" @click="toggleSearchModal">
          <img
            src="https://mobinegee.github.io/vuejs/assets/icons8-search-500 (1).png"
            alt=""
            width="25px"
            height="25px"
          />
          <i class="fa fa-caret-down"></i>
        </button>
      </div>
      <router-link class="topnava" to="/Productcategory/iphone"
        >آیفون</router-link
      >
      <router-link class="topnava" to="/Productcategory/ipad">آیپد</router-link>
      <router-link class="topnava" to="/Productcategory/sumsong"
        >سامسونگ</router-link
      >
      <router-link class="topnava" to="/Adminpanel">ادمین پنل</router-link>
      <a
        class="topnava icon"
        href="javascript:void(0);"
        @click="toggleResponsive"
        >&#9776;</a
      >
    </div>

    <!-- Search Modal -->
    <div v-if="isSearchModalOpen" class="search-modal">
      <div class="modal-content">
        <span class="close" @click="toggleSearchModal">&times;</span>
        <h2>جستجو</h2>
        <input
          v-model="searchQuery"
          @keyup.enter="performSearch"
          type="text"
          placeholder="کالای مورد نظر را جستجو کنید..."
        />
        <button @click="performSearch">جستجو</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

import { defineComponent } from "vue";

export default defineComponent({
  name: "NAVBAR",
  data() {
    return {
      isResponsive: false,
      isSearchModalOpen: false,
      searchQuery: "",
    };
  },
  methods: {
    toggleResponsive() {
      this.isResponsive = !this.isResponsive;
    },
    toggleSearchModal() {
      this.isSearchModalOpen = !this.isSearchModalOpen;
    },
    performSearch() {
      if (this.searchQuery.trim() !== "") {
        this.$router.push(`/search/${this.searchQuery}`); // هدایت به صفحه جستجو با query
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "با موفقیت انجام شد",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        alert("لطفاً یک عبارت جستجو وارد کنید.");
      }
      this.toggleSearchModal(); // بستن مودال پس از جستجو
    },
  },
});
</script>

<style scoped>
/* Navbar styles remain unchanged */

.search-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #04aa6d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.search-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #04aa6d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: white;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
.namesite {
  font-size: 25px !important;
  margin-top: -8px;
}

.topnav {
  overflow: hidden;
  background-color: #fafafc;
  color: #161617;
}
.topnav h1 {
  color: black;
}

.topnav > a {
  float: right;
  display: block;
  color: #161617;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 15px;
}

.active {
  /* background-color: #04AA6D; */
  color: white;
}

.topnav .icon {
  display: none;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown {
  font-size: 17px;
  border: none;
  outline: none;
  color: white;
  /* padding: 14px 16px; */
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  font-family: inherit;
  margin: 0;
  background-color: inherit;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.topnava:hover {
  background-color: #555;
  color: white;
}
.dropdown:hover .dropbtn img {
  width: 30px;
  height: 30px;
}

.dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}

.dropdown:hover .dropdown-content {
  display: block;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child),
  .dropdown .dropbtn {
    display: none;
  }
  .topnav a.icon {
    float: left;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .icon {
    position: absolute;
    left: 0;
    top: 0;
  }
  .topnav{
    direction: rtl;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: right;
  }
  .topnav.responsive .dropdown {
    float: none;
  }
  .topnav.responsive .dropdown-content {
    position: relative;
  }
  .topnav.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    text-align: right;
  }
}
</style>
