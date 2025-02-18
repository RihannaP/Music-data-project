
# 🎵 Music Data Analysis Project  

## Overview  
This project analyzes user listening data to provide insights such as the most listened-to songs, favorite artists, and top genres. It processes the data dynamically and presents the results in a simple HTML interface without additional styling.  

## Features  
- Select a user from a dropdown to view their listening stats  
- Identify the most listened-to song and artist by count and total listening time  
- Find the most popular song on Friday nights  
- Determine the longest consecutive listening streak of a song  
- Check if any songs were listened to every day during the user's activity  
- Display the user's top genres  

## Technologies Used  
- JavaScript (ES6)  
- HTML  
- [Supplied `data.js` module] for retrieving user data  


## File Structure  
- **index.html**: The main HTML file that displays the user interface  
- **script.js**: Manages user interactions, populates the dropdown, and displays answers  
- **calculation.js**: Contains functions for processing the listening data  
- **data.js**: Predefined module providing user and song data  

## How It Works  
1. **User Selection**  
   - Users are fetched from `getUserIDs()` and added to a dropdown  
   - When a user is selected, their listening history is retrieved using `getListenEvents(userID)`  

2. **Data Processing** (in `calculation.js`)  
   - **getMostListenedSong()**: Determines the most frequently played song/artist  
   - **getMostListenedFridaySong()**: Finds the most played song on Friday nights  
   - **getLongestStreakSong()**: Identifies the longest consecutive song play  
   - **getEverydaySongs()**: Finds songs listened to daily within the user's activity range  
   - **getTopGenres()**: Extracts the user's top three music genres  

3. **Displaying Results**  
   - The answers are formatted as an HTML table  
   - Questions without applicable results are hidden  


