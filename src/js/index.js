import "/sass/index.scss";
import { App } from "./App.js";
import { ProductManager } from "./components/ProductManager.js";
import { Product } from "./components/Product.js";
import $ from "jquery";

$(() => {
  const app = $("#app");
  new App(app);

  /**
   *
   * @return {object[]} productData
   */
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/products");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch product data. Status: ${response.status}`,
        );
      }
      const productData = await response.json();
      console.log(productData);
      return productData;
    } catch (error) {
      console.error("Error fetching product data.", error.message);
      throw error;
    }
  };

  const productManager = new ProductManager();
  fetchData().then((data) => {
    // console.log(data);
    data.map((productData) => {
      // console.log(productData);
      const product = new Product(
        productData.id,
        productData.title,
        productData.price,
        productData.description,
        productData.image,
      );
      productManager.addProduct(product);
    });
    console.log(productManager);
  });
});
