const { UserList } = require("../FakeData");

const resolvers = {
  Query: {
    getBudget: (parent, args) => {
      const user = UserList.find((user) => user.id == args.userId);
      if (user) {
        return user.budgets;
      } else {
        return [];
      }
    },

    getExpense: (parent, args) => {
      const user = UserList.find((user) => user.id == args.userId);
      const budget = user.budgets.find((budget) => budget.id == args.budgetId);
      if (budget) {
        return budget.expenses;
      } else {
        return [];
      }
    },
  },

  Mutation: {
    addBudget: (parent, args) => {
        const user = UserList.find((user) => user.id === args.userId);
        if (!user) {
          throw new Error(`User with ID ${args.userId} not found.`);
        }
  
        const newBudget = {
          id: args.budget.id,
          name: args.budget.name,
          max: args.budget.max,
          expenses: [],
        };
  
        user.budget.push(newBudget);
        return newBudget;
    },
    
    addExpense: (parent, args) => {
        const user = UserList.find((user) => user.id == args.userId);
        if (!user) {
          throw new Error(`User with ID ${args.userId} not found.`);
        }
  
        const budget = user.budget.find((budget) => budget.id == args.budgetId);
        if (!budget) {
          throw new Error(`Budget with ID ${args.budgetId} not found for user ${args.userId}.`);
        }
  
        const newExpense = {
          id: args.expense.id,
          description: args.expense.description,
          amount: args.expense.amount,
        };
  
        budget.expenses.push(newExpense);
        return newExpense;
    },

    
  }
};

module.exports = { resolvers };
