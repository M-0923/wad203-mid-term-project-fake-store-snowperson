export default class App {
  /**
   * @type {App}
   */
  static #instance = null;

  /**
   * @type {ProductManager}
   */
  #productManager;

  /**
   * @type any
   */
  #cartManager;

  /**
   * Creates an instance of Shop.
   */
  constructor() {
    if (App.#instance) {
      return App.#instance;
    }
    App.INSTANCE = this;
  }

  /**
   * Return the instance of Shop
   * @returns {App}
   */
  static getInstance() {
    if (!App.#instance) {
      App.#instance = new App();
    }
    return App.#instance;
  }

  /**
   * Return the instance of ProductManager
   * @returns {ProductManager}
   */
  getProductManager() {
    return this.#productManager;
  }

  /**
   * Return the instance of Cart
   * @returns
   */
  getCartManager() {
    return this.#cartManager;
  }

  /**
   * Set the instance of ProductManager
   * @param {ProductManager} productManager
   */
  setProductManager(productManager) {
    this.#productManager = productManager;
  }

  /**
   * Set the instance of Cart
   * @param cartManager
   */
  setCartManager(cartManager) {
    this.#cartManager = cartManager;
  }
}
