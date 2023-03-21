class Tomato {
  constructor (options) {
    if(Tomato._instance == null) {
      this.logs = []
      Tomato._instance = this
    } return Tomato._instance
  }
  log (message) {
    this.logs.push(message)
    console.log(`Loggeed: ${message}`);
  }
  print () {
    console.log(`${this.logs.length} logs`);
  }
}
const tomato = new Tomato()
Object.freeze(tomato);
export default tomato;