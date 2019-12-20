const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("control__color");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsFill");
const del = document.getElementById("jsDelete");
const INITIAL_COLOR = "black";
const save = document.getElementById("jsSave");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 2.5;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let paint = false;
let drag = false;
let filling = true;

function stopDrag() {
  drag = false;
}
function useDrag() {
  drag = true;
}

function stopPaint() {
  paint = false;
}
function usePaint() {
  paint = true;
}

function handleMouseUp(event) {
  stopPaint();
  stopDrag();
}
function handleMouseDown(event) {
  if (filling === false) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    usePaint();
  }
}
function handleMouseLeave(event) {
  if (paint === true) {
    useDrag();
  }
}
function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!paint && !drag) {
    ctx.beginPath();
  } else if (paint && !drag) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (paint && drag) {
    ctx.beginPath();
    stopDrag();
  }
}
function windowUp(event) {
  stopDrag();
  stopPaint();
}
function handleChangeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleRangeChange(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}
function handleFill(event) {
  if (filling === true) {
    event.target.innerText = "Paint";
    filling = false;
  } else {
    event.target.innerText = "Fill";
    filling = true;
  }
}
function handleCM(event) {
  event.preventDefault();
}
function init() {
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseleave", handleMouseLeave);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("contextmenu", handleCM);

  window.addEventListener("mouseup", windowUp);
  Array.from(colors).forEach(color => {
    color.addEventListener("click", handleChangeColor);
  });
  range.addEventListener("input", handleRangeChange);
  fill.addEventListener("click", handleFill);
  del.addEventListener("click", event => {
    const tempColor = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = tempColor;
  });
  save.addEventListener("click", event => {
    const image = canvas.toDataURL();
    const imgLink = document.createElement("a");
    imgLink.href = image;
    imgLink.download = "HELLO";
    imgLink.click();
  });
}
init();
