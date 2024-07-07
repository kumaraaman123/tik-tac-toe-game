"use strict";

const turnBtn = document.getElementById("turnBtn");
const resetBtn = document.getElementById("resetBtn");
const boxEl = document.querySelectorAll(".box");
const listValue = document.getElementById("listValue");
const x = document.getElementById("xScore");
const o = document.getElementById("oScore");
const draw = document.getElementById("drawScore");

let toggle = true;
let isPlayer = true;
let xScore = 0;
let oScore = 0;
let drawScore = 0;
let btnTurn = "X";

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

const init = () => {
  x.innerText = xScore;
  o.innerText = oScore;
  draw.innerText = drawScore;
  turnBtn.innerText = `${btnTurn} : Your Turn`;
};

for (const ele of boxEl) {
  ele.addEventListener("click", (e) => {
    let selectedEl = e.target;
    if (isPlayer) {
      if (toggle) {
        selectedEl.classList.add("xLogo");
        selectedEl.innerHTML = "x";
        btnTurn = "O";
        const id = e.target.id;
        options[id] = "X";
        checkResult();
        toggle = false;
      } else {
        selectedEl.classList.add("oLogo");
        selectedEl.innerHTML = "O";
        btnTurn = "X";
        const id = e.target.id;
        options[id] = "O";
        checkResult();
        toggle = true;
      }
    } else {
      addShack(selectedEl);
    }
    init();
  });
}

const checkResult = () => {
  if (isPlayer) {
    win.forEach((index) => {
      const box = index;
      const box1 = options[box[0]];
      const box2 = options[box[1]];
      const box3 = options[box[2]];

      if (box1 === "X" && box2 === "X" && box3 === "X") {
        console.log("X work");
        xScore++;
        isPlayer = false;
        resultMsg(box[0], box[1], box[2]);
      } else if (box1 === "O" && box2 === "O" && box3 === "O") {
        console.log("O work");
        oScore++;
        isPlayer = false;
        resultMsg(box[0], box[1], box[2]);
      } else if (!options.includes("") && isPlayer) {
        console.log("Draw work");
        drawScore++;
        isPlayer = false;
      }
    });
  }
};

resetBtn.addEventListener("click", () => {
  boxEl.forEach((box) => {
    box.innerText = "";
    box.classList.remove("logoHover");
    box.classList.remove("oLogo");
    box.classList.remove("xLogo");
    box.classList.remove("message");
  });

  options = ["", "", "", "", "", "", "", "", ""];
  isPlayer = true;
  toggle = true;
  btnTurn = "X";
  init();
});

const addShack = (selectedEl) => {
  selectedEl.classList.add("logoHover");
  isPlayer = false;
};

const resultMsg = (box1, box2, box3) => {
  console.log("its work");
  const one = document.getElementById(`${box1}`);
  const two = document.getElementById(`${box2}`);
  const three = document.getElementById(`${box3}`);
  one.classList.add("message");
  two.classList.add("message");
  three.classList.add("message");
};

init();