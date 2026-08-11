# syntax=docker/dockerfile:1

# The app image must be built first — this image reuses its compiled public/ assets
# (docker compose build app && docker compose build web)
FROM nginx:alpine

RUN apk add --no-cache openssl \
    && mkdir -p /etc/nginx/ssl \
    && openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
        -subj "/CN=ederevx.us" \
        -keyout /etc/nginx/ssl/self-signed-key.pem \
        -out /etc/nginx/ssl/self-signed.pem

COPY default.conf /etc/nginx/conf.d/default.conf
COPY ssl/cloudflare-origin.pem /etc/nginx/ssl/cloudflare-origin.pem
COPY ssl/cloudflare-origin-ca.pem /etc/nginx/ssl/cloudflare-origin-ca.pem
COPY ssl/cloudflare-origin-key.pem /etc/nginx/ssl/cloudflare-origin-key.pem
COPY htpasswd /etc/nginx/.htpasswd

COPY --from=ederevxus-app:latest /var/www/html/public /usr/share/nginx/html

EXPOSE 80 443
