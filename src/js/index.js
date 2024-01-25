import "/sass/index.scss";
import App from "./App.js";
import { ProductManager } from "./components/ProductManager.js";
import { Product } from "./components/Product.js";
import $ from "jquery";
import ProductRenderer from "./renderer/ProductRenderer.js";

$(() => {
  // instantiate the App class
  const app = new App();

  // instantiate the ProductManager class
  const productManager = new ProductManager();
  // set the instance of ProductManager to App class
  app.setProductManager(productManager);

  // get the container to render the individual products
  const productsContainer = document.querySelector(".products");
  // instantiate the ProductRenderer class and pass the container
  const productRenderer = new ProductRenderer(productsContainer);
  // add a listener that will render the products when the productManager notifies
  productManager.addListener((data) => productRenderer.render(data));

  // instantiate the CartManager class
  // set the instance of CartManager to App class

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
