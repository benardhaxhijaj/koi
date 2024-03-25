let particles = [];
let numParticles = 550;
let noiseScale = 0.002;
let noiseStrength = 45;

// Define color palettes
let palettes = [
  ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF", "#FF7D00"], // Palette 1 with orange
  ["#FFA700", "#FF6A00", "#FFA07A", "#FF6347", "#FF4500", "#F08080"], // Palette 2 with orange
  ["#FF8C00", "#FFA500", "#FFD700", "#DAA520", "#FFB6C1", "#FF1493"], // Palette 3 with orange
  ["#FFD700", "#FFA500", "#FF8C00", "#FF4500", "#FF7F50", "#F4A460"], // Palette 4 with orange
  ["#FF8C00", "#FFA500", "#FFD700", "#FF6347", "#FF4500", "#20B2AA"], // Palette 5 with orange
];

let currentPalette;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  initializeParticles(); // Call a function to initialize particles
}

function draw() {
  background(0, 10); // Semi-transparent background for a fading trail effect
  particles.forEach((particle) => {
    particle.update();
    particle.display();
  });
}

function initializeParticles() {
  particles = []; // Clear the existing particles array
  currentPalette = random(palettes); // Select a random palette
  for (let i = 0; i < numParticles; i++) {
    particles.push(
      new Particle(random(width), random(height), random(currentPalette))
    );
  }
}

// Refresh the sketch every 1.3 min
setInterval(initializeParticles, 78000);

class Particle {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.color = color;
  }

  update() {
    let angle =
      noise(this.pos.x * noiseScale, this.pos.y * noiseScale) *
      TWO_PI *
      noiseStrength;
    this.vel.x = cos(angle);
    this.vel.y = sin(angle);
    this.pos.add(this.vel);
    this.edges();
  }

  display() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 8);
  }

  edges() {
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }
}
