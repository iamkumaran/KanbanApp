const Task = `

  # Main Schema
  type Task {
    _id: String
    title: String
    board: Board
    boardId: String
    order: Int
  }

  # Define doc here
  input TaskDocInput {
    _id: String
    title: String
    boardId: String
    order: Int
  }

`;

export default Task;
