class Timer {
  constructor (name, duration_in_scondes) {
    this._name = name;
    this._duration = duration_in_scondes;
  }
  get name () {
    return this._name;
  }
  get duration () {
    return this._duration;
  }
}