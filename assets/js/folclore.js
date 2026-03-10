/**
 * Lógica específica para la página de Folclore
 * Escuela de Artes y Cultura
 */

document.addEventListener("DOMContentLoaded", function () {
    // Cargar Navbar desde ruta relativa al subdirectorio
    fetch("../components/navbar.html")
        .then(response => response.text())
        .then(data => {
            // Ajustar rutas del navbar para subdirectorio
            data = data.replace(/href="index\.html"/g, 'href="../index.html"');
            data = data.replace(/href="horarios\.html"/g, 'href="../horarios.html"');
            data = data.replace(/href="documentacion\.html"/g, 'href="../documentacion.html"');
            data = data.replace(/href="enlaces-interes\.html"/g, 'href="../enlaces-interes.html"');
            data = data.replace(/href="lirmi\.html"/g, 'href="../lirmi.html"');
            data = data.replace(/href="profes-jefes\.html"/g, 'href="../profes-jefes.html"');
            data = data.replace(/href="profes-asignaturas\.html"/g, 'href="../profes-asignaturas.html"');
            data = data.replace(/href="equipo-directivo\.html"/g, 'href="../equipo-directivo.html"');
            data = data.replace(/href="programa-pie\.html"/g, 'href="../programa-pie.html"');
            data = data.replace(/href="convivencia-inspectoria\.html"/g, 'href="../convivencia-inspectoria.html"');
            data = data.replace(/href="mision-vision\.html"/g, 'href="../mision-vision.html"');
            data = data.replace(/href="talleres\/folclore\.html"/g, 'href="folclore.html"');
            data = data.replace(/src="assets\/img\//g, 'src="../assets/img/');
            document.body.insertAdjacentHTML("afterbegin", data);

            // Marcar "Talleres" como activo
            const allDropdowns = document.querySelectorAll('.nav-link.dropdown-toggle');
            allDropdowns.forEach(el => {
                if (el.textContent.trim().includes('Talleres')) {
                    el.classList.add('active');
                }
            });
        });

    // Cargar Footer
    fetch("../components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
        });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

/**
 * Copia el email al portapapeles y muestra una notificación
 * @param {string} email 
 */
function copiarEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const notification = document.createElement('div');
        notification.className = 'email-notification';
        notification.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            <span>Email copiado: ${email}</span>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }).catch(err => {
        console.error('Error al copiar email:', err);
    });
}
