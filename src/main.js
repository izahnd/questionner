import './style.css'
import { flashcards } from './flashcards.js'

// Build the page content dynamically
const app = document.getElementById('app');

app.innerHTML = `
  <h1>Questionner</h1>
  <button class="questionner">Start Questionner</button>
  <table border="1" style=" display: none;">
    <thead>
      <tr>
        <th>Question</th>
        <th>Answer</th>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>
`;
document.querySelector(".questionner").addEventListener("click", () => 
  { document.querySelector("table").style.display = "block";
    startQuestionner(); document.querySelector(".questionner").style.display = "none"; 
  
   
}    




);


function startQuestionner() {
const tableBody = document.getElementById('tableBody');

flashcards.forEach(card => {
  const row = document.createElement('tr');
  document.querySelector(".questionner").style.display = "none";

  const questionCell = document.createElement('td');
  questionCell.textContent = card.question;

  const answerCell = document.createElement('td');
  answerCell.textContent = card.answer;

  row.appendChild(questionCell);
  row.appendChild(answerCell);

  tableBody.appendChild(row);
});

}