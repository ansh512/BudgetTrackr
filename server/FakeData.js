const UserList = [
    {
      id: "1", 
      email: "user1@example.com",
      password: "password1",
      budgets: [
        {
          id: "1", 
          name: "Personal",
          max: 1000,
          expenses: [
            {
              id: "11", 
              description: "Lunch",
              amount: 20,
              budgetId:"1"
            },
            {
              id: "21", 
              description: "Movie Ticket",
              amount: 15,
              budgetId:"1",
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
          name: "Travel",
          max: 2000,
          expenses: [
            {
              id: "3", 
              description: "Flight",
              amount: 500,
              budgetId:"2"
            },
            {
              id: "4", 
              description: "Hotel",
              amount: 150,
              budgetId:"2"
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
          name: "Business",
          max: 5000,
          expenses: [
            {
              id: "5", 
              description: "Office Supplies",
              amount: 50,
              budgetId:"3"
            },
            {
              id: "6", 
              description: "Client Meeting",
              amount: 100,
              budgetId:"3"
            },
          ],
        },
      ],
    },
  ];
  
  module.exports = { UserList };
  