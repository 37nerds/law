.PHONY: start stop

start:
	docker compose build && docker-compose up

stop:
	docker compose down

dev-server:
	cd server && brew services run mysql; php artisan serve

dev-client:
	cd client && yarn dev
