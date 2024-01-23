export class ProductManager {
  /**
   * @type {object[ ]} #productList
   */
  #productList;

  constructor() {
    this.#productList = [];
  }

  /**
   *
   * @param {object} product
   */
  addProduct(product) {
    this.#productList.push(product);
    console.log(this.#productList);
  }
}
