dev-api:
	brew services run mysql;
	brew services run nginx;
	brew services run redis;
	php api/artisan serve;

dev-queue:
	php api/artisan queue:work --queue=high,default

dev-web:
	cd web; pnpm dev;
