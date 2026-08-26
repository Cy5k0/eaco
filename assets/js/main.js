// Componentes compartidos (navbar/footer) cargados dinámicamente.
// main.js es path-aware: calcula el prefijo ../ según la profundidad de la URL,
// para que funcione desde la raíz y desde subdirectorios (talleres/).

function getAssetPrefix() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts.length > 1 ? '../'.repeat(parts.length - 1) : '';
}

// Ajusta las rutas relativas del componente (navbar/footer) según el prefijo.
// 1) Prefija todos los enlaces/recursos relativos con el prefijo de subdirectorio.
// 2) Solo en subdirectorios (prefix != ''), los enlaces a talleres/ se convierten
//    en hermanos (sin carpeta talleres/) porque las páginas de talleres viven juntas.
function rewriteComponentHtml(html, prefix) {
  html = html.replace(/(href|src)="((?!http|#|\.\.\/)[^"]+)"/g, function (m, attr, url) {
    return attr + '="' + prefix + url + '"';
  });
  if (prefix) {
    html = html.replace(/href="\.\.\/talleres\/([^"]+)"/g, 'href="$1"');
  }
  return html;
}

document.addEventListener("DOMContentLoaded", function() {
  const prefix = getAssetPrefix();

  // Cargar Navbar
  fetch(prefix + "components/navbar.html")
    .then(response => response.text())
    .then(data => {
      data = rewriteComponentHtml(data, prefix);
      document.body.insertAdjacentHTML("afterbegin", data);

      // Marcar el enlace activo
      const currentPage = window.location.pathname.split("/").pop();
      if (currentPage === "" || currentPage === "index.html") {
        const link = document.querySelector('a[href="index.html"]');
        if (link) link.classList.add("active");
      } else {
        const link = document.querySelector(`a[href="${currentPage}"]`);
        if (link) link.classList.add("active");
      }

      // Marcar "Talleres" como activo cuando se está dentro de un taller
      if (window.location.pathname.includes("/talleres/")) {
        const allDropdowns = document.querySelectorAll('.nav-link.dropdown-toggle');
        allDropdowns.forEach(el => {
          if (el.textContent.trim().includes('Talleres')) {
            el.classList.add('active');
          }
        });
      }
    });

  // Cargar Footer
  fetch(prefix + "components/footer.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", rewriteComponentHtml(data, prefix));
    });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Lazy loading de imágenes
  const lazyImages = document.querySelectorAll('img[data-src]');
  const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          img.setAttribute('src', src);
          img.classList.add('fade-in');
          observer.disconnect();
        }
      });
    });
    io.observe(target);
  }
  lazyImages.forEach(lazyLoad);

  // Inicializar el carrusel de briefing si existe
  const briefingCarousel = document.querySelector('#briefingCarousel');
  if (briefingCarousel) {
    const carousel = new bootstrap.Carousel(briefingCarousel, {
      interval: 5000, // 5 segundos
      ride: 'carousel',
      pause: 'hover'
    });
  }
});

// Btn copiar texto
function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    alert("Texto copiado al portapapeles!");
  }).catch(err => {
    console.error('Error al copiar texto: ', err);
  });
}

// Función para copiar email de profesores
function copiarEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    // Crear notificación personalizada
    const notification = document.createElement('div');
    notification.className = 'email-notification';
    notification.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      <span>Email copiado: ${email}</span>
    `;
    document.body.appendChild(notification);

    // Mostrar notificación
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }).catch(err => {
    console.error('Error al copiar email: ', err);
    alert('Error al copiar el email');
  });
}
