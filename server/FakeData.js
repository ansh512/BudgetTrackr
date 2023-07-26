const UserList = [
    {
      id: "1", 
      email: "user1@example.com",
      password: "password1",
      budgets: [
        {
          id: "1", 
          type: "Personal",
          max: 1000,
          expenses: [
            {
              id: "1", 
              description: "Lunch",
              amount: 20,
              type: "Food",
            },
            {
              id: "2", 
              description: "Movie Ticket",
              amount: 15,
              type: "Entertainment",
            },
          ],
        },
      ],
    },
    {
      id: "2", 
      email: "user2@example.com",
      password: "password2",
      budgets: [
        {
          id: "2", 
          type: "Travel",
          max: 2000,
          expenses: [
            {
              id: "3", 
              description: "Flight",
              amount: 500,
              type: "Transportation",
            },
            {
              id: "4", 
              description: "Hotel",
              amount: 150,
              type: "Accommodation",
            },
          ],
        },
      ],
    },
    {
      id: "3", 
      email: "user3@example.com",
      password: "password3",
      budgets: [
        {
          id: "3", 
          type: "Business",
          max: 5000,
          expenses: [
            {
              id: "5", 
              description: "Office Supplies",
              amount: 50,
              type: "Business Expense",
            },
            {
              id: "6", 
              description: "Client Meeting",
              amount: 100,
              type: "Business Event",
            },
          ],
        },
      ],
    },
  ];
  
  module.exports = { UserList };
  