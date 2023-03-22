class TomatoTimerComponent {
  static get STATE_STOPPED() {
    return 1;
  }
  static get STATE_RUNNING() {
    return 2;
  }
  constructor(option = {}) {
    this.timerNameElem = document.querySelector(".timer_display_name");
    this.timerDurationElem = document.querySelector(".timer_display_duration");
    this.timerButtonElem = document.querySelector(".timer_button");

    this.timerQueue = new TimerQueue();

    this.defaultTimerQueue = options.defaultTimerQueue || [
      new Timer("Work", 25 * 60),
      new Timer("Rest", 5 * 60),
    ];

    this.currentTimer = null;
    this.currentTimerStart = 0;
    this.currentTimerSecondsLeft = 0;

    this.sate = TomatoTimerComponent.STATE_STOPPED;
    this.initEventHandlers();
  }
  /**
   * Create DOM event handlers.
   */
  initEventHandlers() {
    document.addEventListener(
      "click",
      function (e) {
        if (e.target.id === this.timerButtonElem.id) {
          if (this.state === TomatoTimerComponent.STATE_STOPPED) {
            this.event_startTimer.call(this);
          } else if (this.state === TomatoTimerComponent.STATE_RUNNING) {
            this.event_stopTimer.call(this);
          }
        }
      }.bind(this),
      false
    );
  }

  /**
   * Update DOM when state changes occur.
   */
  render() {
    if (this.state === TomatoTimerComponent.STATE_STOPPED) {
      this.timerButtonElem.textContent = "Start";
      if (this.timerQueue.isEmpty()) {
        this.timerNameElem.textContent = "Finished";
        this.timerDurationElem.textContent = this.formatDuration(0);
      }
    } else if (this.state === TomatoTimerComponent.STATE_RUNNING) {
      this.timerButtonElem.textContent = "Stop";
      if (this.currentTimer) {
        this.timerNameElem.textContent = this.currentTimer.name;
      }
      if (this.currentTimerSecondsLeft >= 0) {
        this.timerDurationElem.textContent = this.formatDuration(
          this.currentTimerSecondsLeft
        );
      }
    }
  }

  /**
   * Returns a duration in seconds as minutes and seconds.
   * @param {Number} duration_in_seconds Duration in seconds.
   * @returns {String} Duration formatted as "MM:SS"
   */
  formatDuration(duration_in_seconds) {
    let minutes = (duration_in_seconds / 60) | 0;
    let seconds = duration_in_seconds % 60 | 0;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  }

  /**
   * Re-create the timer queue using the default timer queue option.
   */
  createTimerQueue() {
    this.timerQueue.clear();
    Array.prototype.map.call(
      this.defaultTimerQueue,
      function (timer) {
        this.timerQueue.push(timer);
      }.bind(this)
    );
  }

  /**
   * Fetches the next timer in the queue and sets it as the current timer
   * to be rendered on screen.
   */
  getNextTimerFromQueue() {
    this.currentTimer = this.timerQueue.pop();
    if (this.currentTimer) {
      this.currentTimerStart = Date.now();
      this.currentTimerSecondsLeft = this.currentTimer.duration;
    }
    return this.currentTimer;
  }

  /**
   * User action: Start timer.
   */
  event_startTimer() {
    function timerUpdate() {
      this.currentTimerSecondsLeft =
        this.currentTimer.duration -
        (((Date.now() - this.currentTimerStart) / 1000) | 0);

      // Update UI
      requestAnimationFrame(
        function () {
          this.render();
        }.bind(this)
      );

      // If it reaches the end, look for next timer
      if (this.currentTimerSecondsLeft <= 0) {
        if (!this.getNextTimerFromQueue()) {
          // We are at the end of the queue
          this.event_stopTimer.call(this);
        }
      }
    }

    this.createTimerQueue();
    this.getNextTimerFromQueue();

    this.state = TomatoTimerComponent.STATE_RUNNING;

    // The following will call render() at 1s intervals
    timerUpdate.call(this);
    this.timerInterval = setInterval(timerUpdate.bind(this), 1000);
  }

  /**
   * User action: Stop timer.
   * Or, when timer queue is empty.
   */
  event_stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.currentTimer = null;
    this.currentTimerSecondsLeft = 0;

    this.state = TomatoTimerComponent.STATE_STOPPED;

    requestAnimationFrame(
      function () {
        this.render();
      }.bind(this)
    );
  }
}
