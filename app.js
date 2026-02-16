/*  
   DOSHA ENGINE — UI + REAL OSCILLATION + CHAOTIC MOVEMENT  
*/

/* -------------------------------
   CANVAS + BASE PRAKRITI
--------------------------------*/
const canvas = document.getElementById("doshaCanvas");
const ctx = canvas.getContext("2d");

let vata = 40;
let pitta = 35;
let kapha = 25;

let t = 0;

// CHAOTIC SEED VALUES
let flowSeed1 = Math.random() * 1000;
let flowSeed2 = Math.random() * 2000;
let flowSeed3 = Math.random() * 3000;

/* -------------------------------
   CHAOS + OSCILLATION FUNCTIONS
--------------------------------*/
function chaos(value) {
    let shock = (Math.random() - 0.5) * 2;
    value += shock;
    return Math.max(0, Math.min(100, value));
}

function oscillate(value, freq = 10, amp = 1.5) {
    let sine = Math.sin((t / 60) * freq) * amp;
    return value + sine;
}

function flowfield(value, seed) {
    let n = Math.sin(seed + t * 0.02) * 2;
    let m = Math.cos(seed + t * 0.015) * 1.5;
    return value + n + m;
}

function coupleDoshas() {
    pitta += (vata - 50) * 0.005;
    kapha -= (pitta - 50) * 0.004;
    vata -= (kapha - 50) * 0.006;
}

/* -------------------------------
   AYURVEDA FACTOR ENGINE
--------------------------------*/
function applyAyurvedaFactors() {

    let sleep = val("sleep");
    let hydration = val("hydration");
    let stress = val("stress");
    let agni = val("agni");
    let temp = val("temp");
    let food = val("food");
    let routine = val("routine");
    let season = val("season");
    let ama = val("ama");
    let activity = val("activity");

    // VATA  
    vata +=
        (100 - sleep) * 0.02 +
        (100 - hydration) * 0.015 +
        stress * 0.03 +
        (100 - routine) * 0.02 +
        (season > 70 ? 0.5 : 0);

    // PITTA  
    pitta +=
        temp * 0.02 +
        food * 0.015 +
        stress * 0.01 +
        ama * 0.01 +
        agni * 0.02;

    // KAPHA  
    kapha +=
        (100 - activity) * 0.02 +
        food * 0.01 +
        hydration * 0.02 +
        (temp < 40 ? 0.03 : 0) +
        ama * 0.02;

    clamp();
}

function val(id) {
    return parseFloat(document.getElementById(id).value) || 0;
}

function clamp() {
    vata = Math.max(0, Math.min(100, vata));
    pitta = Math.max(0, Math.min(100, pitta));
    kapha = Math.max(0, Math.min(100, kapha));
}

/* -------------------------------
   DRAWING ENGINE (RINGS)
--------------------------------*/
function drawRings() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    let baseRadius = 120;

    drawRing(cx, cy, baseRadius + vata * 0.4, "rgba(173,216,230,0.8)");
    drawRing(cx, cy, baseRadius + pitta * 0.4, "rgba(255,140,0,0.8)");
    drawRing(cx, cy, baseRadius + kapha * 0.4, "rgba(144,238,144,0.8)");

    updateText();
}

function drawRing(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
}

function updateText() {
    document.querySelector(".vata-value").innerText = `Vata: ${vata.toFixed(1)}`;
    document.querySelector(".pitta-value").innerText = `Pitta: ${pitta.toFixed(1)}`;
    document.querySelector(".kapha-value").innerText = `Kapha: ${kapha.toFixed(1)}`;
}

/* -------------------------------
   MAIN REAL-TIME ENGINE
--------------------------------*/
function animate() {

    applyAyurvedaFactors();
    coupleDoshas();

    vata = oscillate(vata);
    pitta = oscillate(pitta, 9);
    kapha = oscillate(kapha, 7);

    vata = flowfield(vata, flowSeed1);
    pitta = flowfield(pitta, flowSeed2);
    kapha = flowfield(kapha, flowSeed3);

    vata = chaos(vata);
    pitta = chaos(pitta);
    kapha = chaos(kapha);

    clamp();

    drawRings();

    t += 1;

    requestAnimationFrame(animate);
}

// START ENGINE
animate();
