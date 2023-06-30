DOCKERFILE := Dockerfile
DOCKERFILE-GRAALVM := Dockerfile.graalvm
COMMIT_ID=`git log --pretty=format:'%h' -n 1`

config:
	git config core.abbrev 8

build: config
	docker build -t nest-js:$(COMMIT_ID) . --network=host

up:
	@echo ${DOCKERFILE}
	@docker-compose up

upGraalVm:
	@echo ${DOCKERFILE-GRAALVM}
	@docker-compose up
upOnlyDb:
	@echo "start DB"
	@docker-compose -f docker-compose-DB.yml up
