<template>
  <div class="home">
    <Navbar />

    <div class="container">
      <!-- بخش جزئیات محصول -->
      <div class="product-details">
        <div class="product-image">
          <img :src="`${product.image_url}`" :alt="product.name" />
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <ul>
            <li v-for="item in descriptionItems" :key="item">{{ item }}</li>
          </ul>
          <p class="price">قیمت: {{ formattedPrice }} تومان</p>
          <button class="add-to-cart" @click="addToCart">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
      <h3 v-if="showcategory">محصولات مشابه</h3>

      <!-- بخش محصولات مشابه -->
      <div class="product-grid">
        <div class="product-card" v-for="product in products" :key="product.id">
          <img
            :src="`${product.image_url}`"
            :alt="product.name"
            class="product-moshabeh"
          />
          <div class="product-card-info">
            <h3>{{ product.name }}</h3>
            <router-link class="custom-link" :to="`/Product/${product.id}`"
              >بیشتر</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Swal from "sweetalert2";
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
      product: {},
      products: [],
      productId: "",
      categories: "",
      showcategory: false,
      desctiptionProduct: "",
    };
  },
  computed: {
    formattedPrice() {
      if (!this.product.price) return "";
      return this.product.price.toLocaleString("fa-IR");
    },

    descriptionItems() {
      return this.desctiptionProduct.split(",").map((item) => item.trim());
    },
  },
  methods: {
    addToCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find((item) => item.id === this.product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...this.product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Display success message using SweetAlert
      Swal.fire({
        title: "محصول اضافه شد!",
        text: `${this.product.name} به سبد خرید اضافه شد.`,
        icon: "success",
        confirmButtonText: "باشه",
        timer: 1500,
      });
    },

    async getProductById() {
      try {
        this.productId = this.$route.params.id;

        const response = await fetch(
          `https://backendvue.vercel.app/api/products/products/${this.productId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching product! HTTP Status: ${response.status}`
          );
        }

        const result = await response.json();
        this.desctiptionProduct = result.description;
        this.product = result;
        this.categories = result.category_id;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },

    async getallproducts() {
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
        if (result.length > 1) {
          this.showcategory = true;
        }

        const currentProductId = String(this.productId);
        this.products = result.filter(
          (product) => product.id !== currentProductId
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },

  watch: {
    "$route.params.id": {
      handler() {
        this.getProductById();
        this.getallproducts();
        this.scrollToTop();
      },
      immediate: true,
    },
  },

  async mounted() {
    await this.getProductById();
    await this.getallproducts();
    this.scrollToTop();
  },
};

</script>

<style scoped>
.product-info ul {
  list-style-type: none; /* حذف بولت‌ها */
  padding: 0; /* حذف پدینگ پیش‌فرض */
  margin: 10px 0; /* فاصله بین لیست و محتوای دیگر */
}

.product-info li {
  background-color: #f8f9fa; /* رنگ پس‌زمینه برای آیتم‌های لیست */
  padding: 10px; /* فاصله داخلی */
  margin-bottom: 10px; /* فاصله بین آیتم‌های لیست */
  border-radius: 5px; /* گرد کردن گوشه‌ها */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* اضافه کردن سایه برای عمق */
  transition: background-color 0.3s ease; /* انیمیشن تغییر رنگ پس‌زمینه */
}

.product-info li:hover {
  background-color: #e2e6ea; /* تغییر رنگ پس‌زمینه در حالت هاور */
}
.custom-link {
  width: 150px;
}
.home {
  text-align: center;
  background-color: #f4f4f4;
  /* padding: 20px 0; */
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
  max-width: 100%;
  height: 400px;
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
.product-moshabeh {
  height: 250px;
  padding: 10px;
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
  height: auto;
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
