import "/sass/index.scss";
import { App } from "./App.js";
import { ProductManager } from "./components/ProductManager.js";
import { Product } from "./components/Product.js";
import $ from "jquery";

$(() => {
  const app = $("#app");
  new App(app);

  /**
   * Return the data from API server
   * @returns {Promise<Object[]>} productData
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
      return productData;
    } catch (error) {
      console.error("Error fetching product data.", error.message);
      throw error;
    }
  };

  const productManager = new ProductManager();

  /**
   * Push the data from API server to array of ProductManager class
   */
  fetchData().then((data) => {
    data.forEach((productData) => {
      const product = new Product(
        productData.id,
        productData.title,
        productData.price,
        productData.description,
        productData.image,
      );
      productManager.addProduct(product);
    });
  });
});
