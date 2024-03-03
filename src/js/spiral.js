const spiral = document.querySelector("#spiral");

let elem = `<svg width="520" height="520" xmlns="http://www.w3.org/2000/svg">`;

elem += `<path d="
        m245 260
        c-5    -10      5    -25      15    -25 
        25     -5     35     10      40     30 
         5     25    -20     50     -45     55 
       -35      5    -65    -25     -65    -60 
        -5    -40     30    -75      75    -80 
        50     -5     90     40      90     90 
         0     55    -46    105    -100    105 
       -65      0   -115    -55    -120   -115 
         0    -70     60   -130     130   -130 
        80      0    145     65     145    145 
         0     85    -75    160    -160    160 
       -95      0   -170    -80    -170   -175 
         0   -100     90   -185     190   -185 
       110      0    200     95     195    205 
         0    160   -150    205    -200    210 
       -20      5   -220     10    -250   -210 
         0      0    -20   -240     250   -260  
    " stroke="green" fill="transparent" stroke-width="30" stroke-linecap="miter" 
    stroke-dasharray="50,50" stroke-dashoffset="0" id="timeBar" />`;

elem += `<path d="
        m245 260
        c-5    -10      5    -25      15    -25 
         25     -5     35     10      40     30 
          5     25    -20     50     -45     55 
        -35      5    -65    -25     -65    -60 
         -5    -40     30    -75      75    -80 
         50     -5     90     40      90     90 
          0     55    -46    105    -100    105 
        -65      0   -115    -55    -120   -115 
          0    -70     60   -130     130   -130 
         80      0    145     65     145    145 
          0     85    -75    160    -160    160 
        -95      0   -170    -80    -170   -175 
          0   -100     90   -185     190   -185 
        110      0    200     95     195    205 
          0    160   -150    205    -200    210 
        -20      5   -220     10    -250   -210 
          0      0    -20   -240     250   -260 
    " stroke="black" fill="transparent" stroke-width="2" stroke-linecap="butt" />`;

elem += `</svg>`;
spiral.innerHTML = elem;

const path = spiral.querySelector("path#timeBar");
const time = (90 * path.getTotalLength()) / 60 / 24;
const start = ((60 * 11 + 15) * path.getTotalLength()) / 60 / 24;
path.setAttribute("stroke-dashoffset", `-${start}`);
path.setAttribute("stroke-dasharray", `${time},${path.getTotalLength()}`);

for (let i = 0; i <= 24; i++) {
    spiral.innerHTML += `<div class="hour" id="h${i}">${i}</div>`;
}
