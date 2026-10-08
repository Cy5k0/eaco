/**
 * actividades-semana.js
 * Muestra las actividades correspondientes a la semana en curso (Lunes a Domingo)
 * a partir de assets/data/calendario-actividades-2026.json
 */

document.addEventListener("DOMContentLoaded", () => {
  inicializarActividadesSemana();
});

// Diccionario de categorías para visualización
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
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const NOMBRES_MESES_CORTO = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
];

const NOMBRES_DIAS = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
];

/**
 * Convierte un objeto Date en cadena YYYY-MM-DD local
 */
function formatoYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Parsea una cadena "YYYY-MM-DD" a un objeto Date local
 */
function parsearFechaLocal(fechaStr) {
  if (!fechaStr) return null;
  const [y, m, d] = fechaStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/**
 * Obtiene el rango de la semana actual (Lunes a Domingo)
 */
function obtenerRangoSemana(fechaActual) {
  const diaSemana = fechaActual.getDay(); // 0 es Domingo, 1 es Lunes
  const diffLunes = diaSemana === 0 ? -6 : 1 - diaSemana;
  const diffDomingo = diaSemana === 0 ? 0 : 7 - diaSemana;

  const lunes = new Date(fechaActual);
  lunes.setDate(fechaActual.getDate() + diffLunes);
  lunes.setHours(0, 0, 0, 0);

  const domingo = new Date(fechaActual);
  domingo.setDate(fechaActual.getDate() + diffDomingo);
  domingo.setHours(23, 59, 59, 999);

  return {
    lunes,
    domingo,
    lunesStr: formatoYMD(lunes),
    domingoStr: formatoYMD(domingo)
  };
}

/**
 * Formatea texto descriptivo del rango de la semana
 */
function formatearTextoRangoSemana(lunes, domingo) {
  const d1 = lunes.getDate();
  const m1 = NOMBRES_MESES[lunes.getMonth()];
  const y1 = lunes.getFullYear();

  const d2 = domingo.getDate();
  const m2 = NOMBRES_MESES[domingo.getMonth()];
  const y2 = domingo.getFullYear();

  if (m1 === m2) {
    return `Semana del ${d1} al ${d2} de ${m1} de ${y1}`;
  }
  return `Semana del ${d1} de ${m1} al ${d2} de ${m2} de ${y2}`;
}

/**
 * Renderiza el mensaje de estado vacío
 */
function renderizarEstadoVacio(contenedor) {
  contenedor.innerHTML = `
    <div class="col-12 col-md-10 col-lg-8">
      <div class="cal-empty-state">
        <div class="cal-empty-icon">
          <i class="bi bi-calendar2-check"></i>
        </div>
        <h4 class="h5 fw-bold text-primary mb-2">No hay actividades programadas para esta semana</h4>
        <p class="text-muted mb-4" style="max-width: 500px; margin: 0 auto;">
          Durante estos días no se registran eventos especiales en el calendario escolar.
          Puedes revisar las actividades de las próximas semanas en el calendario anual.
        </p>
        <a href="temp/calendario-actividades-2026.html" class="btn btn-outline-primary">
          <i class="bi bi-calendar-event me-2"></i>Ver calendario completo 2026
        </a>
      </div>
    </div>
  `;
}

/**
 * Genera el HTML de una tarjeta de actividad semanal
 */
function crearCardActividad(actividad, totalActividades = 3) {
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

  // Horario
  let horarioTexto = "Jornada escolar";
  if (actividad.hora_inicio && actividad.hora_fin) {
    horarioTexto = `${actividad.hora_inicio} a ${actividad.hora_fin} hrs`;
  } else if (actividad.hora_inicio) {
    horarioTexto = `Desde las ${actividad.hora_inicio} hrs`;
  }

  // Rango de fechas si dura varios días
  let fechaDetalle = `${diaNombre} ${numDia} de ${NOMBRES_MESES[fInicio.getMonth()]}`;
  if (fFin) {
    fechaDetalle = `Del ${numDia} al ${fFin.getDate()} de ${NOMBRES_MESES[fFin.getMonth()]}`;
  }

  // Badges de público objetivo
  const publicoHtml = (actividad.publico || [])
    .map(p => {
      const cfg = PUBLICO_CONFIG[p] || { label: p, icon: "bi-person" };
      return `<span class="badge-publico"><i class="bi ${cfg.icon}"></i> ${cfg.label}</span>`;
    })
    .join(" ");

  // Responsables
  const respTexto = (actividad.responsables || []).join(", ");

  // Ajuste de columnas según cantidad para centrado armónico
  let colClase = "col-12 col-md-6 col-lg-4";
  if (totalActividades === 1) {
    colClase = "col-12 col-md-8 col-lg-5";
  } else if (totalActividades === 2) {
    colClase = "col-12 col-md-6 col-lg-5";
  } else {
    colClase = "col-12 col-md-6 col-lg-4";
  }

  return `
    <div class="${colClase}">
      <article class="cal-activity-card p-3 h-100">
        <div class="d-flex align-items-start gap-3 mb-3">
          <div class="cal-date-badge">
            <span class="cal-day-number">${numDia}</span>
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
            <span>${fechaDetalle}</span>
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
              <span><strong>Resp:</strong> ${respTexto}</span>
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

/**
 * Carga y despliega las actividades de la semana actual
 */
async function inicializarActividadesSemana() {
  const contenedor = document.getElementById("contenedor-actividades-semana");
  const rangoTextoEl = document.getElementById("semana-rango-texto");

  if (!contenedor) return;

  // Fecha del sistema
  const hoy = new Date();
  const { lunes, domingo, lunesStr, domingoStr } = obtenerRangoSemana(hoy);

  // Actualizar subtítulo con las fechas de la semana actual
  if (rangoTextoEl) {
    rangoTextoEl.textContent = formatearTextoRangoSemana(lunes, domingo);
  }

  try {
    const respuesta = await fetch("assets/data/calendario-actividades-2026.json");
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const data = await respuesta.json();
    const todasActividades = data.actividades || [];

    // Filtrar actividades de la semana actual que sean visibles
    const actividadesSemana = todasActividades.filter(act => {
      if (act.visible !== true) return false;

      const fInicio = act.fecha_inicio;
      const fFin = act.fecha_fin || fInicio;

      // Evento cuya fecha de inicio caiga dentro de la semana actual
      // o evento multidia en curso durante la semana actual
      const iniciaEnSemana = fInicio >= lunesStr && fInicio <= domingoStr;
      const enCursoEnSemana = fInicio <= domingoStr && fFin >= lunesStr;

      return iniciaEnSemana || enCursoEnSemana;
    });

    // Ordenar cronológicamente por fecha_inicio y hora_inicio
    actividadesSemana.sort((a, b) => {
      if (a.fecha_inicio !== b.fecha_inicio) {
        return a.fecha_inicio.localeCompare(b.fecha_inicio);
      }
      return (a.hora_inicio || "00:00").localeCompare(b.hora_inicio || "00:00");
    });

    // Inyectar en el DOM
    if (actividadesSemana.length === 0) {
      renderizarEstadoVacio(contenedor);
    } else {
      contenedor.innerHTML = actividadesSemana
        .map((act, _, arr) => crearCardActividad(act, arr.length))
        .join("");
    }
  } catch (error) {
    console.error("Error al cargar actividades de la semana:", error);
    contenedor.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          No fue posible cargar las actividades en este momento.
          <a href="temp/calendario-actividades-2026.html" class="alert-link ms-2">Ver calendario anual</a>
        </div>
      </div>
    `;
  }
}
