/**
 * calendario-completo.js
 * Lógica interactiva para la página de Calendario Anual de Actividades 2026
 * Carga assets/data/calendario-actividades-2026.json y permite filtrar por mes, categoría y búsqueda.
 */

document.addEventListener("DOMContentLoaded", () => {
  inicializarCalendarioCompleto();
});

const CATEGORIAS_CONFIG = {
  institucional: { label: "Institucional", icon: "bi-building", badgeClass: "badge-cat-institucional" },
  academica: { label: "Académica", icon: "bi-mortarboard", badgeClass: "badge-cat-academica" },
  convivencia: { label: "Convivencia", icon: "bi-heart-fill", badgeClass: "badge-cat-convivencia" },
  apoderados: { label: "Apoderados", icon: "bi-people-fill", badgeClass: "badge-cat-apoderados" },
  comunidad: { label: "Comunidad", icon: "bi-globe", badgeClass: "badge-cat-comunidad" },
  cultura: { label: "Cultura", icon: "bi-flower1", badgeClass: "badge-cat-cultura" },
  musica: { label: "Música", icon: "bi-music-note-beamed", badgeClass: "badge-cat-musica" },
  vacaciones: { label: "Vacaciones", icon: "bi-sun-fill", badgeClass: "badge-cat-vacaciones" },
  seguridad: { label: "Seguridad", icon: "bi-shield-check", badgeClass: "badge-cat-seguridad" },
  aniversario: { label: "Aniversario", icon: "bi-stars", badgeClass: "badge-cat-aniversario" },
  salida_pedagogica: { label: "Salida Pedagógica", icon: "bi-bus-front", badgeClass: "badge-cat-salida_pedagogica" },
  evaluacion: { label: "Evaluación", icon: "bi-clipboard-check", badgeClass: "badge-cat-evaluacion" },
  artes: { label: "Artes", icon: "bi-brush", badgeClass: "badge-cat-artes" },
  ceremonia: { label: "Ceremonia", icon: "bi-award", badgeClass: "badge-cat-ceremonia" }
};

const PUBLICO_CONFIG = {
  estudiantes: { label: "Estudiantes", icon: "bi-person" },
  apoderados: { label: "Apoderados", icon: "bi-people" },
  docentes: { label: "Docentes", icon: "bi-person-badge" },
  equipo_directivo: { label: "Equipo Directivo", icon: "bi-briefcase" },
  comunidad_educativa: { label: "Comunidad", icon: "bi-buildings" },
  funcionarios: { label: "Funcionarios", icon: "bi-person-workspace" }
};

const NOMBRES_MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const NOMBRES_MESES_CORTO = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
];

const NOMBRES_DIAS = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
];

let todasLasActividades = [];
let filtroMesActivo = "todos";
let filtroCategoriaActiva = "todas";
let terminoBusqueda = "";

function parsearFechaLocal(fechaStr) {
  if (!fechaStr) return null;
  const [y, m, d] = fechaStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function crearCardActividadCompleta(actividad) {
  const fInicio = parsearFechaLocal(actividad.fecha_inicio);
  const fFin = parsearFechaLocal(actividad.fecha_fin);

  const numDia = fInicio ? fInicio.getDate() : "--";
  const mesCorto = fInicio ? NOMBRES_MESES_CORTO[fInicio.getMonth()] : "";
  const diaNombre = fInicio ? NOMBRES_DIAS[fInicio.getDay()] : "";

  const cat = CATEGORIAS_CONFIG[actividad.categoria] || {
    label: actividad.categoria || "General",
    icon: "bi-tag",
    badgeClass: "badge-cat-institucional"
  };

  let horarioTexto = "Jornada escolar";
  if (actividad.hora_inicio && actividad.hora_fin) {
    horarioTexto = `${actividad.hora_inicio} a ${actividad.hora_fin} hrs`;
  } else if (actividad.hora_inicio) {
    horarioTexto = `Desde las ${actividad.hora_inicio} hrs`;
  }

  let fechaTexto = `${diaNombre} ${numDia} de ${NOMBRES_MESES[fInicio.getMonth()]} de 2026`;
  let badgeDiaDisplay = `${numDia}`;
  if (fFin) {
    const numDiaFin = fFin.getDate();
    const mesFin = NOMBRES_MESES[fFin.getMonth()];
    if (fInicio.getMonth() === fFin.getMonth()) {
      fechaTexto = `Del ${numDia} al ${numDiaFin} de ${mesFin} de 2026`;
      badgeDiaDisplay = `${numDia}-${numDiaFin}`;
    } else {
      fechaTexto = `Del ${numDia} de ${NOMBRES_MESES[fInicio.getMonth()]} al ${numDiaFin} de ${mesFin} de 2026`;
      badgeDiaDisplay = `${numDia}`;
    }
  }

  const publicoHtml = (actividad.publico || [])
    .map(p => {
      const cfg = PUBLICO_CONFIG[p] || { label: p, icon: "bi-person" };
      return `<span class="badge-publico"><i class="bi ${cfg.icon}"></i> ${cfg.label}</span>`;
    })
    .join(" ");

  const respTexto = (actividad.responsables || []).join(", ");

  return `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <article class="cal-activity-card p-3">
        <div class="d-flex align-items-start gap-3 mb-3">
          <div class="cal-date-badge">
            <span class="cal-day-number">${badgeDiaDisplay}</span>
            <span class="cal-month-name">${mesCorto}</span>
            <span class="cal-day-name">${diaNombre.slice(0, 3)}</span>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span class="badge-cat ${cat.badgeClass}">
                <i class="bi ${cat.icon}"></i> ${cat.label}
              </span>
              <span class="cal-status-confirmed">
                <i class="bi bi-check2-circle"></i> Confirmada
              </span>
            </div>
            <h3 class="h6 fw-bold text-primary mb-1">${actividad.titulo}</h3>
          </div>
        </div>

        <p class="text-muted small mb-3 flex-grow-1">${actividad.descripcion || ""}</p>

        <div class="pt-2 border-top">
          <div class="cal-meta-item">
            <i class="bi bi-calendar-event"></i>
            <span>${fechaTexto}</span>
          </div>
          <div class="cal-meta-item">
            <i class="bi bi-clock"></i>
            <span>${horarioTexto}</span>
          </div>
          ${actividad.ubicacion ? `
            <div class="cal-meta-item">
              <i class="bi bi-geo-alt"></i>
              <span>${actividad.ubicacion}</span>
            </div>
          ` : ""}
          ${respTexto ? `
            <div class="cal-meta-item">
              <i class="bi bi-person-check"></i>
              <span><strong>Responsables:</strong> ${respTexto}</span>
            </div>
          ` : ""}
          ${publicoHtml ? `
            <div class="mt-2 d-flex flex-wrap gap-1">
              ${publicoHtml}
            </div>
          ` : ""}
        </div>
      </article>
    </div>
  `;
}

function filtrarActividades() {
  const q = terminoBusqueda.trim().toLowerCase();

  return todasLasActividades.filter(act => {
    if (act.visible !== true) return false;

    // Filtro por mes
    if (filtroMesActivo !== "todos") {
      const mesActividad = act.fecha_inicio.substring(0, 7);
      if (mesActividad !== filtroMesActivo) return false;
    }

    // Filtro por categoría
    if (filtroCategoriaActiva !== "todas") {
      if (act.categoria !== filtroCategoriaActiva) return false;
    }

    // Filtro por texto de búsqueda
    if (q) {
      const matchTitulo = (act.titulo || "").toLowerCase().includes(q);
      const matchDesc = (act.descripcion || "").toLowerCase().includes(q);
      const matchUbicacion = (act.ubicacion || "").toLowerCase().includes(q);
      const matchResp = (act.responsables || []).some(r => r.toLowerCase().includes(q));
      const matchPub = (act.publico || []).some(p => p.toLowerCase().includes(q));
      if (!matchTitulo && !matchDesc && !matchUbicacion && !matchResp && !matchPub) {
        return false;
      }
    }

    return true;
  });
}

function renderizarActividades() {
  const contenedor = document.getElementById("contenedor-calendario-general");
  const contadorEl = document.getElementById("cal-contador-resultados");
  if (!contenedor) return;

  const filtradas = filtrarActividades();

  if (contadorEl) {
    contadorEl.textContent = `Mostrando ${filtradas.length} de ${todasLasActividades.length} actividades`;
  }

  if (filtradas.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="cal-empty-state">
          <div class="cal-empty-icon">
            <i class="bi bi-search"></i>
          </div>
          <h4 class="h5 fw-bold text-primary mb-2">No se encontraron actividades</h4>
          <p class="text-muted mb-3" style="max-width: 450px; margin: 0 auto;">
            No hay eventos registrados que coincidan con los criterios de filtro seleccionados.
          </p>
          <button id="btn-reset-filtros" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-arrow-counterclockwise me-1"></i>Restablecer filtros
          </button>
        </div>
      </div>
    `;

    const btnReset = document.getElementById("btn-reset-filtros");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        filtroMesActivo = "todos";
        filtroCategoriaActiva = "todas";
        terminoBusqueda = "";

        const inputBusqueda = document.getElementById("cal-search-input");
        if (inputBusqueda) inputBusqueda.value = "";

        const selectCat = document.getElementById("cal-select-categoria");
        if (selectCat) selectCat.value = "todas";

        actualizarBotonesMes();
        renderizarActividades();
      });
    }
    return;
  }

  // Agrupamiento por mes
  const mesesOrdenados = [
    "2026-03", "2026-04", "2026-05", "2026-06",
    "2026-07", "2026-08", "2026-09", "2026-10",
    "2026-11", "2026-12"
  ];

  let htmlTotal = "";

  mesesOrdenados.forEach(mesKey => {
    const actividadesMes = filtradas.filter(a => a.fecha_inicio.startsWith(mesKey));
    if (actividadesMes.length === 0) return;

    const [anio, numMes] = mesKey.split("-");
    const nombreMes = NOMBRES_MESES[parseInt(numMes, 10) - 1];

    htmlTotal += `
      <section class="cal-month-group mb-5" id="mes-${mesKey}">
        <header class="cal-month-header">
          <h3>
            <i class="bi bi-calendar3 text-primary"></i>
            <span>${nombreMes} ${anio}</span>
          </h3>
          <span class="badge bg-secondary rounded-pill">
            ${actividadesMes.length} ${actividadesMes.length === 1 ? 'actividad' : 'actividades'}
          </span>
        </header>
        <div class="row">
          ${actividadesMes.map(crearCardActividadCompleta).join("")}
        </div>
      </section>
    `;
  });

  contenedor.innerHTML = htmlTotal;
}

function actualizarBotonesMes() {
  document.querySelectorAll(".cal-month-btn").forEach(btn => {
    if (btn.dataset.mes === filtroMesActivo) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

async function inicializarCalendarioCompleto() {
  const contenedor = document.getElementById("contenedor-calendario-general");
  if (!contenedor) return;

  try {
    const res = await fetch("../assets/data/calendario-actividades-2026.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    todasLasActividades = (data.actividades || []).filter(a => a.visible === true);

    // Ordenar cronológicamente
    todasLasActividades.sort((a, b) => {
      if (a.fecha_inicio !== b.fecha_inicio) {
        return a.fecha_inicio.localeCompare(b.fecha_inicio);
      }
      return (a.hora_inicio || "00:00").localeCompare(b.hora_inicio || "00:00");
    });

    // Actualizar estadística en hero
    const totalEl = document.getElementById("cal-total-eventos");
    if (totalEl) totalEl.textContent = todasLasActividades.length;

    // Configurar listeners de meses
    document.querySelectorAll(".cal-month-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filtroMesActivo = btn.dataset.mes;
        actualizarBotonesMes();
        renderizarActividades();

        if (filtroMesActivo !== "todos") {
          const seccionMes = document.getElementById(`mes-${filtroMesActivo}`);
          if (seccionMes) {
            seccionMes.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

    // Configurar selector de categoría
    const selectCat = document.getElementById("cal-select-categoria");
    if (selectCat) {
      selectCat.addEventListener("change", (e) => {
        filtroCategoriaActiva = e.target.value;
        renderizarActividades();
      });
    }

    // Configurar buscador
    const searchInput = document.getElementById("cal-search-input");
    const clearBtn = document.getElementById("cal-search-clear");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        terminoBusqueda = e.target.value;
        if (clearBtn) {
          clearBtn.style.display = terminoBusqueda ? "block" : "none";
        }
        renderizarActividades();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) {
          searchInput.value = "";
          searchInput.focus();
        }
        terminoBusqueda = "";
        clearBtn.style.display = "none";
        renderizarActividades();
      });
    }

    // Botón "Mes actual"
    const btnMesActual = document.getElementById("btn-ir-mes-actual");
    if (btnMesActual) {
      btnMesActual.addEventListener("click", () => {
        const hoy = new Date();
        const mesActualKey = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}`;
        filtroMesActivo = mesActualKey;
        actualizarBotonesMes();
        renderizarActividades();

        const seccionMes = document.getElementById(`mes-${mesActualKey}`);
        if (seccionMes) {
          seccionMes.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    // Render inicial
    renderizarActividades();
  } catch (err) {
    console.error("Error al cargar calendario de actividades:", err);
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          Ocurrió un error al cargar el calendario de actividades. Por favor intenta recargar la página.
        </div>
      </div>
    `;
  }
}
