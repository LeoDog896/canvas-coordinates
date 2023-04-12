import './style.css';

const error = (message: string) => {
  throw new Error(message);
}

const canvas = document.querySelector('canvas') ?? error('No canvas found');
const context = canvas.getContext('2d') ?? error('No context found');

let mousePosition = { x: 0, y: 0 };

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
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

  context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  context.lineWidth = 2;
  context.beginPath();
  context.arc(mousePosition.x, mousePosition.y, 20, 0, Math.PI * 2);
  context.stroke();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (event) => {
  mousePosition = { x: event.clientX, y: event.clientY };
});