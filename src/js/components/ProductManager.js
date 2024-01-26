import Observable from "../renderer/Observable.js";

export class ProductManager extends Observable {
  /**
   * @type {Product[]} #productList
   */
  #productList;

  constructor() {
    super();
    this.#productList = [];
  }

  /**
   * Push the product to #productList
   * @param {Product} product
   */
  addProduct(product) {
    this.#productList.push(product);
    this.notify(product);
  }

  /**
   * Return #productList
   * @returns {Product[]} #productList
   */
  getProductList() {
    return this.#productList;
  }

  /**
   * Get a product by id
   * @param {string} id
   * @returns {(Product|null)}
   */
  getProductByID(id) {
    const matchedProduct = this.#productList.find((product) => {
      const productId = product.getId();
      return productId === id;
    });

    return matchedProduct !== undefined ? matchedProduct : null;
  }
}
