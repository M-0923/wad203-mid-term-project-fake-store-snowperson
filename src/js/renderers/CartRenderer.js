import Renderer from "./abstract/Renderer.js";
import App from "../App.js";

export default class CartRenderer extends Renderer {
  /**
   * @type {HTMLTemplateElement}
   */
  #template;
  constructor(container) {
    super(container);
    this.#template = document.querySelector("#cart-template");
    if (!this.#template) {
      throw new Error("Template not found!");
    }
  }

  /**
   * Renders the Cart card element.
   * @param {Cart} cart
   */
  render(cart) {
    const container = this.getContainer();
    const existingContainer = container.querySelector(
      `[data-id="${cart.getProductId()}"]`,
    );

    if (existingContainer) {
      const propertyMap = this.#generatePropertyMap(cart);
      const changes = this.hasChanged(propertyMap, existingContainer);

      // Don't render if there are no changes to reduce unnecessary DOM updates
      if (changes.length === 0) return;

      // Delete the element if quantity is 0
      if (cart.getQuantity() === 0) {
        this.deleteElement(existingContainer);
      } else {
        // Update the elements that have changed
        changes.forEach((key) =>
          this.updateDOM(existingContainer, propertyMap[key]),
        );
      }
    } else {
      // Create a new cart card element if it doesn't exist
      const cartElement = this.#createElement(cart);
      container.append(cartElement);
    }

    const isEmpty =
      App.getInstance().getCartManager().getCartList().length === 0;
    this.#toggleEmptyMessage(isEmpty);
  }

  /**
   * Creates a DOM element for the cart.
   * @param {Cart} cart
   * @returns {HTMLElement}
   */
  #createElement(cart) {
    const clone = this.#template.content.cloneNode(true);
    const cartElement = clone.querySelector(".cart-item");
    cartElement.dataset.id = cart.getProductId();

    const propertyMap = this.#generatePropertyMap(cart);
    Object.keys(propertyMap).forEach((prop) => {
      const { selector, property, format, text } = propertyMap[prop];
      cartElement.querySelector(selector)[property] = format
        ? format(text)
        : text;
    });

    return cartElement;
  }

  /**
   * Returns a list of keys for propertyMap that have changed.
   * @param {Cart} cart
   * @returns {Object<string, Object<string, string | number | function>>}
   */
  #generatePropertyMap(cart) {
    const product = App.getInstance()
      .getProductManager()
      .getProductByID(cart.getProductId());
    return {
      title: {
        selector: "h4",
        property: "textContent",
        text: product.getTitle(),
      },
      price: {
        selector: ".cart-item__price",
        property: "textContent",
        format: (text) => "$" + text,
        text: product.getPrice(),
      },
      quantity: {
        selector: ".cart-item__quantity",
        property: "textContent",
        format: (text) => "x" + text,
        text: cart.getQuantity(),
      },
      totalPrice: {
        selector: ".cart-item__price-subtotal",
        property: "textContent",
        format: (text) => "$" + text,
        text: cart.getSubtotalPrice(),
      },
      image: {
        selector: "img",
        property: "src",
        text: product.getImage(),
      },
    };
  }

  /**
   * Toggles the empty message.
   * @param {boolean} isVisible
   * @returns {void}
   */
  #toggleEmptyMessage(isVisible) {
    const emptyMessageElement =
      this.getContainer().querySelector("#cart-empty");
    const visibility = isVisible ? "block" : "none";

    if (
      !emptyMessageElement ||
      emptyMessageElement.style.display === visibility
    ) {
      return;
    }

    emptyMessageElement.style.display = visibility;
  }
}
