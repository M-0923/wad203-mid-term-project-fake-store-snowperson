import App from "../App";
export class CartManger {
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
    // console.log(this.#cartList);
  }

  /**
   * Remove Cart from #cartList
   * @param {string} productId
   */
  removeCart(productId) {
    const removedCartItem = this.#cartList.find((cartItem) => {
      return cartItem.getProductId() === productId;
    });
    // console.log(this.getCartList());

    // console.log('removedCartItem', removedCartItem);
    // console.log('qty:', removedCartItem.getQuantity());

    if (removedCartItem.getQuantity() > 1) {
      removedCartItem.decreaseQuantity();
      // console.log(this.getCartList());
      return;
    }

    const removedArray = this.#cartList.filter((cartItem) => {
      const cartProductId = cartItem.getProductId();
      return cartProductId !== productId;
    });

    this.#cartList = removedArray;
    // console.log(this.getCartList());
  }

  /**
   * Return #cartList
   * @returns {Cart[]} #cartList
   */
  getCartList() {
    return this.#cartList;
  }

  getSubtotalPrice(productId) {
    const app = App.getInstance();
    const productManager = app.getProductManager();
    const product = productManager.getProductByID(productId);
    // console.log(product);
    const productPrice = product.getPrice();
    // console.log('price', price);
    const itemInCart = this.#cartList.find((cartItem) => {
      return cartItem.getProductId() === productId;
    });
    console.log("itemInCart", itemInCart);
    const productQty = itemInCart.getQuantity();
    // console.log('productQty', productQty);
    return productQty * productPrice;
  }

  getTotalPrice() {}
}
