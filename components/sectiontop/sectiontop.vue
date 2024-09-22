<template>
  <div class="Sectiontop">
    <h3 class="name-title">جدید ترین محصولات</h3>
    <div class="d-flex flex-wrap justify-content-center">
      <div
        v-for="product in products"
        :key="product.id"
        class="card mb-2 product-card"
        style="width: 18rem"
      >
        <img
          :src="`${product.image_url}`"
          class="card-img-top"
          alt="Product Image"
        />
        <div class="card-body">
          <h5 class="card-title">
            {{ product.name.substring(0, 40) }}{{ product.name.length > 40 ? '...' : '' }}
          </h5>
          <router-link class="btn btn-primary custom-link" :to="`/Product/${product.id}`">
            بیشتر
          </router-link>
        </div>
      </div>
    </div>
    <router-link class="btn btn-outline-primary custom-link-outline" to="/Allproducts">
      بیشتر
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SECTIONTOP",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async getallproducts() {
      try {
        const response = await fetch(
          "https://backendvue.vercel.app/api/products/get5lastproducts",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`خطا در دریافت داده! وضعیت HTTP: ${response.status}`);
        }

        const result = await response.json();
        this.products = result;
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
.Sectiontop div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.name-title {
  margin: 30px 0px;
}
.mb-2 {
  margin: 20px;
}

.custom-link {
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.custom-link:hover {
  background-color: #28a745;
  color: white;
}
.custom-link {
  width: 150px;
}

.product-card:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.custom-link-outline {
  margin-top: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.custom-link-outline:hover {
  background-color: #28a745;
  color: white;
}
.card-img-top{
  width: 100%;
  height: 300px;
}
.card-title{
  margin: 10px;
  width: 100%;
}
</style>
