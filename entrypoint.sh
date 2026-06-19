#!/bin/sh
set -e

# Permite parametrizar el puerto de escucha vía env (default 80)
PORT="${PORT:-80}"

# Reemplaza el listen en el server block si PORT != 80
if [ "$PORT" != "80" ]; then
  sed -i "s/listen[[:space:]]\+80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf
fi

echo "[entrypoint] Validando configuración nginx..."
nginx -t

echo "[entrypoint] Iniciando nginx en puerto ${PORT}..."
exec nginx -g 'daemon off;'
