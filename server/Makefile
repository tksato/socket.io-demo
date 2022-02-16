up-server: ## up server
# docker compose up --scale server=2 server --build
	docker compose up -d server --build

up-redis: ## up redis
	docker compose up -d redis

down-all: ## down all
	docker compose down

stop-server: ## down server
	docker compose stop server

down-server: ## down server
	make stop-server
	docker compose rm -f server

ps: ## docker compose ps
	docker compose ps

logs: ## docker compose logs
	docker compose logs

# port: ## docker compose ps
# 	docker compose port server --index=1 5000
# 	docker compose port server --index=2 5000
