class TimerQueue {
  constructor () {
    this.queue = [];
  }
  push (timer) {
    this.queeu.push(timer);
  }
  pop () {
    return this.queue.shift();
  }
  peek () {
    return this.queue.slice(0, 1);
  }
  isEmpty () {
    return !this.queue.length;
  }
  count () {
    this.queue = [];
  }
}