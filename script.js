// ==================================
// ELEMENTS
// ==================================

const gift = document.getElementById("gift");
const openGiftBtn = document.getElementById("openGiftBtn");
const toast = document.getElementById("toast");

const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

const candles = [...document.querySelectorAll(".candle")];
const wishMessage = document.getElementById("wishMessage");


// ==================================
// TOAST MESSAGE
// ==================================

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);

}


// ==================================
// HEARTS ANIMATION
// ==================================

function burst(x = innerWidth / 2, y = innerHeight / 2, amount = 24) {

    const symbols = ["♡", "✿", "✦", "🌸", "💗"];

    for (let i = 0; i < amount; i++) {

        const item = document.createElement("span");

        item.className = "heart-pop";

        item.textContent = symbols[
            Math.floor(Math.random() * symbols.length)
        ];

        item.style.left = `${x + (Math.random() - .5) * 180}px`;
        item.style.top = `${y + (Math.random() - .5) * 70}px`;

        item.style.color = ["#e88eae", "#bca1d9", "#e9b85e"][i % 3];

        document.body.appendChild(item);

        setTimeout(() => item.remove(), 1600);

    }

}


// ==================================
// OPEN GIFT
// ==================================

function openGift() {

    gift.classList.add("open");

    burst(innerWidth / 2, innerHeight * .43, 32);

    showToast("Surprise! This little world is all yours, Sara ♡");

    document.getElementById("letter").scrollIntoView({
        behavior: "smooth"
    });

}

gift.addEventListener("click", openGift);

gift.addEventListener("keydown", e => {

    if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        openGift();

    }

});

openGiftBtn.addEventListener("click", openGift);


// ==================================
// BIRTHDAY CANDLES
// ==================================

document.getElementById("blowBtn").addEventListener("click", () => {

    candles.forEach(candle => {
        candle.classList.add("out");
    });

    wishMessage.textContent =
        "Wish made! I hope it comes true, beautiful girl. ♡";

    burst(innerWidth / 2, innerHeight * .67, 30);

    showToast("The candles are out. Your wish is on its way! ✨");

});


// ==================================
// HEART BUTTON
// ==================================

document.getElementById("heartBtn").addEventListener("click", () => {

    for (let i = 0; i < 3; i++) {

        setTimeout(() => {

            burst(
                Math.random() * innerWidth,
                innerHeight * .75,
                18
            );

        }, i * 220);

    }

    showToast("Sending Sara a thousand hugs and hearts 💗");

});


// ==================================
// FALLING FLOWER PETALS
// ==================================

const petals = ["✿", "❀", "♡", "❁"];

function makePetal() {

    const petal = document.createElement("span");

    petal.className = "petal";

    petal.textContent = petals[
        Math.floor(Math.random() * petals.length)
    ];

    petal.style.left = `${Math.random() * 100}vw`;

    petal.style.fontSize = `${12 + Math.random() * 17}px`;

    petal.style.setProperty(
        "--drift",
        `${(Math.random() - .5) * 180}px`
    );

    const duration = 7 + Math.random() * 7;

    petal.style.animationDuration = `${duration}s`;

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), duration * 1000);

}

setInterval(makePetal, 850);


// ==================================
// BACKGROUND MUSIC
// ==================================

const bgMusic = document.getElementById("bgMusic");

bgMusic.loop = true;

musicBtn.addEventListener("click", async () => {

    try {

        if (bgMusic.paused) {

            await bgMusic.play();

            musicLabel.textContent = "Pause melody";

            musicBtn.setAttribute("aria-pressed", "true");

        } else {

            bgMusic.pause();

            musicLabel.textContent = "Play our melody";

            musicBtn.setAttribute("aria-pressed", "false");

        }

    } catch (error) {

        showToast("Unable to play music. Check your MP3 file.");

    }

});

window.addEventListener("pagehide", () => {
    bgMusic.pause();
});


// ==================================
// SKY OF LOVE - ELEMENTS
// ==================================

const skyBtn = document.getElementById("skyBtn");
const skySurprise = document.getElementById("skySurprise");
const closeSky = document.getElementById("closeSky");

const fireworksContainer = document.getElementById("fireworksContainer");

const countdown = document.getElementById("countdown");
const countNumber = document.getElementById("countNumber");

const birthdayMessage = document.querySelector(".birthday-message");

const videoChoices = document.getElementById("videoChoices");
const birthdayVideo = document.getElementById("birthdayVideo");

const saraVideo = document.getElementById("saraVideo");

const videoOneBtn = document.getElementById("videoOneBtn");
const videoTwoBtn = document.getElementById("videoTwoBtn");
const backVideo = document.getElementById("backVideo");


// ==================================
// VARIABLES
// ==================================

let fireworksInterval = null;
let countdownInterval = null;
let isSurpriseRunning = false;


// ==================================
// CREATE FIREWORKS
// ==================================

function createFirework() {

    const burstElement = document.createElement("div");

    burstElement.className = "firework-burst";

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.7;

    burstElement.style.left = x + "px";
    burstElement.style.top = y + "px";

    const colors = [
        "#ff4f91",
        "#ffd700",
        "#ffffff",
        "#d78bff",
        "#ff9f43"
    ];

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("span");

        particle.className = "firework-particle";

        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;

        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        particle.style.setProperty("--x", dx + "px");
        particle.style.setProperty("--y", dy + "px");

        particle.style.background = color;
        particle.style.color = color;

        burstElement.appendChild(particle);

    }

    fireworksContainer.appendChild(burstElement);

    setTimeout(() => {
        burstElement.remove();
    }, 1600);

}


// ==================================
// START FIREWORKS
// ==================================

function startFireworks() {

    clearInterval(fireworksInterval);

    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            if (skySurprise.classList.contains("active")) {
                createFirework();
            }

        }, i * 250);

    }

    fireworksInterval = setInterval(() => {

        if (skySurprise.classList.contains("active")) {
            createFirework();
        }

    }, 700);

}


// ==================================
// OPEN SURPRISE & COUNTDOWN
// ==================================

skyBtn.addEventListener("click", function () {

    if (isSurpriseRunning || skySurprise.classList.contains("active")) {
        return;
    }

    isSurpriseRunning = true;

    clearInterval(countdownInterval);
    clearInterval(fireworksInterval);

    fireworksContainer.innerHTML = "";

    birthdayMessage.style.display = "none";
    videoChoices.classList.remove("show");
    birthdayVideo.classList.remove("show");

    countdown.classList.add("show");

    skySurprise.classList.add("active");

    let number = 3;

    countNumber.textContent = number;

    countdownInterval = setInterval(() => {

        number--;

        if (number > 0) {

            countNumber.textContent = number;

        } else {

            clearInterval(countdownInterval);

            countdown.classList.remove("show");

            // Show the two video choices
            videoChoices.classList.add("show");

            // Start fireworks
            startFireworks();

            isSurpriseRunning = false;

        }

    }, 1000);

});


// ==================================
// PLAY SELECTED VIDEO
// ==================================

function playBirthdayVideo(videoNumber) {

    const videos = {
        1: "video1.mp4",
        2: "video2.mp4"
    };

    saraVideo.pause();

    saraVideo.src = videos[videoNumber];

    videoChoices.classList.remove("show");

    birthdayVideo.classList.add("show");

    saraVideo.load();

    saraVideo.play().catch(() => {

        showToast("Tap play to watch your surprise ❤️");

    });

}


// Video One

videoOneBtn.addEventListener("click", () => {
    playBirthdayVideo(1);
});


// Video Two

videoTwoBtn.addEventListener("click", () => {
    playBirthdayVideo(2);
});


// ==================================
// BACK TO VIDEO CHOICES
// ==================================

backVideo.addEventListener("click", () => {

    saraVideo.pause();

    saraVideo.removeAttribute("src");

    saraVideo.load();

    birthdayVideo.classList.remove("show");

    videoChoices.classList.add("show");

});


// ==================================
// CLOSE SURPRISE
// ==================================

closeSky.addEventListener("click", () => {

    clearInterval(countdownInterval);
    clearInterval(fireworksInterval);

    skySurprise.classList.remove("active");

    countdown.classList.remove("show");

    birthdayMessage.style.display = "block";

    videoChoices.classList.remove("show");

    birthdayVideo.classList.remove("show");

    saraVideo.pause();

    saraVideo.removeAttribute("src");

    saraVideo.load();

    fireworksContainer.innerHTML = "";

    isSurpriseRunning = false;

});