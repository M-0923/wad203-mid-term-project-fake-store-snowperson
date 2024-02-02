import Renderer from "./abstract/Renderer.js";

export default class ProductRenderer extends Renderer {
  /**
   * @type {HTMLTemplateElement}
   */
  #template;

  /**
   * Creates an instance of ProductRenderer.
   * @param {HTMLElement} container
   */
  constructor(container) {
    super(container);
    this.#template = document.querySelector("#product-template");
    if (!this.#template) {
      throw new Error("Template not found!");
    }
  }

  /**
   * Renders a product. Only updates the DOM if the product data has changed.
   * @param {Product} product
   */
  render(product) {
    const container = this.getContainer();
    const existingProductContainer = container.querySelector(
      `[data-id="${product.getId()}"]`,
    );

    if (existingProductContainer) {
      const propertyMap = this.#generatePropertyMap(product);
      const changes = this.hasChanged(propertyMap, existingProductContainer);

      if (changes.length === 0) return;

      changes.forEach((key) =>
        this.updateDOM(existingProductContainer, propertyMap[key]),
      );
    } else {
      const productElement = this.#createElement(product);
      container.append(productElement);
    }
  }

  /**
   * Creates a DOM element for the product.
   * @param {Product} product
   * @returns {HTMLElement}
   */
  #createElement(product) {
    const clone = this.#template.content.cloneNode(true);
    const productElement = clone.querySelector(".product");
    productElement.dataset.id = product.getId();

    const propertyMap = this.#generatePropertyMap(product);
    Object.keys(propertyMap).forEach((prop) => {
      const { selector, property, format, text } = propertyMap[prop];
      productElement.querySelector(selector)[property] = format
        ? format(text)
        : text;
    });

    return productElement;
  }

  /**
   * Returns the property map that consists of selector, property, format, and text.
   * @param {Product} product
   * @returns {Object<string, Object<string, string | number | function>>}
   */
  #generatePropertyMap(product) {
    return {
      title: {
        selector: "h4",
        property: "textContent",
        text: product.getTitle(),
      },
      description: {
        selector: "p",
        property: "textContent",
        text: product.getDescription(),
      },
      price: {
        selector: ".product__price",
        property: "textContent",
        format: (value) => `$${value}`,
        text: product.getPrice(),
      },
      image: { selector: "img", property: "src", text: product.getImage() },
    };
  }
}
