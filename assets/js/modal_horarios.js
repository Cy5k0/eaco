document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll('[data-bs-target="#modalHorario"]');
    const imagen = document.getElementById("imagenHorario");
    const titulo = document.getElementById("modalHorarioLabel");
  
    // Mapeo exacto de curso => nombre de archivo
    const cursoImagenMap = {
      "Prekinder": "PreKinder.webp",
      "Kinder": "Kinder.webp",
      "1º Básico": "1o_basico.webp",
      "2º Básico": "2o_basico.webp",
      "3º Básico": "3o_basico.webp",
      "4º Básico": "4o_basico.webp",
      "5º Básico": "5o_basico.webp",
      "6º Básico": "6o_basico.webp",
      "7º Básico A": "7o_basico_A.webp",
      "7º Básico B": "7o_basico_B.webp",
      "8º Básico A": "8o_basico_A.webp",
      "8º Básico B": "8o_basico_B.webp"
    };
  
    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        const curso = boton.getAttribute("data-curso");
        titulo.textContent = `Horario - ${curso}`;
  
        const archivo = cursoImagenMap[curso];
        if (archivo) {
          imagen.src = `assets/images/horarios/${archivo}`;
          imagen.alt = `Horario para ${curso}`;
        } else {
          imagen.src = "";
          imagen.alt = "Horario no disponible.";
          imagen.replaceWith(imagen.cloneNode()); // reinicia imagen
        }
      });
    });
  });
  
  