import {
  ADD_EXPENSES,
  EDIT_EXPENSES,
  REMOVE_EXPENSES,
  REQUEST_CURRENCIES_SUCCESS,
  SAVE_EDIT_EXPENSES,
} from '../actions';

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
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDIT_EXPENSES:
    return {
      ...state,
      idToEdit: -1,
      editor: false,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.payload.id), action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
