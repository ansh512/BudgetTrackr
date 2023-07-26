import React, { useContext, useState, useEffect } from "react"
import { v4 as uuidV4 } from "uuid"
import { useQuery, gql, useMutation } from "@apollo/client";

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}

const GET_BUDGETS = gql`
  query GetBudgets($userId: ID!) {
    getBudgets(userId: $userId) {
      id
      name
      max
    }
  }
`;

const GET_EXPENSES = gql`
  query GetExpenses($userId: ID!, $budgetId: ID!) {
    getExpenses(userId: $userId, budgetId: $budgetId) {
      id
      description
      amount
      budgetId
    }
  }
`;

const ADD_BUDGET = gql`
  mutation Mutation($userId: ID!, $budget: createNewBudget!) {
    addBudget(userId: $userId, budget: $budget) {
      id
      max
      name
    }
  }
`;

const ADD_EXPENSE = gql`
  mutation Mutation($userId: ID!, $budgetId: ID!, $expense: createNewExpense!) {
    addExpense(userId: $userId, budgetId: $budgetId, expense: $expense) {
      id
      description
      amount
      budgetId
    }
  }
`;

export const BudgetsProvider = ({ children }) => {
  const { loading: budgetsLoading, error: budgetsError, data: budgetsData } = useQuery(GET_BUDGETS, {
    variables: { userId: "1" },
  });

  const { loading: expensesLoading, error: expensesError, data: expensesData } = useQuery(GET_EXPENSES, {
    variables: { userId: "1", budgetId: "1" },
  });
  
  const [addNewBudget, { data: newBudget, error: newBudgetError }] = useMutation(ADD_BUDGET);
  const [addNewExpense, { data: newExpense, error: newExpenseError }] = useMutation(ADD_EXPENSE);

  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!budgetsLoading && !budgetsError && budgetsData) {
      setBudgets(budgetsData.getBudgets);
    }
  }, [budgetsLoading, budgetsError, budgetsData]);

  useEffect(() => {
    if (!expensesLoading && !expensesError && expensesData) {
      setExpenses(expensesData.getExpenses);
    }
  }, [expensesLoading, expensesError, expensesData]);

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }

  function addExpense({ description, amount, budgetId }) {
    addNewExpense({
      variables:{
        userId:"1",
        budgetId:"1",
        expense:{
          id:uuidV4(),
          description: description,
          amount: amount,
          budgetId: budgetId
        }
      }
    })
    .then(({ data }) => {
      setExpenses(prevExpenses => {
        if (prevExpenses.find(expense => expense.description === description)) {
          prevExpenses.amount += amount;
          return prevExpenses;
        }
        return [...prevExpenses, data.addExpense]
      })
    })
    .catch(error => {
      console.error("Error adding budget:", error);
    });
  }

  function addBudget({ name, max }) {
    addNewBudget({
      variables: {
        userId:"1",
        budget:{
          id: uuidV4(),
          name: name,
          max: max,
        }
      },
    })
      .then(({ data }) => {
        setBudgets(prevBudgets => {
          if (prevBudgets.find(budget => budget.name === name)) {
            return prevBudgets;
          }
          return [...prevBudgets, data.addBudget];
        });
      })
      .catch(error => {
        console.error("Error adding budget:", error);
      });
  }
  
  function deleteBudget({ id }) {
    
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })

    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }

  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
