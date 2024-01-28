import App from "../App";
export default class CartItem {
  /**
   * @type {string} #productId
   */
  #productId;
  /**
   * @type {number} #quantity
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
   * @returns {number}
   */
  getQuantity() {
    return this.#quantity;
  }

  /**
   * Return the increased #quantity
   * @returns {number} #quantity
   */
  increaseQuantity() {
    this.#quantity++;
  }

  /**
   * Return the decreased #quantity
   * @returns {number} #quantity
   */
  decreaseQuantity() {
    this.#quantity--;
  }

  /**
   * Return the product of quantity and the price of the associated product
   * @returns {number} Sum of price and quantity
   */
  getSubtotalPrice() {
    const productPrice = App.getInstance()
      .getProductManager()
      .getProductByID(this.#productId)
      .getPrice();

    return this.#quantity * productPrice;
  }
}
