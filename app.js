/*
   DOSHA ENGINE — UI + REAL OSCILLATION + CHAOTIC MOVEMENT
*/

const canvas = document.getElementById("doshaCanvas");
const ctx = canvas.getContext("2d");

// BASE PRAKRITI (YOU ASKED ME TO CHOOSE)
let vata = 40;
let pitta = 35;
let kapha = 25;

// TIME ENGINE VARIABLES
let t = 0;

// Flowfield noise seeds
let flowSeed1 = Math.random() * 1000;
let flowSeed2 = Math.random() * 2000;
let flowSeed3 = Math.random() * 3000;

// CHAOTIC OSCILLATION FUNCTION
function chaos(value) {
    let randomShock = (Math.random() - 0.5) * 2;  // chaotic push
    value += randomShock;

    // keep within range
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    return value;
}

function oscillate(value, freq = 10, amp = 1.5) {
    let sine = Math.sin((t / 60) * freq) * amp;
    return value + sine;
}
function flowfield(value, seed) {
    let n = Math.sin(seed + t * 0.02) * 2;   // organic micro-movement
    let m = Math.cos(seed + t * 0.015) * 1.5;
    return value + n + m;
}
function coupleDoshas() {
    // Vata pushes Pitta
    pitta += (vata - 50) * 0.005;

    // Pitta heats Kapha
    kapha -= (pitta - 50) * 0.004;

    // Kapha stabilizes Vata
    vata -= (kapha - 50) * 0.006;
}

// FACTOR-BASED AYURVEDIC LOGIC
function applyAyurvedaFactors() {

    let sleep = document.getElementById("sleep").value;
    let hydration = document.getElementById("hydration").value;
    let stress = document.getElementById("stress").value;
    let agni = document.getElementById("agni").value;
    let temp = document.getElementById("temp").value;
    let food = document.getElementById("food").value;
    let routine = document.getElementById("routine").value;
    let season = document.getElementById("season").value;
    let ama = document.getElementById("ama").value;
    let activity = document.getElementById("activity").value;

    // VATA RULES
    vata +=
        (100 - sleep) * 0.02 +
        (100 - hydration) * 0.015 +
        stress * 0.03 +
        (100 - routine) * 0.02 +
        (season > 70 ? 0.5 : 0);

    // PITTA RULES
    pitta +=
        temp * 0.02 +
        food * 0.015 +
        stress * 0.01 +
        ama * 0.01 +
        agni * 0.02;

    // KAPHA RULES
    kapha +=
        (100 - activity) * 0.02 +
        food * 0.01 +
        hydration * 0.02 +
        temp < 40 ? 0.03 : 0 +
        ama * 0.02;

    // Clamp values
    vata = Math.max(0, Math.min(100, vata));
    pitta = Math.max(0, Math.min(100, pitta));
    kapha = Math.max(0, Math.min(100, kapha));
}

// DRAW MULTI-RING OSCILLATION VISUAL
function drawRings() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Base radius
    let baseRadius = 120;

    // Ring colors
    const colors = {
        vata: "rgba(173, 216, 230, 0.8)",
        pitta: "rgba(255, 140, 0, 0.8)",
        kapha: "rgba(144, 238, 144, 0.8)"
    };

    // 1. VATA ring
    drawRing(centerX, centerY, baseRadius + vata * 0.4, colors.vata);

    // 2. PITTA ring
    drawRing(centerX, centerY, baseRadius + pitta * 0.4, colors.pitta);

    // 3. KAPHA ring
    drawRing(centerX, centerY, baseRadius + kapha * 0.4, colors.kapha);

    updateText();
}

// Draw Ring Helper
function drawRing(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
}

// UPDATE TEXT BELOW RINGS
function updateText() {
    document.querySelector(".vata-value").innerText = `Vata: ${vata.toFixed(1)}`;
    document.querySelector(".pitta-value").innerText = `Pitta: ${pitta.toFixed(1)}`;
    document.querySelector(".kapha-value").innerText = `Kapha: ${kapha.toFixed(1)}`;
}

// MAIN LOOP (REAL-TIME CHAOS ENGINE)
function animate() {

    // Apply Ayurveda Factors
    applyAyurvedaFactors();

    // Apply coupling
    coupleDoshas();

    // Add wave oscillation
    vata = oscillate(vata);
    pitta = oscillate(pitta, 9);
    kapha = oscillate(kapha, 7);

    // Add flowfield chaos
    vata = flowfield(vata, flowSeed1);
    pitta = flowfield(pitta, flowSeed2);
    kapha = flowfield(kapha, flowSeed3);

    // Add chaotic noise
    vata = chaos(vata);
    pitta = chaos(pitta);
    kapha = chaos(kapha);

    // Clamp boundaries
    vata = Math.max(0, Math.min(100, vata));
    pitta = Math.max(0, Math.min(100, pitta));
    kapha = Math.max(0, Math.min(100, kapha));

    // Draw rings
    drawRings();

    // Increase time
    t += 1;

    requestAnimationFrame(animate);
}
