<template>
  <div class="container">
    <Navbar />
    <div class="Sectiontop">
      <transition-group name="fade" tag="div">
        <div
          v-for="product in products"
          :key="product.id"
          class="card mb-2"
          style="max-width: 15rem;"
        >
          <img
            :src="`${product.image_url}`"
            class="card-img-top"
            :alt="product.name"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ product.name.substring(0, 25) + (product.name.length > 25 ? '...' : '') }}
            </h5>
            <router-link class="btn btn-primary" :to="`/Product/${product.id}`">
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
import Navbar from "../../components/Navbar/Navbar.vue";
import Footer from "../../components/footer/footer.vue";

export default {
  name: "ALLPRODUCTS",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      products: [], // برای ذخیره محصولات
      resultsearch: "",
    };
  },
  methods: {
    async getallproducts() {
      this.resultsearch = this.$route.params.name;
      try {
        const response = await fetch(
          `https://backendvue.vercel.app/api/products/search?name=${this.resultsearch}`,
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
    this.getallproducts(); 
  },
};
</script>

<style scoped>
.container{
    display: contents;

}
.home {
  text-align: center;
}
.custom-link {
  display: inline-block;
  margin-top: 20px;
  font-size: 15px;
  width: 200px;
  padding: 10px 20px;
  background-color: #0d6efd;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.custom-link:hover {
  background-color: #0d6efd;
  color: white;
}

.Sectiontop div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.mb-2 {
  margin: 20px;
}

/* کلاس سفارشی برای کارت محصولات */
.product-card {
  transition: transform 0.3s ease;
}
.card img:hover {
  transform: scale(1.05);
}
.card img{
  padding: 10px;
}
.card:hover{
    transform: scale(1.05);

}

.card-title{
  text-align: center;
  margin: 10px 0px 20px 0px;
  width: 100%;
}

.product-card:hover {
  transform: scale(1.05);
}

/* انیمیشن Fade In */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
