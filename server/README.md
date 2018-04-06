# kanban-server

> This is a graphql-tools Mongoose Server.


## Installation

Clone the repository and run

```
npm install

start your own Mongodb server
change connection on server.js to

const MONGO_URL = "mongodb://your-mongodb-server:port/db";
```

## Starting the server

```
npm start
```

The server will run on port 4080. You can change this by editing `server.js`.
To test graphiql, you can use http://localhost:4080/graphiql.

## Quick Start

Here are some examples,

Examples:

## get all boards with tasks
```
  query {
    boards {
      _id
      name
      task {
        _id
        title
      }
    }
  }
```

## get all tasks
```
  query {
    tasks{
      title
    }
  }
```


## create task
```
  #query

  mutation ($doc: TaskDocInput!){
    createTask (doc: $doc){
      title
    }
  }

  #variables

  {
    "doc": {
      "title": "Morning Coffee"
    }
  }
```

## update task
```
  #query

  mutation ($query: QueryInput!, $doc: TaskDocInput!){
    updateTask(query: $query, doc: $doc){
      title
    }
  }

  #variables

  {
    "query": {
      "selector": {
        "_id": "585fe5883529cc2df224c1c5"
      }
    },
    "doc": {
      "title": "Buy Coffee"
    }
  }
```

## remove tasks
```
  #query

  mutation ($query: QueryInput!) {
    removeTask(query: $query) {
      _id
    }
  }

  #variables

  {
    "query": {
      "selector": {
        "_id": "585fe5883529cc2df224c1c5"
      }
    }
  }
```
