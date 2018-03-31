# Kanban-Server

This is a graphql-tools Mongoose Server to serve a simple schema.



## Installation

Clone the repository and run `npm install`

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

1. Query

Examples:

get all boards without parameter
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

get all task without parameter
```
  query {
    tasks{
      title
    }
  }
```

get all tasks with parameter
```
  #query

  query ($query: QueryInput){
    tasks (query: $query){
      title
      board {
        name
      }
    }
  }

  #variables
  {
    "query": {
      "selector": {
          "title": {"$regex": "the", "$options": "i"}
      },
      "options": {
        "sort": {"title": -1},
        "limit": 2,
        "skip": 0
      }  
    }
  }

```
you can fill selector and options using standard mongoDB criteria or refer to this page http://docs.meteor.com/api/collections.html#selectors


create task
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

update task
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
