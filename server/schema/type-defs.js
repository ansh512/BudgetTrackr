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
    budgetId:ID!
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
    budgetId:ID!
  }

  type Query {
    getBudgets(userId: ID!): [Budget!]
    getExpenses(userId: ID!, budgetId: ID!): [Expense!]
  }

  type Mutation {
    addBudget(userId: ID!, budget: createNewBudget!): Budget!
    addExpense(userId: ID!, budgetId: ID!, expense: createNewExpense!): Expense!
    deleteBudget(userId: ID!, budgetId: ID!): [Expense!]
    deleteExpense(userId: ID!, expenseId: ID!): [Budget!]
  }
`;

module.exports = { typeDefs };
