pb-up:
	docker run --rm -d -p 8090:8090 pocketbase

pb-build:
	docker build -t pocketbase ./pocketbase
