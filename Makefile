DOCKERFILE-GRAALVM := Dockerfile.graalvm
COMMIT_ID=`git log --pretty=format:'%h' -n 1`

config:
	git config core.abbrev 8

build: config
	docker build -t polisportiva-nest-js:$(COMMIT_ID) . --network=host

retag: build
	docker tag polisportiva-nest-js:$(COMMIT_ID) polisportiva-nest-js:latest

upAndBuild: retag
	docker-compose up

up:
	docker-compose up

buildGralvm: config
	docker build -t polisportiva-nest-js:gralvm-$(COMMIT_ID) -f ${DOCKERFILE-GRAALVM} . --network=host

retagGralvm: buildGralvm
	docker tag polisportiva-nest-js:gralvm-$(COMMIT_ID) polisportiva-nest-js:graalvm-latest

upAndBuildGraalVm: retagGralvm
	docker-compose -f docker-compose-GRAALVM.yml up

upGraalVm:
	docker-compose -f docker-compose-GRAALVM.yml up

upOnlyDb:
	@echo "start DB"
	@docker-compose -f docker-compose-DB.yml up
