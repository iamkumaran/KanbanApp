# KanbanApp

# Server
Readme: https://github.com/iamkumaran/KanbanApp/tree/master/server

# Client
Readme: https://github.com/iamkumaran/KanbanApp/tree/master/client

# Docker Instructions

## To run the docker
```
docker-compose up -d
```

## To see the running containers
```
docker ps -q
```

## To stop the running containers
```
docker stop $(docker ps -q)
```

## To remove the containers
```
docker rm $(docker ps -aq)
```

## To view mounted images
```
docker images
```

## To remove images
```
docker rmi <IMAGE ID> # eg: docker rmi 0b970b3b701b
```
