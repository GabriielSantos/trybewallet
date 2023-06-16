export const ADD_USER = 'ADD_USER';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const addUser = (dataUser) => ({
  type: ADD_USER,
  payload: dataUser,
});

export const requestCurrencies = (dataCurrencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload: dataCurrencies,
});

export const addExpense = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const removeExpense = (expenseId) => ({
  type: REMOVE_EXPENSES,
  payload: expenseId,
});
