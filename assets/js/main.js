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

  // Debug: Verificar si los elementos clickeables están funcionando
  console.log('Verificando elementos clickeables...');
  
  // Verificar elementos teacher-contact
  const teacherContacts = document.querySelectorAll('.teacher-contact');
  console.log('Elementos teacher-contact encontrados:', teacherContacts.length);
  
  teacherContacts.forEach((element, index) => {
    console.log(`Elemento ${index}:`, element);
    element.addEventListener('click', function(e) {
      console.log('Click detectado en teacher-contact:', e.target);
    });
  });

  // Verificar botones
  const buttons = document.querySelectorAll('.btn');
  console.log('Botones encontrados:', buttons.length);
  
  buttons.forEach((button, index) => {
    console.log(`Botón ${index}:`, button);
    button.addEventListener('click', function(e) {
      console.log('Click detectado en botón:', e.target);
    });
  });
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
  console.log('Función copiarEmail llamada con:', email);
  
  navigator.clipboard.writeText(email).then(() => {
    console.log('Email copiado exitosamente:', email);
    
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