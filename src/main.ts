import './style.css';

const error = (message: string) => {
  throw new Error(message);
}

const canvas = document.querySelector('canvas') ?? error('No canvas found');
const context = canvas.getContext('2d') ?? error('No context found');

let mouse = { x: 0, y: 0 };
let redraw = false;

const color = (alpha: number) => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDarkMode ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
}

function draw() {
  if (!redraw) {
    requestAnimationFrame(draw);
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  // grid
  context.strokeStyle = color(0.1);
  context.lineWidth = 1;

  const gridSize = 50;

  for (let x = 0; x < canvas.width; x += gridSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  // mouse circle
  context.strokeStyle = color(0.5);
  context.lineWidth = 2;
  context.beginPath();
  context.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
  context.stroke();

  // coordinate text
  context.fillStyle = color(0.5);
  context.font = '12px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  
  const text = `${mouse.x}, ${mouse.y}`;

  const width = context.measureText(text).width;
  const height = 12;

  // move the text down if it's close to the top
  const textX = Math.min(Math.max(mouse.x, width), canvas.width - width);
  const textY = mouse.y < height * 4 ? mouse.y + 30 : mouse.y - 30;

  context.fillText(text, textX, textY);
  
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  redraw = true;
});

window.addEventListener('mousemove', (event) => {
  mouse = { x: event.clientX, y: event.clientY };
  redraw = true;
});