
const TEST_COUNTDOWN = true;
const TEST_COUNTDOWN_SECONDS = 30;

function getBirthdayTarget() {
  if (TEST_COUNTDOWN) {
    return Date.now() + TEST_COUNTDOWN_SECONDS * 1000;
  }

  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 10, 2, 0, 0, 0);

  if (target <= now) {
    target = new Date(year + 1, 10, 2, 0, 0, 0);
  }

  return target.getTime();
}

const birthdayTarget = getBirthdayTarget();
const curtain = document.getElementById("midnightCurtain");

const timerParts = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

let countdownInterval;

function openBirthdayCurtains() {
  if (
    !curtain ||
    curtain.classList.contains("opening") ||
    curtain.classList.contains("finished")
  ) {
    return;
  }

  clearInterval(countdownInterval);
  curtain.classList.add("opening");

  window.setTimeout(() => {
    curtain.classList.add("finished");
    document.body.classList.remove("curtain-active");
  }, 2700);
}

function updateBirthdayCountdown() {
  const remaining = birthdayTarget - Date.now();

  if (remaining <= 0) {
    Object.values(timerParts).forEach((part) => {
      if (part) part.textContent = "00";
    });

    openBirthdayCurtains();
    return;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  timerParts.days.textContent = String(days).padStart(2, "0");
  timerParts.hours.textContent = String(hours).padStart(2, "0");
  timerParts.minutes.textContent = String(minutes).padStart(2, "0");
  timerParts.seconds.textContent = String(seconds).padStart(2, "0");
}

document.body.classList.add("curtain-active");

updateBirthdayCountdown();

if (Date.now() < birthdayTarget) {
  countdownInterval = window.setInterval(updateBirthdayCountdown, 1000);
}

// Speak birthday wishes using the browser's voice
function speakBirthdayWish() {
  if (!("speechSynthesis" in window)) {
    alert("Happy Birthday, Yousuf! 🎂❤️");
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(
    "Happy Birthday, Yousuf bhie! May your life be full of happiness, peace and success."
  );

  message.lang = "en-US";
  message.rate = 0.85;
  message.pitch = 1.15;
  message.volume = 1;

  window.speechSynthesis.speak(message);
}

// Open the birthday surprise
const openButton = document.getElementById("openSurprise");
const welcome = document.getElementById("welcome");
const surprise = document.getElementById("surprise");
const balloonLayer = document.getElementById("balloonLayer");

if (openButton && welcome && surprise) {
  openButton.addEventListener("click", () => {
    welcome.classList.add("hidden");
    surprise.classList.remove("hidden");
    document.body.classList.add("celebrating");

    animateBirthdayTitle();
    releaseBalloons(18);
    burstConfetti(100);
    speakBirthdayWish();

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Show Happy Birthday letters one by one
function animateBirthdayTitle() {
  const lines = [
    document.getElementById("birthdayLineOne"),
    document.getElementById("birthdayLineTwo")
  ];

  lines.forEach((line) => {
    if (!line || line.dataset.animated === "true") return;

    const text = line.textContent;
    line.textContent = "";
    line.dataset.animated = "true";

    Array.from(text).forEach((character, index) => {
      const letter = document.createElement("span");
      letter.className = "birthday-letter";
      letter.textContent = character === " " ? "\u00A0" : character;
      letter.style.animationDelay = `${index * 0.075}s`;
      line.appendChild(letter);
    });
  });
}

// Balloons float upward one after another
function releaseBalloons(amount) {
  if (!balloonLayer) return;

  const balloonColors = [
    "#ff668a",
    "#f6d68a",
    "#c9b8ff",
    "#a8e6cf",
    "#ff9fba",
    "#fff0bd"
  ];

  for (let i = 0; i < amount; i++) {
    const balloon = document.createElement("span");

    balloon.className = "balloon";
    balloon.style.setProperty(
      "--balloon-color",
      balloonColors[i % balloonColors.length]
    );
    balloon.style.left = `${5 + Math.random() * 90}%`;
    balloon.style.setProperty(
      "--float-duration",
      `${6 + Math.random() * 4}s`
    );
    balloon.style.animationDelay = `${i * 0.22}s`;

    balloonLayer.appendChild(balloon);

    balloon.addEventListener(
      "animationend",
      () => balloon.remove(),
      { once: true }
    );
  }
}

// Candle interaction
const candles = [...document.querySelectorAll(".candle")];
const cakeInstruction = document.getElementById("cakeInstruction");
const wishButton = document.getElementById("wishButton");

candles.forEach((candle, index) => {
  candle.addEventListener("click", () => {
    if (!candle.classList.contains("lit")) return;

    candle.classList.remove("lit");

    alert(`You blew out candle ${index + 1}! Make a beautiful wish. 🕯️✨`);

    const allOut = candles.every(
      (item) => !item.classList.contains("lit")
    );

    if (allOut) {
      cakeInstruction.textContent =
        "Your wish is on its way to the stars. ✨";

      wishButton.textContent = "Wish sent into the universe 💫";
      burstConfetti(50);
    } else {
      cakeInstruction.textContent =
        "One candle down… keep making wishes! ♡";
    }
  });
});

if (wishButton) {
  wishButton.addEventListener("click", () => {
    candles.forEach((candle) => candle.classList.remove("lit"));

    cakeInstruction.textContent =
      "May your wish find its way to you. Ameen. 🤍";

    wishButton.textContent = "Wish sent into the universe 💫";

    alert("Your birthday wish has been sent! May it come true. ❤️");
    burstConfetti(70);
  });
}

// Open and close the gift card
const openGiftButton = document.getElementById("openGift");
const giftCard = document.getElementById("giftCard");

if (openGiftButton && giftCard) {
  openGiftButton.addEventListener("click", () => {
    const isOpening = giftCard.classList.contains("hidden");

    giftCard.classList.toggle("hidden", !isOpening);
    openGiftButton.setAttribute("aria-expanded", String(isOpening));

    openGiftButton.textContent = isOpening
      ? "💝 Your surprise is open ✦"
      : "🎀 Open your gift card ↗";

    if (isOpening) {
      burstConfetti(60);

      window.setTimeout(() => {
        giftCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 120);
    }
  });
}

// Celebrate again
const celebrateButton = document.getElementById("celebrateButton");

if (celebrateButton) {
  celebrateButton.addEventListener("click", () => {
    burstConfetti(120);
    releaseBalloons(12);
  });
}

// Confetti animation
const confettiLayer = document.getElementById("confettiLayer");

function burstConfetti(amount) {
  if (!confettiLayer) return;

  const colors = [
    "#f2b9d8",
    "#c9b8ff",
    "#fff5f0",
    "#f6d68a",
    "#a8e6cf",
    "#e9a7d0"
  ];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty(
      "--duration",
      `${2.8 + Math.random() * 3.5}s`
    );

    piece.style.setProperty(
      "--drift",
      `${-130 + Math.random() * 260}px`
    );

    piece.style.animationDelay = `${Math.random() * 0.8}s`;

    if (Math.random() > 0.55) {
      piece.style.borderRadius = "50%";
      piece.style.width = "7px";
      piece.style.height = "7px";
    }

    confettiLayer.appendChild(piece);

    piece.addEventListener(
      "animationend",
      () => piece.remove(),
      { once: true }
    );
  }
}
