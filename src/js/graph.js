const graph = document.querySelector("#graph");

const hourX = (700 - 20) / 24;
const hourY = (500 - 20) / 24;
const timeStartX = hourX * 11.25 + 20;
const timeEndX = hourX * 13.75 + 20;
const timeY = hourY * 1.5 + 20;

let elem = `<svg width="720" height="520" xmlns="http://www.w3.org/2000/svg">`;
elem += `<line x1="20" y1="20" x2="701" y2="20" stroke="black" />`;
elem += `<line x1="20" y1="20" x2="20" y2="501" stroke="black" />`;
elem += `<line x1="20" y1="20" x2="701" y2="20" stroke="black" stroke-width="5" stroke-dasharray="1,${hourX - 1}" />`;
elem += `<line x1="20" y1="20" x2="20" y2="501" stroke="black" stroke-width="5" stroke-dasharray="1,${hourY - 1}" />`;
elem += `<g id="timeMarker">`;
elem += `<line x1="${timeStartX}" y1="${timeY}" x2="${timeEndX}" y2="${timeY}" stroke="green" />`;
elem += `<line x1="${timeStartX}" y1="${timeY - 3}" x2="${timeStartX}" y2="${
    timeY + 5
}" stroke="green" id="startTick" />`;
elem += `<circle cx="${timeStartX}" cy="${timeY + 8}" r="5" fill="green" id="startTickC" />`;
elem += `<line x1="${timeEndX}" y1="${timeY - 3}" x2="${timeEndX}" y2="${timeY + 5}" stroke="green" id="endTick" />`;
elem += `<circle cx="${timeEndX}" cy="${timeY + 8}" r="5" fill="green" id="endTickC" />`;
elem += `</g>`;
elem += `</svg>`;
graph.innerHTML = elem;

for (let i = 0; i <= 24; i++) {
    graph.innerHTML += `<div class="hour" id="h${i}-g1">${i}</div>`;
}
graph.innerHTML += `<div class="hour" id="h-g1">Dauer (h)</div>`;

for (let i = 1; i <= 24; i++) {
    graph.innerHTML += `<div class="hour" id="h${i}-g2">${i}</div>`;
}
graph.innerHTML += `<div class="hour" id="h-g2">Zeit</div>`;
