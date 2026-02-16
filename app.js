/*
   DOSHA ENGINE — UI + REAL OSCILLATION + CHAOTIC MOVEMENT
*/

const canvas = document.getElementById("doshaCanvas");
const ctx = canvas.getContext("2d");

// BASE PRAKRITI (YOU ASKED ME TO CHOOSE)
let vata = 40;
let pitta = 35;
let kapha = 25;

// CHAOTIC OSCILLATION FUNCTION
function chaos(value) {
    let randomShock = (Math.random() - 0.5) * 2;  // chaotic push
    value += randomShock;

    // keep within range
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    return value;
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
    // Apply chaos
    vata = chaos(vata);
    pitta = chaos(pitta);
    kapha = chaos(kapha);

    // Draw rings
    drawRings();

    requestAnimationFrame(animate);
}

animate();
