<template>
  <div class="cart">
    <Navbar />
    <div class="cart-container">
      <h1>سبد خرید</h1>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>سبد خرید شما خالی است!</p>
      </div>
      <div v-else>
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <img :src="`${item.image_url}`" :alt="item.name" class="cart-item-image" />
          <div class="cart-item-info">
            <h2>{{ item.name }}</h2>
            <p>قیمت: {{ item.price.toLocaleString('fa-IR') }} تومان</p>
            <p>تعداد: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)" class="remove-button">حذف</button>
          </div>
        </div>
        <div class="cart-summary">
          <h2>جمع کل: {{ totalPrice.toLocaleString('fa-IR') }} تومان</h2>
          <button class="checkout-button">پرداخت</button>
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Navbar from "../components/Navbar/Navbar.vue";
// import Footer from "../../../components/compoent/Foooter/Footer.vue";

export default {
  name: "CARD",
  components: {
    Navbar,
    // Footer,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
  methods: {
    getCartItems() {
      return JSON.parse(localStorage.getItem('cart')) || [];
    },
    removeFromCart(itemId) {
      let cart = this.getCartItems();
      cart = cart.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartItems = cart;
    },
  },
  mounted() {
    this.cartItems = this.getCartItems();
  },
};
</script>
<style scoped>
.cart {
  background-color: #f4f4f4;
  /* padding: 20px; */
  min-height: 100vh;
    direction: rtl;

}

.cart-container {
  max-width: 800px;
  margin: 40px auto 40px auto;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-item-image {
  max-width: 100px;
  margin-right: 20px;
  border-radius: 8px;
}

.cart-item-info {
    
  flex: 1;
}

.cart-item-info h2 {
  font-size: 15px;
  margin-right: 20px;
}

.cart-item-info p {
  font-size: 1rem;
  margin-right: 20px;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
  font-size: 0.9rem;
}

.remove-button:hover {
  background-color: #c82333;
}

.cart-summary {
  text-align: right;
  margin-top: 20px;
}

.checkout-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.checkout-button:hover {
  background-color: #218838;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
