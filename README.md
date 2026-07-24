# Mini Fighter // Local Lab — versión optimizada

Sitio estático reorganizado para GitHub Pages.

## Estructura

```text
mini-fighter-local-lab-optimized/
├── index.html
├── .nojekyll
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## Optimización aplicada

- CSS y JavaScript separados para permitir caché independiente.
- JavaScript cargado con `defer` para no bloquear el HTML.
- Menú móvil accesible y navegación activa por sección.
- Respeto a `prefers-reduced-motion`.
- Renderizado diferido de secciones extensas cuando el navegador lo soporta.
- Proyecto limpio, sin copias de respaldo ni previsualizaciones dentro del ZIP.
- Sin fuentes, imágenes o librerías externas obligatorias.
