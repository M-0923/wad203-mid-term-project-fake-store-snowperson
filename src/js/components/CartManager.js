import App from "../App";
import { Cart } from "./Cart";
import Observable from "../renderer/Observable.js";
export class CartManager extends Observable {
  /**
   * @type {Cart[]} #productId
   */
  #cartList;

  constructor() {
    super();
    this.#cartList = [];
  }

  /**
   * Push Cart to #cartList or increase the number of #quantity
   * @param {string} productId
   */
  addCart(productId) {
    let cart = this.getCartByProductId(productId);

    if (!cart) {
      cart = new Cart(productId);
      this.#cartList.push(cart);
    } else {
      cart.increaseQuantity();
    }

    this.notify(cart);
  }

  /**
   * Remove Cart from #cartList or decrease number of quantity of cartItem
   * @param {string} productId
   */
  removeCart(productId) {
    const removedCartItem = this.getCartByProductId(productId);

    if (removedCartItem.getQuantity() > 1) {
      removedCartItem.decreaseQuantity();
      return;
    }

    const removedArray = this.#cartList.filter((cartItem) => {
      const cartProductId = cartItem.getProductId();
      return cartProductId !== productId;
    });

    this.#cartList = removedArray;
  }

  /**
   * Return #cartList
   * @returns {Cart[]} #cartList
   */
  getCartList() {
    return this.#cartList;
  }

  /**
   * Return the sum of the prices multiplied by quantities for all items in the cart
   * @returns {number} Sum of price and quantity for all items
   */
  getTotalPrice() {
    const productManager = App.getInstance().getProductManager();

    const totalPrice = this.#cartList.reduce((total, cartItem) => {
      const productId = cartItem.getProductId();
      const productQty = cartItem.getQuantity();
      const matchedItem = productManager.getProductByID(productId);
      const productPrice = matchedItem.getPrice();

      return (total += productPrice * productQty);
    }, 0);

    return totalPrice;
  }

  /**
   * Return a cart item in #cartList or null if not found
   * @param {string} productId
   * @returns {(Product|null)}
   */
  getCartByProductId(productId) {
    const cartItemInCart = this.#cartList.find((cartItem) => {
      return cartItem.getProductId() == productId;
    });

    return cartItemInCart !== undefined ? cartItemInCart : null;
  }
}
