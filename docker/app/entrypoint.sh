#!/bin/sh
set -e

cd /var/www/html

mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/testing \
    storage/framework/views storage/logs storage/app/public storage/app/private storage/pail \
    database/data

touch database/data/database.sqlite

chmod -R ug+rwX storage database/data

exec "$@"
