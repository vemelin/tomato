import { timerBlock } from '../View/HeroTimerBlock';

export class RenderView {
  constructor (options) {
    this.options = options;
    console.log(this.options);
    console.log(this.#privateData('777-777-777', 'App Name', 1));
  }
  #privateData = (id, name, inc) => {
    return (id || name || inc) ? {id: id, name: name, inc: inc} : {
      id: 'XXX-XXX-XXX',
      name: 'Tomato Timer',
      inc: 0
    };
  }
  renderHtml () {
    const body = document.querySelector('body');
    console.log(body);
  }
  updateInc (inc) {
    return this.options.inc = ++inc;
  }
  updateName (arg) {
    return this.options.name = arg;
  }
}
