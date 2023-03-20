export class TomatoTimer {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options;
    this.activeTask = null;
    this.init()
  }

  init () {
    this.setTaskActive()
    this.output()
    this.inc(this.id())
    //Generate Id
    document.querySelector('.button-primary')
    .addEventListener('click', () => {
      this.inc(this.id())
      this.addTask(this.options.tasks, this.id(), 0)
    })
  }

  addTask (data, id, inc) {
    this.timer(this.options.taskTime);
    console.log(`Task Inc: ${++inc}`);
    console.log(id);
    return data.map(el => console.log(el));
  }

  setTaskActive (calback) {
    console.log('Set Task Active');
    if(calback) return calback;
  }
  
  runTask(data, calback) {
    try {
      if(data) {
        this.timer(this.options)
      }
    } catch (err) {
      console.warn(err);
    }
  }

  inc = (id) => console.log('Generated ID: ' + id);

  id = () => Date.now()
    .toString(36) + Math.random()
      .toString(36).substr(2);

  timer (minute) {
    // Render Elements Block to reflect timer numbers
    // Calculate total seconds
    let seconds = 20 * 60;
    if (minute) seconds = minute * 60;
  
    // Set Interval
    let timer_id = setInterval(() => {
      if (seconds < 1) {
        clearInterval(timer_id);
        timer_id = undefined;
      } 
      if (seconds === 0) {
        if(minute % 3 === 0) return this.timer(this.options.longRest)
        this.timer(this.options.shortRest)
        clearInterval(timer_id);
      }
      else this.output(this.$el, seconds);
      // if(seconds === 0) this.timer(this.options.longRest);

      seconds--;
    }, 1000)
  }

  output (block, seconds) {
    let hours, minutes, h, m, s;
    // this.$el.innerHTML = '00:00'

    // Limit use only 24 hours
    seconds = Math.min(seconds, 60 * 60 * 24);  
    hours = Math.floor(seconds / 3600);
    minutes = Math.floor((seconds % 3600) / 60);
    // Reset seconds
    seconds = Math.floor((seconds % 3600) % 60);
  
    // Add 0 in case if one number
    h = hours < 10 ? "0" + hours : hours.toString();
    m = minutes < 10 ? "0" + minutes : minutes.toString();
    s = seconds < 10 ? "0" + seconds : seconds.toString();

    //else block.innerHTML = "<span class='time'>" + h + ":" + m + ":" + s + "</span>";
    if (!seconds) this.$el.innerHTML = '25:00';
    else this.$el.innerHTML = "<span class='time'>" + m + ":" + s + "</span>";
  }

//   timer (time, i = 0) {
//     time = setInterval(() => i++, 1000);
//     // setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);

  //   // function printNumbers(from, to) {
  //   //   let current = from;
    
  //   //   let timerId = setInterval(function() {
  //   //     console.log(current);
  //   //     if (current == to) {
  //   //       clearInterval(timerId);
  //   //     }
  //   //     current++;
  //   //   }, 1000);
  //   // }
  //   // // использование:
  //   // printNumbers(5, 10);
  // }
}