dev:
	docker compose up -d --build

prod:
	docker compose -f docker-compose.prod.yml up -d --build