import "../scss/index.scss";

// Main Hero Timer block
import { RenderView } from  "./modules/View/View";
const view = new RenderView ('View')

// Her Timer BLock controller
import { HeroTimerController } from  "./modules/Controller/Controller";
const timerControl = new HeroTimerController ('Controller')

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
