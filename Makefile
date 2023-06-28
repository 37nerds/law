.PHONY: start stop

start:
	docker compose build && docker-compose up

stop:
	docker compose down
