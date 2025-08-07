document.addEventListener("DOMContentLoaded", function() {
  // Cargar Navbar
  fetch("components/navbar.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("afterbegin", data);
      // Marcar el enlace activo
      const currentPage = window.location.pathname.split("/").pop();
      if (currentPage === "" || currentPage === "index.html") {
        const link = document.querySelector('a[href="index.html"]');
        if(link) link.classList.add("active");
      } else {
        const link = document.querySelector(`a[href="${currentPage}"]`);
        if (link) {
          link.classList.add("active");
        }
      }
    });

  // Cargar Footer
  fetch("components/footer.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", data);
    });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
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