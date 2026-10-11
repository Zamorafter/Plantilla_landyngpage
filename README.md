# Plantilla de landing page para negocios

Plantilla adaptable para tiendas y pequeños negocios, basada en la estructura visual del proyecto Urban Glow y preparada para cambiar el contenido sin reescribir la lógica principal.

## Archivos que debes editar

- **`config/negocio.js`**: nombre, eslogan, textos, WhatsApp, colores e imagen de portada.
- **`config/productos.js`**: catálogo, categorías, precios, descripciones, imágenes, disponibilidad y opciones/tallas.
- **`css/styles.css`**: distribución y estilos visuales.

## Cómo personalizarla

1. Abre `config/negocio.js` y reemplaza los datos de ejemplo.
2. Coloca el número de WhatsApp con código de país y solo dígitos. Ejemplo: `584121234567`.
3. Edita los objetos de `config/productos.js`. Cada producto necesita un `id` único, `nombre`, `categoria`, `precio`, `descripcion` e `imagen`.
4. Usa imágenes propias o URLs públicas estables. Para ocultar un producto temporalmente, establece `disponible: false`.
5. Abre `index.html` en un navegador o publica el repositorio con GitHub Pages/Vercel.

## Funciones incluidas

- Diseño adaptable a móviles y ordenadores.
- Filtros automáticos por categoría.
- Vista de producto y selección de opciones/tallas.
- Carrito guardado en el navegador.
- Preparación del pedido para enviarlo por WhatsApp.
- Colores y contenido configurables desde un archivo central.

## Notas

- Es una plantilla estática: no procesa pagos ni almacena pedidos en un servidor.
- El carrito se guarda localmente en el navegador del cliente.
- Cambia los textos e imágenes de ejemplo antes de publicar para un negocio real.
- Las imágenes de ejemplo provienen de URLs públicas de Unsplash; sustitúyelas por las del cliente.
- Esta plantilla no incluye panel de administración.

## Estructura

```
index.html
config/
  negocio.js
  productos.js
css/
  styles.css
js/
  main.js
README.md
```
