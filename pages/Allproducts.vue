<template>
  <div class="home">
    <Navbar />
    <div class="Sectiontop">
      <transition-group name="fade" tag="div" class="d-flex flex-wrap justify-content-center">
        <div
          v-for="product in products"
          :key="product.id"
          class="card mb-2 product-card"
          style="max-width: 15rem"
        >
          <img
            :src="`${product.image_url}`"
            class="card-img-top"
            alt="Product Image"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ product.name.substring(0, 25) }}{{ product.name.length > 25 ? '...' : '' }}
            </h5>
            <router-link class="btn btn-primary custom-link" :to="`/Product/${product.id}`">
              بیشتر
            </router-link>
          </div>
        </div>
      </transition-group>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar/Navbar.vue";
import Footer from "../components/footer/footer.vue";

export default {
  name: "ALLPRODUCTS",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      products: [], // برای ذخیره محصولات
    };
  },
  methods: {
    async getallproducts() {
      try {
        const response = await fetch(
          "https://backendvue.vercel.app/api/products/getproducts",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`خطا در دریافت داده! وضعیت HTTP: ${response.status}`);
        }

        const result = await response.json();
        this.products = result; // ذخیره داده‌های محصولات
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      }
    },
  },
  mounted() {
    this.getallproducts(); // بارگذاری محصولات هنگام بارگذاری کامپوننت
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

.custom-link {
  margin-top: 20px;
  font-size: 15px;
  padding: 10px 20px;
  background-color: #0d6efd;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.custom-link:hover {
  background-color: #0b5ed7; /* تغییر رنگ در حالت hover */
  color: white;
}

.product-card {
  transition: transform 0.3s ease;
  margin: 10px;
}

.product-card:hover {
  transform: scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.card-img-top{
  height: 250px;
  padding: 10px;
}
</style>
