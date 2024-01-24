/**
 * Base class for all renderers.
 * This class must be extended by subclass!
 * @abstract
 */
export default class Renderer {
  /**
   * @type {HTMLElement}
   */
  #container;

  /**
   * Creates an instance of Renderer.
   * @abstract
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.#container = container;
  }

  /**
   * Renders the data with template, which is defined in this method in subclass, and appends it to the #container.
   * This method must be implemented by subclass!
   * @abstract
   * @param {Object | number} data
   * @returns void
   *
   * @example
   * const data = {
   * id: "1",
   * name: "Product 1",
   * }
   *
   * render(data) {
   *  this.getContainer().innerHTML = `
   *    <div class="product">
   *      <h1> ${data.name} </h1>
   *    </div>
   *  `;
   */
  // eslint-disable-next-line
  render(data) {
    throw new Error("Must be implemented by subclass!");
  }

  /**
   * Returns the container.
   * @returns {HTMLElement}
   */
  // eslint-disable-next-line
  getContainer() {
    return this.#container;
  }
}
