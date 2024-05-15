
import '../css/common.css';
import Player from '@vimeo/player';
import { throttle } from 'lodash';


const TIME_KEY = 'videoplayer-current-time';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);


const onPlay = throttle(function (data) {
  const stringifyData = JSON.stringify(data);
  localStorage.setItem(TIME_KEY, stringifyData);
}, 1000);

// Adding the 'timeupdate' event listener to the player
player.on('timeupdate', onPlay);

// Function to resume playback from the stored time
function resumePlayback() {
  const storedData = JSON.parse(localStorage.getItem(TIME_KEY));
  if (!storedData || !storedData.seconds) {
    return;
  }

  const pausedTime = storedData.seconds;

  // Setting the current time of the video
  player.setCurrentTime(pausedTime)
    .then(function (seconds) {
      // Handle success if needed
    })
    .catch(function (error) {
      // Handle errors
      console.error('Error during playback resumption:', error);
    });
}

// Call the function to resume playback when the page loads
resumePlayback();