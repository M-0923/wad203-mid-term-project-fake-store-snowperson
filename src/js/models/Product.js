export default class Product {
  /**
   * @type {string} #id
   */
  #id;
  /**
   * @type {string} #title
   */
  #title;
  /**
   * @type {string} #price
   */
  #price;
  /**
   * @type {string} #desc
   */
  #desc;
  /**
   * @type {string} #img
   */
  #img;

  constructor(id, title, price, desc, img) {
    this.#id = id;
    this.#title = title;
    this.#price = price;
    this.#desc = desc;
    this.#img = img;
  }

  /**
   * Return #id
   * @returns {string} #id
   */
  getId() {
    return this.#id;
  }

  /**
   * Return #title
   * @returns {string} #title
   */
  getTitle() {
    return this.#title;
  }

  /**
   * Return #price
   * @returns {string} #price
   */
  getPrice() {
    return this.#price;
  }

  /**
   * Return #desc
   * @returns {string} #desc
   */
  getDescription() {
    return this.#desc;
  }

  /**
   * Return #img
   * @returns {string} #img
   */
  getImage() {
    return this.#img;
  }
}
