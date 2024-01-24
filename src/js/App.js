export default class App {
  static test = "test";

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
   * Creates an instance of App.
   */
  constructor() {
    if (App.#instance) {
      return App.#instance;
    }
    App.#instance = this;
  }

  /**
   * Return the instance of App.
   * Would recommend to use this method to get the instance of App class.
   * @returns {App}
   *
   * @example
   * const app = App.getInstance();
   * const productManager = app.getProductManager();
   * const productA = productManager.getProductByID("A");
   * console.log(productA.getTitle()); // This will print the title of productA
   */
  static getInstance() {
    if (!App.#instance) {
      throw new Error("App is not initialized.");
    }
    return App.#instance;
  }

  /**
   * Return the instance of ProductManager
   * @returns {ProductManager}
   */
  getProductManager() {
    if (!this.#productManager) {
      throw new Error("ProductManager is not set.");
    }
    return this.#productManager;
  }

  /**
   * Return the instance of Cart
   * @returns
   */
  getCartManager() {
    if (!this.#cartManager) {
      throw new Error("CartManager is not set.");
    }
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
