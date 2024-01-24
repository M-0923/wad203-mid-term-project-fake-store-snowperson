export default class Observable {
  #observers;

  constructor() {
    this.#observers = [];
  }

  // eslint-disable-next-line
  subscribe(observer) {
    this.#observers.push(observer);
  }

  // eslint-disable-next-line
  unsubscribe(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  // eslint-disable-next-line
  notify(data) {
    this.#observers.forEach((observer) => observer(data));
  }
}
