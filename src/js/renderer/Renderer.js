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
   * If it's initial, renders the data with template, which is defined in this method in subclass, and appends it to the #container.
   * If it's not initial, updates the DOM element with the giving properties.
   * @abstract
   * @param data
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

  /**
   * Returns a list of keys for propertyMap that have changed.
   * @param {Object<string, Object<string, string | number | function>>} propertyMap
   * @param {HTMLElement} existingContainer
   * @returns {string[]}
   */
  hasChanged(propertyMap, existingContainer) {
    return Object.keys(propertyMap).filter((prop) => {
      const { selector, property, format, text } = propertyMap[prop];
      const productValue = format ? format(text) : text;
      const existingValue = existingContainer.querySelector(selector)[property];
      return existingValue !== productValue;
    });
  }

  /**
   * Creates a DOM element for the data.
   * @abstract
   * @param data
   * @returns {HTMLElement}
   */
  // eslint-disable-next-line
  #createElement(data) {
    throw new Error("Must be implemented by subclass!");
  }

  /**
   * Updates the DOM element with the giving properties.
   * @abstract
   * @param {HTMLElement} existingContainer
   * @param {Object<string, string | function>} properties
   * @returns void
   */
  // eslint-disable-next-line
  #updateDOM(existingContainer, properties) {
    throw new Error("Must be implemented by subclass!");
  }

  /**
   * Returns the property map that consists of selector, property, format, and text (
   * @abstract
   * @param data
   * @returns {Object<string, Object<string, string | number | function>>}
   */
  // eslint-disable-next-line
  #generatePropertyMap(data) {
    throw new Error("Must be implemented by subclass!");
  }

  /**
   * Removes the element from the DOM.
   * @abstract
   * @param {HTMLElement} existingContainer
   * @param {Object<string, string | number | function>} properties
   */
  // eslint-disable-next-line
  #deleteElement(existingContainer, properties) {
    throw new Error("Must be implemented by subclass!");
  }
}
