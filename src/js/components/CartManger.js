import App from "../App";
export class CartManger {
  /**
   * @type {Cart[]} #productId
   */
  #cartList;

  constructor() {
    this.#cartList = [];
  }

  /**
   * Push Cart to #cartList or increase the number of #quantity
   * @param {Cart} cart
   */
  addCart(cart) {
    const isCartItemInCart = this.#cartList.some((cartItem) => {
      return cartItem.getProductId() == cart.getProductId();
    });

    if (!isCartItemInCart) {
      this.#cartList.push(cart);
    } else {
      cart.increaseQuantity();
    }
  }

  /**
   * Remove Cart from #cartList or decrease number of quantity of cartItem
   * @param {string} productId
   */
  removeCart(productId) {
    const removedCartItem = this.#cartList.find((cartItem) => {
      return cartItem.getProductId() === productId;
    });

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
   *
   * @param {string} productId
   * @returns {number} Sum of price and quantity
   */
  getSubtotalPrice(productId) {
    const app = App.getInstance();
    const productManager = app.getProductManager();
    const product = productManager.getProductByID(productId);
    const productPrice = product.getPrice();

    const itemInCart = this.#cartList.find((cartItem) => {
      return cartItem.getProductId() === productId;
    });

    const productQty = itemInCart.getQuantity();

    return productPrice * productQty;
  }

  /**
   *
   * @returns {number} Sum of price and quantity for all items
   */
  getTotalPrice() {
    const app = App.getInstance();
    const productManager = app.getProductManager();
    const productList = productManager.getProductList();

    const totalPrice = this.#cartList.reduce((total, cartItem) => {
      const productId = cartItem.getProductId();
      const productQty = cartItem.getQuantity();

      const matchedItem = productList.find((product) => {
        return product.getId() === productId;
      });

      const productPrice = matchedItem.getPrice();

      return (total += productPrice * productQty);
    }, 0);

    return totalPrice;
  }
}
