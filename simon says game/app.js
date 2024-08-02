let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"]; // Ensure colors match HTML and CSS

let started = false;
let level = 0;
let h2 = document.querySelector("h2"); // Correct typo

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash"); // Correct class name
    setTimeout(function () {
        btn.classList.remove("userFlash"); // Correct class name
    }, 250);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 4); // Corrected random calculation
    let randomColor = btns[randomIndex];
    let randombtn = document.querySelector(`#${randomColor}`); // Corrected typo
    gameseq.push(randomColor);
    btnFlash(randombtn); // Corrected function call
}

function checkAns(idx) { // Added idx parameter
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score Was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"; // Corrected typo
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white"; // Corrected typo
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1); // Corrected function call
}

let allbtns = document.querySelectorAll(".btn"); // Corrected typo
for (let btn of allbtns) { // Added let to declare btn
    btn.addEventListener("click", btnPress); // Corrected typo
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}



