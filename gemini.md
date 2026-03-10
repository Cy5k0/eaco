# AntiGravity Global Rules: AI-First Static Web Development
## Archivo de Configuración del Agente (gemini.md)

Este documento contiene las reglas maestras e inquebrantables para el desarrollo de proyectos dentro de AntiGravity. El objetivo es la creación de sitios web estáticos que sean técnicamente perfectos tanto para usuarios humanos como para modelos de lenguaje (LLMs), Google AI Overviews (SGE) y Answer Engine Optimization (AEO).

---

## 1. Arquitectura de Componentes y Modularización
Para garantizar la reutilización de código y la limpieza del proyecto, se prohíben las estructuras monolíticas.

* **Componentes Separados:** El `navbar` (navegación) y el `footer` (pie de página) deben residir en archivos independientes dentro de la carpeta `/components`.
* **Inyección de Código:** El agente debe proponer el uso de *templates* o scripts de carga (Fetch API) para integrar estos componentes en el HTML principal, evitando la duplicación de código en cada página.

---

## 2. Organización del Directorio `/assets`
Queda estrictamente prohibido tener archivos sueltos en la raíz de la carpeta de activos. Se debe seguir esta jerarquía:

* `assets/img/`: Todas las imágenes (priorizar .webp), iconos y vectores (SVG).
* `assets/css/`: Hojas de estilo externas.
* `assets/js/`: Scripts de lógica, interactividad y carga de componentes.
* `assets/fonts/`: Tipografías descargadas localmente.

---

## 3. Separación de Responsabilidades (Archivos Externos)
* **CSS Externo:** Todo el estilo debe vivir en archivos `.css`. No se permite CSS embebido (`<style>`) ni estilos inline, salvo excepciones de *Critical CSS*.
* **JS Externo:** Toda la lógica debe residir en archivos `.js`. Se debe utilizar el atributo `defer` en la llamada del script para optimizar la carga del DOM.

---

## 4. Estrategia AI-First (SEO & AEO)
El sitio debe estar optimizado para ser "leído", "entendido" y "citado" por motores de respuesta de IA.

* **HTML5 Semántico Estricto:** Uso obligatorio de `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` y `<footer>`. Evitar el uso excesivo de `<div>`.
* **Jerarquía de Encabezados:** Solo un `<h1>` por página. Los `<h2>` deben plantear preguntas o temas clave que la IA pueda identificar como respuestas directas.
* **Técnica BLUF (Bottom Line Up Front):** El primer párrafo tras un encabezado debe ser una respuesta directa y concisa (30-50 palabras).
* **Datos Estructurados (Schema JSON-LD):** Cada página debe incluir su bloque de Schema validado (`FAQPage`, `Article`, `LocalBusiness`, etc.) para alimentar directamente a la IA.

---

## 5. Blueprint de Estructura de Carpetas
Cualquier proyecto bajo el estándar AntiGravity debe inicializarse con la siguiente estructura:

```text
/proyecto-antigravity
│
├── /assets                 # Recursos estáticos
│   ├── /css                # Estilos (main.css)
│   ├── /js                 # Lógica (app.js)
│   ├── /img                # Multimedia (imagen.webp)
│   └── /fonts              # Fuentes locales
│
├── /components             # Fragmentos reutilizables
│   ├── navbar.html
│   └── footer.html
│
├── index.html              # Punto de entrada principal
├── gemini.md               # Este archivo de reglas
└── robots.txt              # Guía para crawlers y bots de IA
```

---

## 6. Instrucciones para Gemini (Tu Rol como Agente)
Al generar código para AntiGravity, debes seguir estas reglas inquebrantables:

1.  **Validar Rutas:** Asegurarte de que todos los enlaces a recursos (imágenes, scripts, estilos) apunten siempre a la subcarpeta correspondiente dentro de `assets/` (ej: `assets/img/nombre.webp`).
2.  **Generación de JSON-LD:** Siempre que te pida crear una página o componente, debes incluir el bloque `<script type="application/ld+json">` correspondiente y validado.
3.  **Justificación Semántica:** Si usas una etiqueta HTML específica (como `<article>` en lugar de `<section>`), añade un comentario en el código explicando por qué ayuda a la IA a entender el contexto.
4.  **Verificación de E-E-A-T:** Si generas texto de relleno o borradores, asegúrate de incluir marcadores de posición para "Biografía del Autor" y "Fuentes", recordándome que son necesarios para la autoridad del sitio ante la IA.
5.  **Simulación de Parser:** Al revisar el código, actúa como un crawler y verifica si el contenido principal es accesible sin JavaScript (priorizando HTML estático o carga asíncrona no bloqueante).
6.  **Optimización de Formatos:** Sugerir y utilizar siempre formatos de imagen modernos (`.webp`) y atributos de carga diferida (`loading="lazy"`) para cumplir con los Core Web Vitals.
