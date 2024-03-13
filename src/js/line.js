const line = document.querySelector("#line");

const length = 480;
const time = (90 * length) / 24 / 60;
const dist = Math.sqrt(Math.pow(time/2, 2)/2);
const start = ((60 * 11 + 15) * length) / 60 / 24;
const end = ((60 * 11 + 15) * length) / 60 / 24+2;

const pathLine = `m 10 110 l ${start} 0 l ${dist} ${-dist} l ${dist} ${dist} l ${end} 0`;

let elem = `<svg width="${length + 20}" height="120" xmlns="http://www.w3.org/2000/svg" id="timeLine">`;
elem += `<path d="m ${start+10} 110 l ${dist} ${-dist} l ${dist} ${dist} " stroke="transparent" fill="lightgreen" id="timeFill" />`;
elem += `<path d="${pathLine}" stroke="gray" fill="transparent" stroke-width="4" id="timeTickLM"  
stroke-dasharray="1,${length/24/4-1}" />`;
elem += `<path d="${pathLine}" stroke="black" fill="transparent" stroke-width="7" id="timeTickLH"  
stroke-dasharray="1,${length/24-1}" />`;
elem += `<path d="${pathLine}" stroke="black" fill="transparent" stroke-width="2" id="timePath" />`;
elem += `</svg>`;

line.innerHTML += elem;

for (let i = 0; i <= Math.floor(start*24/length); i++) {
    line.innerHTML += `<div class="hour" id="hl${i}" style="left:${i*480/24+15}px;top:${120}px;">${i}</div>`;
}
for (let i = Math.ceil((start+ time)*24/length ); i <= 24; i++) {
    line.innerHTML += `<div class="hour" id="hl${i}" style="left:${(i-time*24/length)*480/24+10+2*dist}px;top:${120}px;">${i}</div>`;
}