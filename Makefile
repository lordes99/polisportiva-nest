DOCKERFILE := Dockerfile
DOCKERFILE-GRAALVM := Dockerfile.graalvm

up:
	@echo ${DOCKERFILE}
	@docker-compose up

upGraalVm:
	@echo ${DOCKERFILE-GRAALVM}
	@docker-compose up
upOnlyDb:
	@echo "start DB"
	@docker-compose -f docker-compose-DB.yml up
