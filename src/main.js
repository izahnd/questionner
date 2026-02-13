import './style.css'
import   { flashcards } from './flashcards.js'  
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    
    <h1>Hello Vite!</h1>
    
  </div>
`

setupCounter(document.querySelector('#counter'))
