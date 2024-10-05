/**
 * Létrehozza a timert és kezeli a timer eseményeit
 *
 * @param minutes {string}
 * @param seconds {string}
 */
function timer(minutes, seconds) {
  //* HTML elemek
  const $timerNode = addTimerNode();
  const $time = $timerNode.querySelector(".js-time");
  const $startBtn = $timerNode.querySelector(".js-startBtn");
  const $stopBtn = $timerNode.querySelector(".js-stopBtn");
  const $resetBtn = $timerNode.querySelector(".js-resetBtn");
  const $closeBtn = $timerNode.querySelector(".js-closeBtn");

  //* változók
  const initTime = Number.parseInt(minutes) * 60 + Number.parseInt(seconds);
  let time = initTime;
  let intervalId = null;

  //* segédfüggvények
  function addTimerNode() {
    const newNode = document.createElement("div");
    newNode.innerHTML = `
        <h2 class="js-time">0:00</h2>
        <div>
          <button class="js-startBtn">Start</button>
          <button class="js-stopBtn">Stop</button>
          <button class="js-resetBtn">Reset</button>
        </div>
        <div class="close">
          <button class="js-closeBtn">X</button>
        </div>
        `;
    newNode.className = "timer";
    document.body.appendChild(newNode);

    return newNode;
  }

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60); // megkapjuk a perc értékét

    let seconds = sec % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return `${minutes}:${seconds}`;
  }

  //* render
  function renderTime() {
    $time.innerHTML = formatTime(time);
  }

  //* eseményfigyelők
  function handleStart() {
    if (!intervalId && time > 0) {
      function start() {
        if (time === 0) {
          clearInterval(intervalId);
        } else {
          time--;
          renderTime();
        }
      }

      intervalId = setInterval(start, 1000);
    }
  }

  function handleStop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function handleReset() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    time = initTime;
    renderTime();
  }

  function handleClose() {
    handleStop();
    $timerNode.remove();
  }

  $startBtn.addEventListener("click", handleStart);
  $stopBtn.addEventListener("click", handleStop);
  $resetBtn.addEventListener("click", handleReset);
  $closeBtn.addEventListener("click", handleClose);

  //* szükséges függvényhívás
  renderTime();
}

//* HTML elemek
const $minutesInput = document.querySelector("[name=minutes]");
const $secondsInput = document.querySelector("[name=seconds]");
const $addBtn = document.querySelector(".js-addBtn");

//* segédfüggvények
function resetInput() {
  $minutesInput.value = "";
  $secondsInput.value = "";
}

//* eseményfigyelők
function handleAdd(event) {
  event.preventDefault();
  const minutes = $minutesInput.value;
  const seconds = $secondsInput.value;
  if (minutes && seconds) {
    timer(minutes, seconds);
  } else if (minutes) {
    timer(minutes, "0");
  } else if (seconds) {
    timer("0", seconds);
  }
  resetInput();
}

$addBtn.addEventListener("click", handleAdd);
