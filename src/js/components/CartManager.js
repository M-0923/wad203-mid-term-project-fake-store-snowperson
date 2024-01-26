import App from "../App";
import { CartItem } from "./CartItem";
export class CartManager {
  /**
   * @type {CartItem[]} #productId
   */
  #cartList;

  constructor() {
    this.#cartList = [];
  }

  /**
   * Push CartItem to #cartList or increase the number of #quantity
   * @param {string} productId
   */
  addCart(productId) {
    const cartItemInCart = this.getCartByProductId(productId);

    if (!cartItemInCart) {
      const cartItem = new CartItem(productId);
      this.#cartList.push(cartItem);
    } else {
      cartItemInCart.increaseQuantity();
    }
  }

  /**
   * Remove CartItem from #cartList or decrease number of quantity of cartItem
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
   * @returns {CartItem[]} #cartList
   */
  getCartList() {
    return this.#cartList;
  }

  /**
   * Return the sum of the prices multiplied by quantities for all items in the cartItem
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
   * Return a CartItem in #cartList or null if not found
   * @param {string} productId
   * @returns {(CartItem|null)}
   */
  getCartByProductId(productId) {
    const cartItemInCart = this.#cartList.find((cartItem) => {
      return cartItem.getProductId() == productId;
    });

    return cartItemInCart !== undefined ? cartItemInCart : null;
  }
}
