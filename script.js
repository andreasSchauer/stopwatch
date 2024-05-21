"use strict";

const stopwatch = document.getElementById("stopwatch");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const checkpointButton = document.getElementById("checkpoint-button");
const checkpointsList = document.getElementById("checkpoints-list")

let tenths = 0;
let timer;
let checkpoints = [];


const startTimer = () => {
    tenths++;
    const time = getTime(tenths);
    stopwatch.textContent = `${time.hours}:${time.minutes}:${time.seconds}.${time.decimal}`
 }


const getTime = (tenths) => {
  const hours = parseInt(BigInt(tenths) / 36000n);
  const minutes = parseInt(tenths / 600) - hours * 60;
  const seconds = parseInt(tenths / 10) - hours * 3600 - minutes * 60;
  const decimal = tenths - hours * 36000 - minutes * 600 - seconds * 10;
  
  const format = (num) => num < 10 ? "0" + num : num;
  
  return { 
    hours: format(hours),
    minutes: format(minutes),
    seconds: format(seconds),
    decimal
  }
}


startButton.addEventListener("click", () => {
  clearInterval(timer)
  timer = setInterval(startTimer, 100)
})


stopButton.addEventListener("click", () => {
  clearInterval(timer);
})


checkpointButton.addEventListener("click", () => {
  checkpointsList.innerHTML = "";
  checkpoints.push(tenths);
  
  checkpoints.forEach((checkpoint, index) => {
    const time = getTime(checkpoint);
    checkpointsList.innerHTML += `
      <li><span class="list-entry-num">${index + 1}: </span><span>${time.hours}:${time.minutes}:${time.seconds}.${time.decimal}</span></li>
    `
  })
})


resetButton.addEventListener("click", () => {
  clearInterval(timer);
  tenths = 0;
  stopwatch.textContent = "00:00:00.0";

  checkpoints = [];
  checkpointsList.innerHTML = `<p id="cp-description">No checkpoints set</p>`;
})
