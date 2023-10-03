FROM php:8-fpm-alpine

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apk --no-cache add bzip2-dev gettext-dev git icu icu-dev libintl libpng-dev libzip-dev postgresql-dev
RUN docker-php-ext-install bz2 exif gd gettext intl pcntl pdo pdo_pgsql zip

# ENV PECL_EXTENSIONS="pcov redis xdebug"
# ENV PHP_EXTENSIONS="bz2 exif gd gettext intl pcntl pdo pdo_pgsql zip"

# RUN apk add --update linux-headers

# # Install system dependencies
# RUN apk add --no-cache --virtual .build-deps \
#     $PHPIZE_DEPS libtool \
#     && apk add --no-cache bzip2-dev gettext-dev git icu icu-dev libintl libpng-dev libzip-dev mysql-client \
#     # Install and enable PECL extensions
#     && docker-php-source extract \
#     && pecl channel-update pecl.php.net \
#     && pecl install $PECL_EXTENSIONS \
#     && cd /usr/src/php/ext/ \
#     && docker-php-ext-enable $PECL_EXTENSIONS \
#     && docker-php-ext-configure opcache --enable-opcache \
#     # Install and enable PHP extensions
#     && docker-php-ext-install -j "$(nproc)" $PHP_EXTENSIONS \
#     # Clean up
#     && apk del -f .build-deps \
#     && cd /usr/local/etc/php/conf.d/ \
#     && pecl clear-cache \
#     && docker-php-source delete \
#     && rm -rf /var/cache/apk/* /tmp/* /var/tmp/* /usr/share/doc/* /usr/share/man/*

# # Install latest composer with prestissimo
# COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory and non-root user
WORKDIR /var/www/html
USER www-data
