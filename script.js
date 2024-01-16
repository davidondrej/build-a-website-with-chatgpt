// Get the canvas element and its drawing context
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Array to store particles
let particles = [];

// Number of particles to display
const numberOfParticles = 150;

// Particle class to create individual particles
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    // Update particle position based on its velocity
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Check for horizontal boundaries
        if (this.x < 0) {
            this.x = canvas.width;
        } else if (this.x > canvas.width) {
            this.x = 0;
        }
        // Check for vertical boundaries
        if (this.y < 0) {
            this.y = canvas.height;
        } else if (this.y > canvas.height) {
            this.y = 0;
        }
    }
    // Draw particle on the canvas as a circle
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles with random positions and add them to the particles array
const init = () => {
    particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
};

// Draw lines between particles that are close to each other
const connectParticles = () => {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = 'rgba(255,255,255,' + (1 - distance / 100) + ')';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
};

// Animation loop to move and redraw particles
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(); // Update particle position
        particles[i].draw();   // Redraw particle
    }
    connectParticles();       // Draw lines between particles
    requestAnimationFrame(animate); // Call animate again to create a loop
};

// Ensure the canvas size adjusts to the window size
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Reinitialize particles for new canvas size
});

// Set initial canvas size and start animation
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init(); // Initialize particles
animate(); // Start the animation loop