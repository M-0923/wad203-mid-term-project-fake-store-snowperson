export class Cart {
  /**
   * @type {string} #productId
   */
  #productId;
  /**
   * @type {string} #quantity
   */
  #quantity;

  /**
   *
   * @param {string} productId
   */
  constructor(productId) {
    this.#productId = productId;
    this.#quantity = 1;
  }

  /**
   * Return #productId
   * @returns {string} #productId
   */
  getProductId() {
    return this.#productId;
  }

  /**
   * Return #quantity
   * @returns {string} #quantity
   */
  getQuantity() {
    return this.#quantity;
  }

  increaseQuantity() {
    return this.#quantity++;
  }

  decreaseQuantity() {
    return this.#quantity--;
  }
}
