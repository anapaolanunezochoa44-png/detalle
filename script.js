// 1. Giro de Tarjetas Interactivas
function flipCard(cardElement) {
    const inner = cardElement.querySelector('.card-inner');
    if (inner) {
        inner.classList.toggle('flipped');
    }
}

// 2. Control del Modal de Mensaje Secreto
function openSurpriseModal() {
    document.getElementById('surpriseModal')?.classList.remove('hidden');
}

function closeSurpriseModal() {
    document.getElementById('surpriseModal')?.classList.add('hidden');
}

// 3. Efecto de Partículas Canvas (Chispas de Fuego)
const canvas = document.getElementById('flameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let sparks = [];

class Spark {
    constructor(x, y) {
        this.x = x || Math.random() * (canvas ? canvas.width : window.innerWidth);
        this.y = y || (canvas ? canvas.height : window.innerHeight) + 10;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = -Math.random() * 3 - 1;
        this.color = `hsl(${Math.random() * 40 + 10}, 100%, 50%)`;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.015;
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = Math.max(this.opacity, 0);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FF5500';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function animateSparks() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.4) {
            sparks.push(new Spark());
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
            sparks[i].update();
            sparks[i].draw();
            if (sparks[i].opacity <= 0) {
                sparks.splice(i, 1);
            }
        }
    }
    requestAnimationFrame(animateSparks);
}

function triggerConfetti() {
    const width = canvas ? canvas.width : window.innerWidth;
    const height = canvas ? canvas.height : window.innerHeight;
    for (let i = 0; i < 80; i++) {
        sparks.push(new Spark(width / 2, height / 2));
    }
}

// 4. Motor de Autos, Motos y Logos Flotando (Rutas dentro de la carpeta img/)
const vehicleImages = [
    'imagenes/imagen1.png',  // Auto Naranja
    'imagenes/imagen3.png',  // Lamborghini
    'imagenes/imagen5.png',  // Moto Motocross
    'imagenes/imagen6.png',  // Moto Roja
    'imagenes/imagen7.png',  // Auto Deportivo
    'imagenes/imagen8.png',  // Logo Hot Wheels
    'imagenes/imagen11.png', // Auto Morado
    'imagenes/imagen12.png', // Rueda Fuego
    'imagenes/imagen13.png', // Auto Verde
    'imagenes/imagen14.png'  // Moto Azul
];

class FloatingItem {
    constructor(imgSrc) {
        this.element = document.createElement('img');
        this.element.src = imgSrc;
        this.element.className = 'floating-item';
        
        this.element.onerror = () => {
            console.warn(`No se pudo cargar la imagen: ${imgSrc}. Revisa la carpeta img/`);
            this.element.style.display = 'none';
        };

        const isLogo = imgSrc.includes('imagen8.png');
        const size = isLogo ? Math.random() * 80 + 100 : Math.random() * 60 + 90;
        this.element.style.width = `${size}px`;

        this.x = Math.random() * (window.innerWidth - size);
        this.y = Math.random() * (window.innerHeight - size);

        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;

        this.rotation = Math.random() * 360;
        this.vRot = (Math.random() - 0.5) * 0.5;

        const container = document.getElementById('floating-vehicles-container');
        if (container) {
            container.appendChild(this.element);
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.vRot;

        if (this.x <= 0 || this.x >= window.innerWidth - 100) this.vx *= -1;
        if (this.y <= 0 || this.y >= window.innerHeight - 100) this.vy *= -1;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    }
}

let floatingItems = [];

window.onload = function() {
    animateSparks();

    vehicleImages.forEach(src => {
        floatingItems.push(new FloatingItem(src));
    });

    function animateFloating() {
        floatingItems.forEach(item => item.update());
        requestAnimationFrame(animateFloating);
    }
    animateFloating();
};

// Control de Música de Fondo (Versión Rápido y Furioso)
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicText = document.getElementById('musicText');
    const musicIcon = document.getElementById('musicIcon');

    if (!music) return;

    if (music.paused) {
        music.play().then(() => {
            musicText.innerText = "MÚSICA: ON 🔊";
            musicIcon.className = "fa-solid fa-volume-high text-yellow-400 animate-bounce";
        }).catch(error => {
            console.log("Error al reproducir audio:", error);
        });
    } else {
        music.pause();
        musicText.innerText = "MÚSICA: OFF 🎵";
        musicIcon.className = "fa-solid fa-music";
    }
}