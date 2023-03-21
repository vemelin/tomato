import '../scss/index.scss'
import tomato from './modules/Controller/Controller';

// Main Hero Timer block
import { RenderView } from  "./modules/View/View";
const view = new RenderView ('View')

// Her Timer BLock controller
// import { HeroTimerController } from  "./modules/Controller/Controller";
// const timerControl = new HeroTimerController ('Controller')

// Hero Tomato Timer
import { TomatoTimer } from './modules/View/HeroTimerBlock';
const tomatoTimer = new TomatoTimer('.window__timer-text', {
  taskTime: 25,
  shortRest: 5,
  longRest: 15,
  tasks: [
    {
      "name": "Task Name 01",   
      "description": 'Task description',   
      "completed": false,
      "priority": 'Medium',
    },
    {
      "name": "Task Name 02",   
      "description": 'Task description',   
      "completed": false,
      "priority": 'Medium',
    },
    {
      "name": "Task Name 03",   
      "description": 'Task description',   
      "completed": false,
      "priority": 'Medium',
    },
  ]
})

// Legacy Stuff
let count = 0;
const imp = ['default', 'important', 'so-so']
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i])
    } else {
      target.classList.remove(imp[i])
    }
  }
})
