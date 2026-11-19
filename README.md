# Bit&Fix

Sitio web de **Bit&Fix**, mi emprendimiento de reparación de PC y desarrollo de páginas web para negocios de Córdoba.

**Ver el sitio:** https://bit-fix.pages.dev

![Página de inicio de Bit&Fix](docs/inicio.png)

## Qué problema resuelve

Muchos negocios chicos y personas que necesitan arreglar su computadora no tienen dónde ver qué servicios ofrezco, cuánto cuestan o trabajos anteriores. El sitio reúne todo en un solo lugar y lleva cada consulta a WhatsApp con un mensaje ya escrito, para que contactarme sea un solo toque.

Además, funciona como catálogo de páginas web: tiene 12 sitios de ejemplo, uno por rubro, para que cada cliente vea cómo podría quedar el suyo antes de encargarlo.

## Qué incluye

- **Servicios de reparación**, armado y mantenimiento de PC.
- **PCs a la venta**, que se cargan editando una lista en `js/main.js`, sin tocar el HTML.
- **Paquetes de páginas web** para negocios.
- **Antes y después** de trabajos reales, con fotos y videos.
- **Contacto por WhatsApp** desde cualquier botón, con el mensaje armado según la sección.
- **Diseño adaptable**: se ve bien en computadora y en celular.

## Páginas de ejemplo

![Galería de páginas de ejemplo](docs/demos.png)

| Rubro | Qué muestra |
|---|---|
| [Barbería](https://bit-fix.pages.dev/demos/barberia/) | Precios, galería y turnos |
| [Gimnasio](https://bit-fix.pages.dev/demos/gimnasio/) | Planes, grilla de clases y clase gratis |
| [Taller mecánico](https://bit-fix.pages.dev/demos/taller/) | Servicios y pedido de presupuesto |
| [Panadería](https://bit-fix.pages.dev/demos/panaderia/) | Pedidos online y encargo de tortas |
| [Polirubro](https://bit-fix.pages.dev/demos/polirubro/) | Rubros, catálogo y envíos |
| [Tienda de anime](https://bit-fix.pages.dev/demos/anime/) | Catálogo, talles y preventas |
| [Ropa interior](https://bit-fix.pages.dev/demos/lenceria/) | Catálogo con talles y guía de talles |
| [Costura](https://bit-fix.pages.dev/demos/costura/) | Arreglos con precios y pedido |
| [Reparación de celulares](https://bit-fix.pages.dev/demos/celulares/) | Cotizador online y garantía |
| [Estudio jurídico](https://bit-fix.pages.dev/demos/estudio-juridico/) | Áreas de práctica, equipo y consultas |
| [Vendedor de autos](https://bit-fix.pages.dev/demos/vendedor-autos/) | Unidades, simulador de cuotas y toma de usados |
| [ROXMAR · Tienda de ropa](https://bit-fix.pages.dev/demos/roxmar/) | Catálogo con talles y pedido por WhatsApp |

Las demos comparten un kit propio en JavaScript (`demos/kit.js`) con catálogo filtrable, carrito, formularios y cotizador. Cada página solo define sus productos y textos, y el kit arma el resto. En las demos, los pedidos y turnos no se envían a ningún negocio: muestran cómo le llegaría el mensaje y ofrecen pedir una web así.

## Tecnologías

- HTML5, CSS3 y JavaScript, sin frameworks
- Publicado en Cloudflare Pages
- Git y GitHub

## Estructura

```
/
├── index.html        # Página principal
├── css/main.css      # Estilos del sitio
├── js/main.js        # WhatsApp, PCs a la venta y menú
├── demos/            # 12 páginas de ejemplo y su kit compartido
├── img/              # Logo, ilustraciones, capturas y fotos de trabajos
├── videos/           # Videos de antes y después
└── docs/             # Capturas para este README
```

## Cómo verlo en tu computadora

No necesita instalar nada: descargá el repositorio (**Code → Download ZIP**), descomprimilo y abrí `index.html` con el navegador.

<p align="center"><img src="docs/celular.png" alt="Bit&Fix en el celular" width="260"></p>

## Autor

**Ricardo Kieffer** · [LinkedIn](https://www.linkedin.com/in/ricardo-kieffer) · [GitHub](https://github.com/ricardokieffer)
