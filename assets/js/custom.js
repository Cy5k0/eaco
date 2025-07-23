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