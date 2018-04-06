# kanban-server

> This is a Graphql Mongoose Server.


## Installation

```
# install dependencies
npm install


# start Mongodb server

```

## Starting the server

```
# run on localhost:4080
npm start
```

By Default MongoDB will run on,
```
mongodb://localhost:27017/kanbanData
```

To test graphiql, use http://localhost:4080/graphiql.

## Quick Start

Here are some examples,

Examples:

### get all boards with tasks
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

### get all tasks
```
  query {
    tasks{
      title
    }
  }
```


### create task
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

### update task
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

### remove tasks
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
