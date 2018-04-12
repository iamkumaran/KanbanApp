# KanbanApp

Kanban Board App built using vue, vuex, angular, graphql, mongodb, mongoose, apollographql, nodejs, expressjs...

## server
Readme: https://github.com/iamkumaran/KanbanApp/tree/master/server

## client
>Developed with Vue
Readme: https://github.com/iamkumaran/KanbanApp/tree/master/client


## client-angular
>Developed with Angular
Readme: https://github.com/iamkumaran/KanbanApp/tree/master/client-angular
Note: Not Dockerized

# Docker Instructions

## To run the docker
```
docker-compose up -d

# Kanban App should be running at
http://localhost:8080/
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
