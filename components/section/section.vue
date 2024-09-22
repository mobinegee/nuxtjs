<template>
  <div class="section">
    <img src="public/assets/bts-header-store-202406.jpeg" alt="" />
    <h2>فروشگاه آموزش. قدرتمندترین ابزار برای یادگیری</h2>
    <div class="icon-product">
      <router-link class="product-link" to="/Productcategory/mac">
        <div>
          <img
            src="public/assets/store-card-13-mac-nav-202310.png"
            alt=""
          />
          <p>مک</p>
        </div>
      </router-link>
      <router-link class="product-link" to="/Productcategory/ipad">
        <div>
          <img
            src="public/assets/store-card-13-ipad-nav-202405.png"
            alt=""
          />
          <p>آیپد</p>
        </div>
      </router-link>
      <router-link class="product-link" to="/Productcategory/iphone">
        <div>
          <img
            src="public/assets/store-card-13-iphone-nav-202309_GEO_US.png"
            alt=""
          />
          <p>آیفون</p>
        </div>
      </router-link>
      <router-link class="product-link" to="/Productcategory/watch">
        <div>
          <img
            src="public/assets/store-card-13-watch-nav-202309.png"
            alt=""
          />
          <p>ساعت</p>
        </div>
      </router-link>
      <router-link class="product-link" to="/Productcategory/airpad">
        <div>
          <img
            src="public/assets/store-card-13-airpods-nav-202209.png"
            alt=""
          />
          <p>ایرپاد</p>
        </div>
      </router-link>
      <router-link class="product-link" to="/Productcategory/airsticker">
        <div>
          <img
            src="public/assets/store-card-13-airtags-nav-202108.png"
            alt=""
          />
          <p>برچسب هوا</p>
        </div>
      </router-link>
      <router-link class="product-link" to="/Productcategory/tv">
        <div>
          <img
            src="public/assets/store-card-13-appletv-nav-202210.png"
            alt=""
          />
          <p>تلویزیون</p>
        </div>
      </router-link>
      <router-link class="product-link" to="/Productcategory/mac">
        <div>
          <img
            src="public/assets/store-card-13-homepod-nav-202301.png"
            alt=""
          />
          <p>هوم پاد</p>
        </div>
      </router-link>
    </div>
    <!-- <button @click="getallproducts">click get products</button> -->
  </div>
</template>

<script>
export default {
  name: "SECTION",
  components: {},
  methods: {
    async getallproducts() {
      try {
        const response = await fetch(
          "http://localhost:5100/api/products/getproducts",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Result => ", result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>

<style scoped>
.section {
  padding: 20px;
  background-color: #fafafc;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section img {
  width: 80%;
}
.product-link {
  text-decoration: none;
  color: black;
}

.product-link div {
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
  justify-content: center;
  height: 150px;
  margin: 10px;
  flex: 1 1 20%; /* Default width for larger screens */
}

.product-link img {
  width: 80%;
  margin-bottom: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);
  padding: 10px;
}

.product-link img:hover {
  width: 100%;
}

.section h2 {
  text-align: center;
  margin-top: 10px;
  padding: 20px;
}

.icon-product {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.icon-product p {
  text-decoration: none;
}

.icon-product div {
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
  justify-content: center;
  height: 150px;
  margin: 10px;
  flex: 1 1 20%; /* Default width for larger screens */
}

.icon-product img {
  width: 80%;
  margin-bottom: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);
  padding: 10px;
}

.icon-product img:hover {
  width: 100%;
}
router-link {
  text-decoration: none;
}

.icon-product p {
  margin: 0;
  text-align: center;
  font-size: 1em;
}

/* Media Queries */
@media screen and (max-width: 900px) {
  .icon-product div {
    flex: 1 1 25%; /* Adjust for medium screens */
  }
}
@media screen and (max-width: 600px) {
  .section img {
    width: 100%;
  }
  .section h2 {
    font-size: 14px;
  }
  .icon-product div {
    width: 50px;
  }
  .icon-product p {
    font-size: 10px;
  }
  .section {
    padding: 0px;
    margin-top: 10px;
    /* margin-bottom: 50px; */
    padding-bottom: 50px;
  }
  .product-link {
    height: 100px;
  }
  .product-link img:hover {
    width: 100%;
  }
}

@media screen and (max-width: 376px) {
  .icon-product div {
    flex: 1 1 50%; /* Adjust for small screens */
  }
}
</style>
