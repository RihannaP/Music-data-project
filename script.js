

import { getUserIDs, getListenEvents, getSong } from "./data.js";
import{addAnswerRow, getEverydaySongs, getLongestStreakSong, getMostListenedFridaySong, getMostListenedSong, getTopGenres, getTopItem} from "./calculation.js"

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
    const fridayNightSongCount = getMostListenedFridaySong(listenEvents, false);
    const fridayNightSongTime = getMostListenedFridaySong(listenEvents, true);
    const longestStreakSong = getLongestStreakSong(listenEvents);
    const dailySongs = getEverydaySongs(listenEvents);
    const topGenres = getTopGenres(listenEvents);


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
    answerHtml += addAnswerRow("Friday night song (count)", fridayNightSongCount);
    answerHtml += addAnswerRow("Friday night song (time)", fridayNightSongTime);
    answerHtml += addAnswerRow("Longest streak song", longestStreakSong);
    answerHtml += addAnswerRow("Every day songs", dailySongs);
    answerHtml += addAnswerRow(`Top ${topGenres.length} genres`, topGenres.join(", "));



    answerHtml += `</tbody></table>`;
    answerDiv.innerHTML = answerHtml;
  }

  // function addAnswerRow(question, answer) {
  //   return answer ? `<tr><td><span style="font-weight:bold">${question}</span></td><td>${answer}</td></tr>` : "";
  // }

  // function getTopItem(counts) {
  //   let topItem = "";
  //   let maxCount = 0;
  
  //   for (const [key, count] of Object.entries(counts)) {
  //     if (count > maxCount) {
  //       maxCount = count;
  //       topItem = key;
  //     }
  //   }
  //   return topItem
  // }


  // function getMostListenedSong(events, time, artist) {
  //   const songCounts = {};
  
  //    events.forEach(event => {
  //     const song = getSong(event.song_id)
  //     if(artist){
  //       const key = `${song.artist}`
  //       songCounts[key] = (songCounts[key] || 0) + (song.duration_seconds)
  //     }
  //     else{
  //     const key = `${song.artist} - ${song.title}`
  //     songCounts[key] = (songCounts[key] || 0) + (time ? (song.duration_seconds) : 1)
  //     }
  //   });

  //   return getTopItem(songCounts);
 
  // }
  
  // function getMostListenedFridaySong(events, time) {
  //   const songFriday = {};
  
  //   events.forEach(event => {
  //     const date = new Date(event.timestamp);
  //     const day = date.getDay();
  //     const hours = date.getHours();

  //     if ((day === 5 && hours >= 17 )|| (day === 6 &&  hours < 4)) {
  //       console.log(`date: ${date}, day: ${day}, hours: ${hours}`)
  //       const song = getSong(event.song_id);
  //       const key = `${song.artist} - ${song.title}`
  //       songFriday[key] = (songFriday[key] || 0) + (time ? (song.duration_seconds) : 1)
  //     }
  //   });
  
  //   return getTopItem(songFriday);
  // }
  
  
  // function getLongestStreakSong(events) {
  //   let maxStreak = 0;
  //   let currentStreak = 0;
  //   let lastSong = "";
  //   let longestSong = [];
  
  //   events.forEach(event => {
  //     const song = getSong(event.song_id);
  //     const key = `${song.artist} - ${song.title}`
  
  //     if (key === lastSong) {
  //       currentStreak++;
  //     } else {
  //       currentStreak = 1;
  //       lastSong = key;
  //     }
  
  //     if (currentStreak > maxStreak) {
  //       maxStreak = currentStreak;
  //       longestSong = [key];
  //     } else if(currentStreak === maxStreak){
  //       longestSong.push(key)
  //     }
  //   });
  
  //   return longestSong ? `${longestSong.join(", ")} (length: ${maxStreak})` : "";
  // }
  

  // function getEverydaySongs(events) {
  //   const songDays = {};
  
  //   events.forEach(event => {
  //     const song = getSong(event.song_id);
  //     const key = `${song.artist} - ${song.title}`
  //     const date = new Date(event.timestamp).toDateString();

  //     songDays[key] = songDays[key] || new Set();
  //     songDays[key].add(date);
  //   });
  
  //   const totalDays = new Set(events.map(x => new Date(x.timestamp).toDateString())).size;
  //   return Object.keys(songDays).filter(song => songDays[song].size === totalDays).join(", ") || "";
  // }
  
  // function getTopGenres(events) {
  //   const genreCounts = {};
  
  //   events.forEach(event => {
  //     const song = getSong(event.song_id);
  //     genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
  //   });
  
  //   const sortedGenres = Object.entries(genreCounts)
  //     .sort((a, b) => b[1] - a[1])
  //     .slice(0, 3)
  //     .map(([genre]) => genre);
  
  //   return sortedGenres.length ? sortedGenres : "";
  // }

