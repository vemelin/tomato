import { timerBlock } from '../View/HeroTimerBlock';

export class RenderView {
  constructor (options) {
    this.options = options;
    console.log(this.options);
    
    this.updateInc(this.options.inc)
    this.updateName('Application Name');
    console.log(this.options);
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
