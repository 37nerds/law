ready:
	copy .env.example .env
	composer install

dev:
	brew services run mysql; brew services run nginx; php artisan serve
