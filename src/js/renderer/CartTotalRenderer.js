import Renderer from "./Renderer.js";

export default class CartTotalRenderer extends Renderer {
  /**
   * Creates an instance of CartTotalRenderer.
   * @param {HTMLElement} container
   */
  constructor(container) {
    super(container);
  }

  /**
   * Renders the cart total.
   * @param {number} totalPrice
   */
  render(totalPrice) {
    const container = this.getContainer();

    const propertyMap = this.#generatePropertyMap(totalPrice);
    const changes = this.#hasChanged(propertyMap, container);

    if (changes.length === 0) return;

    changes.forEach((key) => this.#updateDOM(container, propertyMap[key]));
  }

  /**
   * Returns the property map for the cart total.
   * @param {number} data
   * @returns {Object<string, Object<string, string | number | function>>}
   */
  #generatePropertyMap(data) {
    return {
      totalPrice: {
        selector: "#total-price",
        property: "textContent",
        format: (text) => "$" + text,
        text: data,
      },
    };
  }

  /**
   * Returns a list of keys for propertyMap that have changed.
   * @param {Object<string, Object<string, string | number | function>>} propertyMap
   * @param {HTMLElement} existingContainer
   * @returns {string[]}
   */
  #hasChanged(propertyMap, existingContainer) {
    return Object.keys(propertyMap).filter((prop) => {
      const { selector, property, format, text } = propertyMap[prop];
      const productValue = format ? format(text) : text;
      const existingValue = existingContainer.querySelector(selector)[property];
      return existingValue !== productValue;
    });
  }

  /**
   * Updates the DOM with the new data.
   * @param {HTMLElement} existingContainer
   * @param {Object<string, string | number | function>} properties
   */
  #updateDOM(existingContainer, properties) {
    const { selector, property, format, text } = properties;
    existingContainer.querySelector(selector)[property] = format
      ? format(text)
      : text;
  }
}
