/**
 * Observable class that can be extended to create an observable object.
 * Observer pattern is used to notify the observers when the state of the observable object changes.
 */
export default class Observable {
  /**
   * @type {function[]}
   */
  #observers;

  /**
   * Creates an instance of Observable.
   */
  constructor() {
    this.#observers = [];
  }

  /**
   * Subscribes the given callback function to the observers.
   * @param {function} callback
   */
  // eslint-disable-next-line
  subscribe(callback) {
    this.#observers.push(callback);
  }

  /**
   * Unsubscribes the given callback function from the observers.
   * @param {function} callback
   */
  // eslint-disable-next-line
  unsubscribe(callback) {
    this.#observers = this.#observers.filter((obs) => obs !== callback);
  }

  /**
   * Notifies/calls all the callback functions in the observers.
   * @param {any} data
   */
  // eslint-disable-next-line
  notify(data) {
    this.#observers.forEach((observer) => observer(data));
  }
}
