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

## Publicación en GitHub Pages

Sube **todo el contenido de esta carpeta**, conservando la estructura. No subas únicamente `index.html`, porque este ahora depende de `assets/css/styles.css` y `assets/js/app.js`.

## Prueba local

Puedes abrir `index.html` directamente. Para reproducir mejor el funcionamiento de GitHub Pages:

```powershell
cd mini-fighter-local-lab-optimized
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Optimización aplicada

- CSS y JavaScript separados para permitir caché independiente.
- JavaScript cargado con `defer` para no bloquear el HTML.
- Menú móvil accesible y navegación activa por sección.
- Respeto a `prefers-reduced-motion`.
- Renderizado diferido de secciones extensas cuando el navegador lo soporta.
- Proyecto limpio, sin copias de respaldo ni previsualizaciones dentro del ZIP.
- Sin fuentes, imágenes o librerías externas obligatorias.
