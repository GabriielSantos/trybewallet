import { ADD_EXPENSES, REMOVE_EXPENSES, REQUEST_CURRENCIES_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  default:
    return state;
  }
};

export default wallet;
