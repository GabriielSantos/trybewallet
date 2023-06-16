export const ADD_USER = 'ADD_USER';
export const ADD_DESPESAS = 'ADD_DESPESAS';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const addUser = (dataUser) => ({
  type: ADD_USER,
  payload: dataUser,
});

export const requestCurrencies = (dataCurrencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload: dataCurrencies,
});

export const addDespesas = (dataDespesas) => ({
  type: ADD_DESPESAS,
  payload: dataDespesas,
});
