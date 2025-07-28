// Inicialización de componentes Bootstrap 5
document.addEventListener('DOMContentLoaded', function () {
  // Inicializar carrusel
  var myCarousel = document.querySelector('#carouselExampleCaptions');
  if (myCarousel) {
    var carousel = new bootstrap.Carousel(myCarousel, {
      interval: 5000,
      pause: 'hover'
    });
  }

  // Inicializar tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Inicializar popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});


/* Avisos HTML */
document.addEventListener('DOMContentLoaded', function() {
  // Lazy Load Images
  const lazyImages = document.querySelectorAll('.aviso-item img[src]');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const img = entry.target;
        img.src = img.getAttribute('src');
        img.classList.add('fade-in');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));

  // Ver más toggle
  document.querySelectorAll('.ver-mas-btn').forEach(button => {
    button.addEventListener('click', function() {
      const fullContent = this.parentElement.nextElementSibling;
      fullContent.classList.toggle('d-none');
      this.textContent = fullContent.classList.contains('d-none') ? 'Ver más' : 'Ver menos';
    });
  });

  // Paginación
  const avisos = document.querySelectorAll('.aviso-item');
  const avisosPorPagina = 10;
  let paginaActual = 1;

  function mostrarPagina(pagina) {
    avisos.forEach((aviso, index) => {
      aviso.style.display = (index >= (pagina - 1) * avisosPorPagina && index < pagina * avisosPorPagina) ? 'block' : 'none';
    });
    paginaActual = pagina;
  }

  document.querySelectorAll('.pagination .page-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (this.textContent === 'Anterior' && paginaActual > 1) {
        mostrarPagina(paginaActual - 1);
      } else if (this.textContent === 'Siguiente' && paginaActual < Math.ceil(avisos.length / avisosPorPagina)) {
        mostrarPagina(paginaActual + 1);
      } else if (!isNaN(this.textContent)) {
        mostrarPagina(parseInt(this.textContent));
      }
    });
  });

  mostrarPagina(1); // Inicializar en página 1
});