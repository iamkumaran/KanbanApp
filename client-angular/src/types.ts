export type Board = {
  _id: string,
  name: string,
  task: [Task]
}

export type Task = {
  title: string,
  boardId: string,
  order: number
}

export type Query = {
    getAllBoard: Board[];
}
