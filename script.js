// เปลี่ยนคำถามและคำตอบได้ตรงนี้
const questions = [

    {
        question: "ถ้าเรามีวันว่างด้วยกัน อยากทำอะไรมากที่สุด?",
        answers: [
            "ดูหนังด้วยกัน 🎬",
            "ไปเที่ยวด้วยกัน 🌷",
            "นอนคุยกันทั้งวัน 💗"
        ],
        correct: 2
    },

    {
        question: "สิ่งสำคัญที่สุดในความสัมพันธ์คืออะไร?",
        answers: [
            "ความเข้าใจ ❤️",
            "ของขวัญ 🎁",
            "การเอาชนะกัน"
        ],
        correct: 0
    },

    {
        question: "วันนี้ใครเป็นคนสำคัญที่สุด?",
        answers: [
            "คนข้างบ้าน",
            "เธอไง 💕",
            "แมว"
        ],
        correct: 1
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;


// เปลี่ยนหน้า
function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

}


// เริ่มเกม
function startGame() {

    currentQuestion = 0;
    score = 0;

    showPage("page2");

    loadQuestion();

}


// โหลดคำถาม
function loadQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("progressBar").style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    document.getElementById("score").textContent = score;

    document.getElementById("feedback").textContent = "";

    const answers = document.getElementById("answers");

    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.className = "answer-btn";

        button.onclick = () => checkAnswer(index);

        answers.appendChild(button);

    });

}


// ตรวจคำตอบ
function checkAnswer(index) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => button.disabled = true);

    if (index === q.correct) {

        score++;

        document.getElementById("feedback").textContent =
            "เก่งมาก! ตอบถูกแล้ว ❤️";

    } else {

        document.getElementById("feedback").textContent =
            "ไม่เป็นไรนะ ลองข้อต่อไปกัน 💗";

    }

    document.getElementById("score").textContent = score;

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            document.getElementById("progressBar").style.width = "100%";

            showPage("page3");

        }

    }, 1300);

}


// ไปหน้าของขวัญ
function goGift() {

    showPage("page4");

}


// เปิดกล่องของขวัญ
function openGift() {

    const gift = document.getElementById("gift");

    if (gift.dataset.opened === "true") return;

    gift.dataset.opened = "true";

    gift.innerHTML = "💝";

    document.getElementById("giftText").textContent =
        "Surprise! มีข้อความพิเศษรอเธออยู่ ❤️";

    setTimeout(() => {

        showPage("page5");

        celebrate();

    }, 1500);

}


// เอฟเฟกต์หัวใจ
function celebrate() {

    for (let i = 0; i < 40; i++) {

        setTimeout(createHeart, i * 100);

    }

}


// สร้างหัวใจลอย
function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent = ["❤️", "💕", "💗", "✨"][Math.floor(Math.random() * 4)];

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (15 + Math.random() * 25) + "px";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 7000);

}


// หัวใจพื้นหลัง
setInterval(createHeart, 800);


// เล่นใหม่
function restartGame() {

    document.getElementById("gift").dataset.opened = "false";

    document.getElementById("gift").innerHTML = "🎁";

    document.getElementById("giftText").textContent =
        "Tap to open your gift!";

    startGame();

}
