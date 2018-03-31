const Board = `

  # Main Schema
  type Board {
    _id: String
    name: String
    task: [Task]
  }

  # Define doc here
  input BoardDocInput {
    _id: String
    name: String
  }

`;

export default Board;
