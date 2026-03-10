// Crear partículas flotantes
function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}

// Efecto de escritura en el título
function typeWriter() {
    const title = document.querySelector('.main-title');
    if (!title) return;

    const text = 'EN CONSTRUCCIÓN';
    title.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            title.innerHTML += text.charAt(i);
        }, i * 100);
    }
}

// Inicializar efectos
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    setTimeout(typeWriter, 500);

    // Efecto de click en el botón
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function (e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
        });
    }
});
