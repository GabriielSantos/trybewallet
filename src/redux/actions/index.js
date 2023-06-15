export const ADD_USER = 'ADD_USER';

export const REQUEST_CURRENCIES_FAILURE = 'REQUEST_CURRENCIES_FAILURE';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const addUser = (dataUser) => ({
  type: ADD_USER,
  payload: dataUser,
});

export const requestCurrencies = (dataCurrencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload: dataCurrencies,
});

// export const requestCurrenciesFailure = () => ({
//   type: REQUEST_CURRENCIES_FAILURE,
// });

// export const actionFetchCurrencies = () => (dispatch) => {
//   try {
//     dispatch(requestCurrenciesSuccess(dispatch));
//   } catch (error) {
//     dispatch(requestCurrenciesFailure());
//   }
// };
