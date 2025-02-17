// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIDs, getListenEvents, getSong } from "./data.js";

window.onload = function () {
  populateUserDropdown()
  
};

function populateUserDropdown() {
  const userSelect = document.getElementById("user-select");
  const users = getUserIDs();

  // default
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "--Select a user--";
  userSelect.appendChild(defaultOption);

  // Populate dropdown with user options
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

function handleUserSelection(event) {
  const selectedUserId = event.target.value; 
  const answerDiv = document.getElementById("answers");

  // Clear
  answerDiv.innerHTML = "";

  if (selectedUserId) {
   displayAnswers(selectedUserId);
  }
  else {
    document.getElementById('answers').innerHTML = 'Please select a user.';
  }
}

const userSelect = document.getElementById("user-select");
  userSelect.addEventListener("change", handleUserSelection);

  function displayAnswers(userId){
    const answerDiv = document.getElementById("answers");
    const listenEvents = getListenEvents(userId);

    if (!listenEvents || listenEvents.length === 0) {
      answerDiv.textContent = "This user didn't listen to any songs.";
      return;
    }


    let answerHtml = `<table border="1">
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          </tr>
      </thead>
      <tbody>`;

    answerHtml += `</tbody></table>`;
    answerDiv.innerHTML = answerHtml;
  }

function addAnswerRow(question, answer) {
  return answer ? `<tr><td>${question}</td><td>${answer}</td></tr>` : "";
}