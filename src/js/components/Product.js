export class Product {
  /**
   * @type {number} #id
   * @type {string} #title
   * @type {number} #price
   * @type {string} #desc
   * @type {string} #img
   */
  #id;
  #title;
  #price;
  #desc;
  #img;

  constructor(id, title, price, desc, img) {
    this.#id = id;
    this.#title = title;
    this.#price = price;
    this.#desc = desc;
    this.#img = img;
  }
}
