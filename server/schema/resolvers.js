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

    deleteExpense : (userId, expenseId) => {
        const userIndex = UserList.findIndex((user) => user.id === userId);
      
        if (userIndex === -1) {
          throw new Error(`User with ID ${userId} not found.`);
        }
      
        const user = UserList[userIndex];
        const budgetIndex = user.budgets.findIndex((budget) => budget.expenses.some((expense) => expense.id === expenseId));
      
        if (budgetIndex === -1) {
          throw new Error(`Expense with ID ${expenseId} not found in the user's budgets.`);
        }
      
        const expenseIndex = user.budgets[budgetIndex].expenses.findIndex((expense) => expense.id === expenseId);
      
        if (expenseIndex === -1) {
          throw new Error(`Expense with ID ${expenseId} not found in the budget.`);
        }
      
        user.budgets[budgetIndex].expenses.splice(expenseIndex, 1);
      
        return user.budgets.expenses;
    },
    
    deleteBudget: (parent, args) => {
        const userId = args.userId;
        const budgetId = args.budgetId;
      
        const userIndex = UserList.findIndex((user) => user.id === userId);
      
        if (userIndex === -1) {
          throw new Error(`User with ID ${userId} not found.`);
        }
      
        const user = UserList[userIndex];
        const budgetIndex = user.budgets.findIndex((budget) => budget.id === budgetId);
      
        if (budgetIndex === -1) {
          throw new Error(`Budget with ID ${budgetId} not found in the user's budgets.`);
        }
      
        user.budgets.splice(budgetIndex, 1);
      
        return user.budgets;
    },
  }
};

module.exports = { resolvers };
