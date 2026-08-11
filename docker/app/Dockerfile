# syntax=docker/dockerfile:1

# ---- Stage: vendor (composer dependencies + optimized autoloader) ----
FROM composer:2 AS vendor
WORKDIR /app
COPY . .
RUN composer install \
    --no-dev \
    --no-scripts \
    --optimize-autoloader \
    --prefer-dist \
    --no-interaction

# ---- Stage: assets (Vite build) ----
# Needs PHP + the installed vendor: @laravel/vite-plugin-wayfinder shells out to
# `php artisan wayfinder:generate` as part of the build itself.
FROM node:22-alpine AS assets
RUN apk add --no-cache \
    php84 php84-tokenizer php84-mbstring php84-xml php84-dom php84-simplexml \
    php84-ctype php84-fileinfo php84-openssl php84-phar php84-pdo php84-pdo_sqlite \
    php84-session php84-curl php84-iconv \
    && ln -sf /usr/bin/php84 /usr/bin/php
WORKDIR /app
COPY --from=vendor /app /app
RUN npm ci
RUN npm run build

# ---- Final stage: PHP-FPM runtime ----
FROM php:8.4-fpm-alpine

RUN set -eux; \
    apk add --no-cache oniguruma sqlite-libs libxml2 curl; \
    apk add --no-cache --virtual .build-deps $PHPIZE_DEPS oniguruma-dev sqlite-dev libxml2-dev curl-dev; \
    docker-php-ext-install -j"$(nproc)" pdo_sqlite mbstring xml bcmath opcache curl; \
    apk del .build-deps

WORKDIR /var/www/html

COPY . .
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build

RUN php artisan package:discover --ansi \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

COPY docker/app/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000
ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
