import './style.css'
import   { flashcards } from './flashcards.js'  
const tableBody = document.getElementById("tableBody");

flashcards.forEach(card => {
  const row = document.createElement("tr");

  const questionCell = document.createElement("td");
  questionCell.textContent = card.question;

  const answerCell = document.createElement("td");
  answerCell.textContent = card.answer;

  row.appendChild(questionCell);
  row.appendChild(answerCell);

  tableBody.appendChild(row);
});

document.querySelector('#app').innerHTML = `
  

setupCounter(document.querySelector('#counter'))
`