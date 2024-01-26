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
    const changes = this.hasChanged(propertyMap, container);

    if (changes.length === 0) return;

    changes.forEach((key) => this.updateDOM(container, propertyMap[key]));
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
}
