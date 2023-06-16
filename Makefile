DOCKERFILE := Dockerfile

up:
	@echo ${DOCKERFILE}
	@docker-compose up

DOCKERFILE-GRAALVM := Dockerfile.graalvm

upGraalVm:
	@echo ${DOCKERFILE-GRAALVM}
	@docker-compose up
