# Carta de cumpleaños 🎂

Sitio de una sola página, optimizado para celular, pensado para GitHub Pages.

**Flujo:** candado con PIN → explosión de flores → juego de atrapar flores →
mensaje desbloqueado → carta → dashboard (Carta · Memorama · Trivia ·
Presentación). El reproductor de música está disponible en todo momento.

## Estructura de archivos

```
tu-repositorio/
├── index.html
├── style.css
├── script.js
├── img/          ← aquí van las 8 fotos del memorama
└── music/        ← aquí van los .mp3
```

## Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos y carpetas respetando la estructura de arriba.
3. Ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`. Guarda.
5. Espera 1-2 minutos. Tendrás un enlace tipo
   `https://tu-usuario.github.io/tu-repositorio/`.

## Qué personalizar

### En `index.html`

| Dónde | Qué es |
|---|---|
| `<template id="letter-template">` | Nombre, texto de la carta y firma. Se edita **una sola vez** y aparece en la carta de apertura y en la pestaña "Carta". |
| `class="lock__hint"` | La pista para adivinar el PIN. |
| `class="catch-win__text"` | El mensaje que se desbloquea al completar el ramo. |
| `src` del `<iframe id="canva-frame">` | El enlace de inserción de tu Canva. |

### En `script.js` (bloque CONFIGURACIÓN, al inicio)

| Variable | Qué hace |
|---|---|
| `PIN` | Los 4 dígitos del candado. Por defecto `'0000'`. |
| `FLOWERS` | Emojis que explotan y que caen en el juego. |
| `CATCH_TARGET` | Cuántas flores hay que atrapar para ganar. Por defecto 12. |
| `MEMO_ITEMS` | Las 8 tarjetas del memorama: ruta de imagen + texto de reemplazo. |
| `TRIVIA_QUESTIONS` | Preguntas, dificultad, color, opciones y respuesta correcta. |
| `SONGS` | Título y ruta de cada canción. |
| `MUSIC_VOLUME` | Volumen de reproducción. Está en `0.3` (30%). |

## El juego: atrapar flores

Pantalla de instrucciones → "Empezar" → caen flores desde arriba. Se arrastra
el dedo (o el mouse) por la pantalla para mover la canasta horizontalmente.

- Cada flor atrapada suma al contador y a la barra de progreso de arriba.
- Las flores caen a velocidades y con deriva lateral aleatorias, y giran
  mientras caen.
- El ritmo de aparición se acelera un poco con cada flor atrapada.
- No hay penalización por dejar caer una flor: solo se pierde y sigue el
  juego. La idea es que sea divertido, no frustrante.
- Al llegar a `CATCH_TARGET` flores hay una explosión y se revela el mensaje
  final, con un botón para continuar a la carta.

## El memorama con tus fotos

Pon 8 imágenes en la carpeta `img/` con los nombres `foto1.jpg` … `foto8.jpg`
(hay un archivo `LEER.txt` dentro con el recordatorio). Cada foto aparece dos
veces en el tablero: hay que encontrar las parejas.

**Mientras no subas las imágenes**, cada carta muestra su texto de reemplazo
(`[Foto 1]`, `[Foto 2]`, etc.) para que puedas probar el juego igual. En
cuanto subas los archivos, las fotos aparecen solas sin tocar nada más.

Cómo funciona:

1. Tocas una carta → gira en 3D y revela la foto.
2. Tocas una segunda → gira también y el contador de movimientos sube.
3. **Par correcto:** se quedan boca arriba con borde verde, atenuadas, y ya no
   responden a más toques.
4. **Par incorrecto:** borde rojo durante 0.9 s y se voltean solas. El tablero
   se bloquea esa pausa para que no se pueda hacer trampa tocando todo rápido.
5. Al completar los 8 pares se anuncia el total de movimientos y hay una
   pequeña explosión de flores.

Recomendación: imágenes cuadradas (~400×400 px), bajo 300 KB cada una.

## La trivia

Cada pregunta lleva una etiqueta de dificultad con su propio color, que
aparece justo arriba del texto de la pregunta. Se configura por pregunta:

```js
{
  difficulty: '[Fácil]',        // el texto de la etiqueta
  color: '#8fb89c',             // el color de la etiqueta y su puntito
  question: '¿Cuál es su color favorito?',
  options: ['Opción A', 'Opción B', 'Opción C'],
  correct: 0,                   // 0 = primera opción, 1 = segunda, 2 = tercera
}
```

Puedes usar cualquier color CSS (`#hex`, `rgb(...)`, o nombres como `tomato`).
Si dejas `difficulty` vacío, la etiqueta simplemente no se muestra.

## La música

El ícono de nota musical está fijo arriba a la derecha, visible en todas las
pantallas. Al tocarlo se despliega el menú con la lista de canciones.

- Tocar una canción la reproduce; tocar la que ya suena la pausa.
- La canción que está sonando se marca en dorado con un punto.
- Al terminar una canción pasa sola a la siguiente.
- "Detener" corta la reproducción y vuelve al inicio.
- **El volumen está fijo en 30%** (`MUSIC_VOLUME = 0.3` en `script.js`).

Pon tus `.mp3` en la carpeta `music/` con los nombres `cancion1.mp3` …
`cancion4.mp3`, y cambia los títulos que se muestran en el arreglo `SONGS`.
Si un archivo aún no existe, el reproductor simplemente no hace nada en vez
de romperse.

Ten en cuenta que los navegadores móviles no permiten reproducir audio sin una
acción del usuario — por eso la música arranca solo cuando ella toca una
canción, no automáticamente.

## Notas

- Todo respeta la preferencia de "reducir movimiento" del sistema.
- No requiere servidor ni base de datos.
