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
    // getMostListenedSong(events, time, artist);
    const mostListenedSongCount = getMostListenedSong(listenEvents, false, false);
    const mostListenedSongTime = getMostListenedSong(listenEvents, true, false);
    const mostListenedArtistCount = getMostListenedSong(listenEvents, false, true);
    const mostListenedArtistTime = getMostListenedSong(listenEvents, true, true);
    // const fridayNightSongCount = getMostListenedFridaySong(listenEvents);
    // const fridayNightSongTime = getMostListenedFridaySong(listenEvents, true);
    // const longestStreakSong = getLongestStreakSong(listenEvents);
    // const dailySongs = getEverydaySongs(listenEvents);
    // const topGenres = getTopGenres(listenEvents);


    let answerHtml = `<table border="1">
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          </tr>
      </thead>
      <tbody>`;

    
    answerHtml += addAnswerRow("Most listened song (count)", mostListenedSongCount);
    answerHtml += addAnswerRow("Most listened song (time)", mostListenedSongTime);
    answerHtml += addAnswerRow("Most listened artist (count)", mostListenedArtistCount);
    answerHtml += addAnswerRow("Most listened artist (time)", mostListenedArtistTime);
    // answerHtml += addAnswerRow("Friday night song (time)", fridayNightSongTime);
    // answerHtml += addAnswerRow("Longest streak song", longestStreakSong);
    // answerHtml += addAnswerRow("Every day songs", dailySongs);
    // answerHtml += addAnswerRow("Top genres", topGenres);



    answerHtml += `</tbody></table>`;
    answerDiv.innerHTML = answerHtml;
  }

  function addAnswerRow(question, answer) {
    return answer ? `<tr><td><span style="font-weight:bold">${question}</span></td><td>${answer}</td></tr>` : "";
  }

  function getTopItem(counts) {
    let topItem = "";
    let maxCount = 0;
  
    for (const [key, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topItem = key;
      }
    }
    return topItem
  }


  function getMostListenedSong(events, time, artist) {
    const songCounts = {};
  
     events.forEach(event => {
      const song = getSong(event.song_id)
      if(artist){
        const key = `${song.artist}`
        songCounts[key] = (songCounts[key] || 0) + (song.duration_seconds)
      }
      else{
      const key = `${song.artist} - ${song.title}`
      songCounts[key] = (songCounts[key] || 0) + (time ? (song.duration_seconds) : 1)
      }
    });

     let mostListend = getTopItem(songCounts)
    return `${mostListend}`
 
  }
  
  
