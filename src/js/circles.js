const circles = document.querySelector("#circles");

let elem = `<svg width="520" height="520" xmlns="http://www.w3.org/2000/svg">`;

for (let i = 23; i > 0; i--) {
    const radius = 10 + 10 * i;
    const radius2 = 5 + 10 * i;
    elem += `<circle cx="250" cy="250" r="${radius2}" stroke="lightgreen" fill="transparent" stroke-width="25" stroke-linecap="butt" id="innerCircle${i}" transform="rotateX(90deg)"; />`;

    elem += `<circle cx="250" cy="250" r="${radius}" stroke="black" fill="white" stroke-width="1" />`;
    elem += `<circle cx="250" cy="250" r="${radius}" stroke="gray" fill="transparent" stroke-width="6" stroke-linecap="butt" id="innerCircleM${i}" />`;
    elem += `<circle cx="250" cy="250" r="${radius}" stroke="black" fill="transparent" stroke-width="10" stroke-linecap="butt" id="innerCircleH${i}" />`;
}
elem += `</svg>`;
circles.innerHTML = elem;

const timeStart = 11.25,
    timeEnd = 12.75;
for (let i = 23; i > 0; i--) {
    const innerCircleM = circles.querySelector("circle#innerCircleM" + i);
    innerCircleM.setAttribute("stroke-dasharray", `1,${innerCircleM.getTotalLength() / 12 - 1}`);
    const innerCircleH = circles.querySelector("circle#innerCircleH" + i);
    innerCircleH.setAttribute("stroke-dasharray", `2,${innerCircleH.getTotalLength() / 4 - 2}`);

    const innerCircle = circles.querySelector("circle#innerCircle" + i);
    if (i < Math.floor(timeStart) || i > Math.ceil(timeEnd)) {
        innerCircle.setAttribute("stroke-width", `0`);
    } else {
        if (Math.floor(timeStart) == i) {
            innerCircle.setAttribute(
                "stroke-dasharray",
                `${innerCircle.getTotalLength()},${(timeStart % 1) * innerCircle.getTotalLength()}`
            );
            innerCircle.setAttribute("stroke-dashoffset", `-${(timeStart % 1) * innerCircle.getTotalLength()}`);
        }
        if (Math.ceil(timeEnd) == i) {
            innerCircle.setAttribute(
                "stroke-dasharray",
                `${(1 - (timeStart % 1)) * innerCircle.getTotalLength()},${(timeStart % 1) * innerCircle.getTotalLength()}`
            );
        }
    }
}

circles.innerHTML += `<div class="middle">0</div>`
circles.innerHTML += `<div class="top">24</div>`

// for (let i = 0; i <= 24; i++) {
//     circles.innerHTML += `<div class="hour" id="h${i}-s">${i}</div>`;
// }
