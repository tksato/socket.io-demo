up-server: ## up server
	docker-compose up -d server-a server-b --build

up-redis: ## up redis
	docker-compose up -d redis

down-all:
	docker-compose down

down-server: ## down server
	docker-compose stop server-a server-b
	docker-compose rm -f server-a server-b
