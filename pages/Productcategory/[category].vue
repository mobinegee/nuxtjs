<template>
  <div id="app">
    <div class="content">
      <!-- محتوای اصلی صفحه -->
      <Navbar />
      <div v-if="products.length > 0" class="product-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <img
            :src="`${product.image_url}`"
            :alt="product.name"
          />
          <div class="product-card-info">
            <h3>{{ product.name.substring(0, 40) + (product.name.length > 10 ? '...' : '') }}</h3>
            <!-- <p>{{ product.description }}</p> -->
            <router-link class="custom-link" :to="`/Product/${product.id}`"
              >بیشتر</router-link
            >
          </div>
        </div>
      </div>
      <h4 class="not-product" v-else>در حال حاضر موجود نیست</h4>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/Navbar/Navbar.vue";
import Footer from "../../components/footer/footer.vue";

export default {
  name: "PRODUCTS",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      product: {}, // برای ذخیره جزئیات محصول
      products: [],
      categories: "",
    };
  },
  methods: {
    async getallproducts() {
      this.categories = this.$route.params.category;
      try {
        const response = await fetch(
          `https://backendvue.vercel.app/api/products/productscategory/${this.categories}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching data! HTTP Status: ${response.status}`
          );
        }

        const result = await response.json();
        this.products = result ;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
  watch: {
    '$route.params.category': 'getallproducts',
  },
  async mounted() {
    await this.getallproducts(); // بارگذاری محصولات مشابه
  },
};
</script>



<style scoped>
html, body {
  height: 100%;
  margin: 0;
}
.not-product{
  margin: 20px;
  text-align: center;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.footer {
  background-color: #f4f4f4;
  padding: 20px;
  text-align: center;
}
.home {
  text-align: center;
  /* background-color: #f4f4f4; */
  /* padding: 20px 0; */
  /* margin: 0; */
}

.container {
  margin-top: 20px;
}

/* استایل بخش جزئیات محصول */
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.product-image img {
  max-width: 80%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.product-image img:hover {
  transform: scale(1.05);
}

.product-info {
  text-align: center;
  margin-top: 10px;
}

.product-info h1 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.product-info p {
  font-size: 1rem;
  color: #666;
}

.price {
  font-size: 1.2rem;
  color: #28a745;
  margin-bottom: 20px;
  font-weight: bold;
}

.add-to-cart {
  background-color: #28a745;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-to-cart:hover {
  background-color: #218838;
  transform: scale(1.05);
}

/* استایل بخش محصولات مشابه */
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  background-color: white;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-card img {
  width: 80%;
  height: 300px;
  padding: 10px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card img:hover {
  transform: scale(1.1);
}

.product-card-info {
  padding: 1rem;
  text-align: center;
}
.product-grid{
  margin-top: 50px;
}
h3 {
  margin: 20px 0px 20px 0px;
}
.custom-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #0d6efd;
  color: white !important;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
  width: 200px;
  font-size: 15px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.custom-link:hover {
  background-color: #0d6efd;
  color: white;
}

.product-card-info h3 {
  font-size: 1.1rem;
  margin: 0 0 10px;
  color: #333;
}

.product-card-info p {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;
}

.custom-link {
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
}

.custom-link:hover {
  text-decoration: underline;
}

/* Media Queries برای موبایل */
@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
    padding: 15px;
  }

  .product-info h1 {
    font-size: 1.25rem;
  }

  .product-info p {
    font-size: 0.9rem;
  }

  .price {
    font-size: 1rem;
  }

  .add-to-cart {
    font-size: 0.9rem;
    padding: 10px 20px;
  }

  .product-card {
    max-width: 100%;
    width: 100%;
  }

  .product-card-info h3 {
    font-size: 1rem;
  }

  .product-card-info p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .product-details {
    padding: 10px;
  }

  .product-info h1 {
    font-size: 1.1rem;
  }

  .product-info p {
    font-size: 0.8rem;
  }

  .price {
    font-size: 0.9rem;
  }

  .add-to-cart {
    font-size: 0.8rem;
    padding: 8px 16px;
  }

  .product-card-info h3 {
    font-size: 0.9rem;
  }

  .product-card-info p {
    font-size: 0.7rem;
  }
}
</style>
