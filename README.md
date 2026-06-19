# BeatCell White

Sitio web estático (HTML/CSS/JS) servido con **nginx** dentro de un contenedor Docker.

## Estructura

```
.
├── index.html                # Landing principal
├── libro-reclamaciones.html  # Libro de reclamaciones
├── terminos.html             # Términos y condiciones
├── css/styles.css            # Estilos
├── js/                       # Scripts del cliente
│   ├── main.js
│   └── menu.js
├── img/                      # Recursos gráficos
├── cursos/                   # Páginas por curso
│   ├── celulares.html
│   ├── diseno-grafico.html
│   ├── electrodomesticos.html
│   ├── electronica.html
│   ├── ofimatica.html
│   ├── pc.html
│   ├── robotica.html
│   └── robotica-kids.html
├── Dockerfile                # Imagen nginx:alpine
├── nginx.conf                # Config del server block
├── entrypoint.sh             # Inicio parametrizable (PORT)
└── .dockerignore
```

## Requisitos

- Docker 20.10+

## Build

```bash
docker build -t beatcell-white:local .
```

## Ejecutar

Puerto por defecto (80 → 8080 host):

```bash
docker run -d --name beatcell -p 8080:80 beatcell-white:local
```

Cambiar el puerto interno con la variable `PORT`:

```bash
docker run -d --name beatcell -e PORT=8000 -p 8080:8000 beatcell-white:local
```

Luego abrir: <http://localhost:8080>

## Despliegue local con Docker Compose

El compose usa `network_mode: host` y la variable `PORT` para evitar problemas de NAT/bridge en equipos con iptables/firewall restrictivos. Nginx escucha directo en el puerto del host (default 8009).

```bash
# Build + up
docker compose up -d --build

# Ver estado
docker compose ps

# Logs
docker compose logs -f

# Detener
docker compose down
```

Luego abrir: <http://localhost:8009>

Para cambiar el puerto, editá `environment.PORT` en `docker-compose.yml`.

## Verificar healthcheck

```bash
docker ps --filter name=beatcell --format "{{.Names}}\t{{.Status}}"
```

## Detener y limpiar

```bash
docker rm -f beatcell
```

## Notas técnicas

- **Imagen base**: `nginx:1.27-alpine` (~25 MB).
- **Cache estático**: assets (`css`, `js`, `img`, fuentes) con `Cache-Control: public, max-age=604800, immutable`.
- **HTML**: sin cache agresivo (`Cache-Control: no-cache`) para que los deploys se vean al instante.
- **gzip** activo para `text/css`, `application/javascript`, `image/svg+xml`, etc.
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
- **Entrypoint**: valida la config (`nginx -t`) antes de arrancar y permite parametrizar el puerto vía `PORT`.
