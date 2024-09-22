<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <form @submit="onSubmit">
        <div class="form-group">
          <label for="name">نام محصول:</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="نام محصول خود را وارد کنید"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">توضیحات:</label>
          <input
            type="text"
            id="description"
            v-model="form.description"
            placeholder="توضیحات"
            required
          />
        </div>
        <div class="form-group">
          <label for="stock">جنس:</label>
          <input
            type="text"
            id="stock"
            v-model="form.stock"
            placeholder="جنس"
            required
          />
        </div>

        <div class="form-group">
          <label for="price">قیمت:</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            placeholder="قیمت را وارد کنید"
            required
          />
        </div>

        <div class="form-group">
          <label for="image">انتخاب عکس:</label>
          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            accept="image/*"
            required
          />
        </div>
        <div class="form-group">
          <label for="category">دسته‌بندی:</label>
          <select id="category" v-model="form.category" required>
            <option value="">یک گزینه انتخاب کنید</option>
            <option value="iphone">آیفون</option>
            <option value="mac">مک</option>
            <option value="watch">ساعت</option>
            <option value="sumsong">سامسونگ</option>
            <option value="ipad">آیپد</option>
          </select>
        </div>

        <button type="submit" class="submit-btn">ثبت محصول</button>
        <button type="reset" class="reset-btn" @click="onReset">
          بازنشانی
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar/Navbar.vue";
import Swal from "sweetalert2";

export default {
  name: "ADMINPANEL",
  components: {
    Navbar,
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        price: "",
        image: null,
        category: "", // مطمئن شوید که مقدار پیش‌فرض با مقدار گزینه‌ها هم‌خوانی دارد
        stock: "",
        updated_at: "",
      },
      category: [
        { text: "Select One", value: "" },
        "iphone",
        "mac",
        "sumsong",
        "ipad",
        "watch"
      ],
      show: true,
    };
  },
  methods: {
    useapp() {
      // console.log(this.form.name);
    },
    handleImageUpload(event) {
      this.form.image = event.target.files[0];
    },
    async onSubmit(event) {
      event.preventDefault();
      console.log("Form data before sending:", this.form); // اضافه کردن این خط برای بررسی داده‌ها

      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("price", this.form.price);
      formData.append("stock", this.form.stock);
      formData.append("category_id", this.form.category || ""); // اطمینان از ارسال مقدار درست
      formData.append("image", this.form.image);
      formData.append("created_at", new Date().toISOString());
      formData.append("updated_at", new Date().toISOString());

      try {
        const response = await fetch(
          "https://backendvue.vercel.app/api/products/post",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        await Swal.fire({
          title: "محصول با موفقیت ثبت شد!",
          icon: "success",
          confirmButtonText: "باشه",
        });
        console.log(result);

        // Reset form
        this.form = {
          name: "",
          description: "",
          price: "",
          image: null,
          category: "",
          stock: "",
          updated_at: "",
        };
      } catch (error) {
        console.error("Error:", error);
        await Swal.fire({
          title: "خطا در ثبت محصول!",
          text: "لطفاً دوباره تلاش کنید.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    },

    onReset(event) {
      event.preventDefault();
      this.form = {
        name: "",
        description: "",
        price: "",
        image: null,
        category: "",
        stock: "",
        updated_at: "",
      };
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 20px auto 20px auto;
  direction: rtl;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="file"],
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn {
  background-color: #28a745;
  color: #fff;
}

.reset-btn {
  background-color: #dc3545;
  color: #fff;
}

button:hover {
  opacity: 0.9;
}
</style>
