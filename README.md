# Portafolio UGC · Darlyn Lova

Sitio estático (HTML, CSS y JS) publicado en Netlify, con panel de administración en **`/entrar`**.

## Cómo está organizado

| Carpeta | Qué hay |
|---|---|
| `index.html` | La página |
| `css/estilos.css` | Diseño (colores, letras, animaciones) |
| `js/sitio.js` | Arma la página a partir del contenido y le da movimiento |
| `contenido/*.json` | **Todo el texto, fotos y videos.** Se edita desde el panel |
| `media/` | Fotos y videos que subes desde el panel |
| `entrar/` | Panel de administración (Decap CMS) |

## Editar el sitio

1. Entra a `https://TU-SITIO.netlify.app/entrar/` e inicia sesión.
2. Elige qué editar: Videos, Perfil, Sobre mí, Servicios, Marcas, Contacto o Diseño.
3. Cambia lo que quieras y dale **Publicar**. En 1–2 minutos se ve en tu página.

Tips:
- En los títulos, pon una palabra entre asteriscos (`Mis *videos*`) para que salga en cursiva rosa.
- Videos: sube el original de tu galería (sin marca de agua), de preferencia de menos de 20 MB.
- La sección **Marcas** solo aparece cuando agregas al menos una marca.

## Configuración de Netlify (una sola vez)

1. **Add new site → Import an existing project → GitHub →** este repositorio. Sin comando de build; carpeta de publicación: `.`
2. **Project configuration → Identity → Enable Identity.**
3. En Identity → **Registration preferences → Invite only.**
4. En Identity → **Services → Git Gateway → Enable.**
5. En la pestaña **Identity → Invite users**, invita tu correo. Abre el correo, crea tu contraseña y listo.
