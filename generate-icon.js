const { createCanvas } = require('canvas');
const fs = require('fs');

// Create a 256x256 icon
const size = 256;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Create a gradient background
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, '#FF6B6B');    // Red
gradient.addColorStop(0.25, '#4ECDC4'); // Teal
gradient.addColorStop(0.5, '#45B7D1');  // Blue
gradient.addColorStop(0.75, '#FFA07A'); // Orange
gradient.addColorStop(1, '#98D8C8');    // Light green

// Fill with gradient
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, size, size);

// Draw a white circle in the center
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
ctx.fill();

// Draw an eyedropper icon
ctx.strokeStyle = '#333';
ctx.lineWidth = 8;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Dropper tube
ctx.beginPath();
ctx.moveTo(size * 0.4, size * 0.6);
ctx.lineTo(size * 0.6, size * 0.4);
ctx.stroke();

// Dropper bulb
ctx.beginPath();
ctx.arc(size * 0.65, size * 0.35, size * 0.1, 0, Math.PI * 2);
ctx.fillStyle = '#333';
ctx.fill();

// Dropper tip
ctx.beginPath();
ctx.moveTo(size * 0.4, size * 0.6);
ctx.lineTo(size * 0.3, size * 0.7);
ctx.stroke();

// Color drop
ctx.beginPath();
ctx.arc(size * 0.28, size * 0.75, size * 0.05, 0, Math.PI * 2);
ctx.fillStyle = '#4ECDC4';
ctx.fill();

// Save the icon
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('icon.png', buffer);

console.log('Icon generated successfully!');
