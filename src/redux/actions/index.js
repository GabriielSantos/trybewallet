export const ADD_USER = 'ADD_USER';

export const addUser = (data) => (
  {
    type: ADD_USER,
    payload: data,
  });
