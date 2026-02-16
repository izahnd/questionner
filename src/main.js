import './style.css'
import { flashcards } from './flashcards.js'

// Build the page content dynamically
const app = document.getElementById('app');

app.innerHTML = `
  <h1 class="text-3xl font-extrabold underline" >Questionner</h1>
  <div class="content"></div>
  <button class="questionner">Start Questionner</button>
  <button class="next" style="display: none;">Next Card</button>`;
  
  const startQuestionner = () => {
    const elemnetHtml = document.querySelector(".content");
    const totalCards = flashcards.length;
    const randomIndex = Math.floor(Math.random() * totalCards);
    const qa = flashcards[randomIndex];
    elemnetHtml.innerHTML = `
  
  
  <table border="1" >
    <thead>
      <tr>
        <th>Question</th>
        <th>Answer</th>
      </tr>
      <tr>
        <td>${qa.question}</td>
        <td>${qa.answer}</td>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>
`};

document.querySelector(".questionner").addEventListener("click", () => 
  { 
    startQuestionner();
    document.querySelector(".next").style.display = "block";
    document.querySelector(".questionner").style.display = "none";

     
}    

);

document.querySelector(".next").addEventListener("click", () =>
  { 
    startQuestionner();
}
);

