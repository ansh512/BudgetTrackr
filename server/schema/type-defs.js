const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    budget: [Budget!]
  }

  type Budget {
    id: ID!
    name: String!
    max: Int!
    expenses: [Expense!]
  }

  type Expense {
    id: ID!
    description: String!
    amount: Int!
  }

  input createNewBudget {
    id: ID!
    name: String!
    max:Int!
  }

  input createNewExpense {
    id: ID!
    description: String!
    amount:Int!
  }

  type Query {
    getBudget(userId: ID!): [Budget!]
    getExpense(userId: ID!, budgetId: ID!): [Expense!]
  }

  type Mutation {
    addBudget(userId: ID!, Budget: createNewBudget!): Budget!
    addExpense(userId: ID!, budgetId: ID!, expense: createNewExpense!): Expense!
    deleteBudget(userId: ID!, budgetId: ID!): Budget!
    deleteExpense(userId: ID!, expenseId: ID!): Expense!
  }
`;

module.exports = { typeDefs };
