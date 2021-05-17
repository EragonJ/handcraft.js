export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
  }

  off(name, fn) {
    if (this.events[name]) {
      const index = this.events[name].indexOf(fn);
      if (index >= 0) {
        this.events[name].splice(index, 1);
      }
    }
  }

  emit(name, parameters) {
    if (this.events[name]) {
      this.events[name].forEach((fn) => {
        fn(parameters);
      });
    }
  }

  once(name, fn) {
    const that = this;
    this.on(name, function temp(parameters) {
      that.off(name, temp);
      fn(parameters);
    });
  }
}
