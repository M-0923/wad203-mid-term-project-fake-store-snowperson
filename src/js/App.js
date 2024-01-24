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
    App.#instance = this;
  }

  /**
   * Return the instance of Shop.
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
