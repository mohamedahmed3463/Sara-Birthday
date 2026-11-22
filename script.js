const gift = document.getElementById("gift");
const openGiftBtn = document.getElementById("openGiftBtn");
const toast = document.getElementById("toast");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
const candles = [...document.querySelectorAll(".candle")];
const wishMessage = document.getElementById("wishMessage");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function burst(x = innerWidth / 2, y = innerHeight / 2, amount = 24) {
  const symbols = ["♡", "✿", "✦", "🌸", "💗"];
  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "heart-pop";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${x + (Math.random() - .5) * 180}px`;
    item.style.top = `${y + (Math.random() - .5) * 70}px`;
    item.style.color = ["#e88eae", "#bca1d9", "#e9b85e"][i % 3];
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 1600);
  }
}

function openGift() {
  gift.classList.add("open");
  burst(innerWidth / 2, innerHeight * .43, 32);
  showToast("Surprise! This little world is all yours, Sarah ♡");
  document.getElementById("letter").scrollIntoView({ behavior: "smooth" });
}
gift.addEventListener("click", openGift);
gift.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGift(); }
});
openGiftBtn.addEventListener("click", openGift);

document.getElementById("blowBtn").addEventListener("click", () => {
  candles.forEach(candle => candle.classList.add("out"));
  wishMessage.textContent = "Wish made! I hope it comes true, beautiful girl. ♡";
  burst(innerWidth / 2, innerHeight * .67, 30);
  showToast("The candles are out. Your wish is on its way! ✨");
});

document.getElementById("heartBtn").addEventListener("click", () => {
  for (let i = 0; i < 3; i++) setTimeout(() => burst(Math.random() * innerWidth, innerHeight * .75, 18), i * 220);
  showToast("Sending Sarah a thousand hugs and hearts 💗");
});

// Soft falling flower petals.
const petals = ["✿", "❀", "♡", "❁"];
function makePetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = petals[Math.floor(Math.random() * petals.length)];
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.fontSize = `${12 + Math.random() * 17}px`;
  petal.style.setProperty("--drift", `${(Math.random() - .5) * 180}px`);
  const duration = 7 + Math.random() * 7;
  petal.style.animationDuration = `${duration}s`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}
setInterval(makePetal, 850);

// A tiny original melody synthesized in the browser (no external song or audio file).
let audioContext;
let melodyTimer;
let noteIndex = 0;
let isPlaying = false;
const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 587.33, 659.25, 587.33];
function playNote(freq) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.075, audioContext.currentTime + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.42);
  osc.connect(gain); gain.connect(audioContext.destination);
  osc.start(); osc.stop(audioContext.currentTime + 0.45);
}
function stopMusic() {
  clearInterval(melodyTimer);
  isPlaying = false;
  musicBtn.setAttribute("aria-pressed", "false");
  musicLabel.textContent = "Play our melody";
}
musicBtn.addEventListener("click", async () => {
  if (isPlaying) { stopMusic(); return; }
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) { showToast("Your browser does not support the music feature."); return; }
  audioContext = audioContext || new AudioCtx();
  if (audioContext.state === "suspended") await audioContext.resume();
  isPlaying = true;
  musicBtn.setAttribute("aria-pressed", "true");
  musicLabel.textContent = "Pause melody";
  playNote(notes[noteIndex++ % notes.length]);
  melodyTimer = setInterval(() => playNote(notes[noteIndex++ % notes.length]), 480);
});
window.addEventListener("pagehide", stopMusic);
