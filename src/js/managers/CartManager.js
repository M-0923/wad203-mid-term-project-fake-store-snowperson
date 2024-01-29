import App from "../App";
import CartItem from "../models/CartItem.js";
import Observable from "../observable/Observable.js";
export default class CartManager extends Observable {
  /**
   * @type {CartItem[]} #productId
   */
  #cartList;

  constructor() {
    super();
    this.#cartList = [];
  }

  /**
   * Push CartItem to #cartList or increase the number of #quantity
   * @param {string} productId
   */
  addCart(productId) {
    let cart = this.getCartByProductId(productId);

    if (!cart) {
      cart = new CartItem(productId);
      this.#cartList.push(cart);
    } else {
      cart.increaseQuantity();
    }

    this.notify(cart);
  }

  /**
   * Remove CartItem from #cartList or decrease number of quantity of cartItem
   * @param {string} productId
   */
  removeCart(productId) {
    const removedCartItem = this.getCartByProductId(productId);

    removedCartItem.decreaseQuantity();

    if (removedCartItem.getQuantity() === 0) {
      const removedArray = this.#cartList.filter((cartItem) => {
        const cartProductId = cartItem.getProductId();
        return cartProductId !== productId;
      });

      this.#cartList = removedArray;
    }

    this.notify(removedCartItem);
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
