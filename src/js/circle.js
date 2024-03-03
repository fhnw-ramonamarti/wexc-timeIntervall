const circle = document.querySelector("#circle");

let elem = `<svg width="520" height="520" xmlns="http://www.w3.org/2000/svg">`;
elem += `<circle cx="250" cy="250" r="220" stroke="black" fill="transparent" stroke-width="2" />`;
elem += `<circle cx="250" cy="250" r="220" stroke="gray" fill="transparent" stroke-width="10" stroke-linecap="butt" id="outerCircleM" />`;
elem += `<circle cx="250" cy="250" r="220" stroke="black" fill="transparent" stroke-width="15" stroke-linecap="butt" id="outerCircleH" />`;

elem += `<circle cx="250" cy="250" r="110" stroke="lightgreen" fill="transparent" stroke-width="220" stroke-linecap="butt" id="outerCircle" />`;

elem += `<circle cx="250" cy="250" r="150" stroke="black" fill="white" stroke-width="2" />`;
elem += `<circle cx="250" cy="250" r="150" stroke="gray" fill="transparent" stroke-width="10" stroke-linecap="butt" id="innerCircleM" />`;
elem += `<circle cx="250" cy="250" r="150" stroke="black" fill="transparent" stroke-width="15" stroke-linecap="butt" id="innerCircleH" />`;

elem += `<circle cx="250" cy="250" r="75" stroke="lightgreen" fill="transparent" stroke-width="150" stroke-linecap="butt" id="innerCircle" transform="rotateX(90deg)"; />`;

elem += `</svg>`;
circle.innerHTML = elem;

const innerCircleM = circle.querySelector("circle#innerCircleM");
innerCircleM.setAttribute("stroke-dasharray", `1,${innerCircleM.getTotalLength() / 48 - 1}`);
const outerCircleM = circle.querySelector("circle#outerCircleM");
outerCircleM.setAttribute("stroke-dasharray", `1,${outerCircleM.getTotalLength() / 48 - 1}`);

const innerCircleH = circle.querySelector("circle#innerCircleH");
innerCircleH.setAttribute("stroke-dasharray", `2,${innerCircleH.getTotalLength() / 12 - 2}`);
const outerCircleH = circle.querySelector("circle#outerCircleH");
outerCircleH.setAttribute("stroke-dasharray", `2,${outerCircleH.getTotalLength() / 12 - 2}`);

const innerCircle = circle.querySelector("circle#innerCircle");
const innerTime = 1.75 * innerCircle.getTotalLength() / 12;
const innerStart = 11.25 * innerCircle.getTotalLength() / 12;
innerCircle.setAttribute("stroke-dasharray", `${innerTime},${innerCircle.getTotalLength()}`);
innerCircle.setAttribute("stroke-dashoffset", `-${innerStart}`);

const outerCircle = circle.querySelector("circle#outerCircle");
const outerTime = 0.75 * outerCircle.getTotalLength() / 12;
const outerStart = 0 * outerCircle.getTotalLength() / 12;
outerCircle.setAttribute("stroke-dasharray", `${outerTime},${outerCircle.getTotalLength()}`);
outerCircle.setAttribute("stroke-dashoffset", `-${outerStart}`);

for (let i = 0; i <= 24; i++) {
    circle.innerHTML += `<div class="hour" id="h${i}-s">${i}</div>`;
}
