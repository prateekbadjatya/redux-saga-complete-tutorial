export const Types = {
  GET_USER_REQUEST: "users/get_users_request",
  GET_USER_SUCCESS: "users/get_users_success",
  CREATE_USER_REQUEST: "users/create_user_request",
  DELETE_USER_REQUEST: "users/delete_user_request",
  "USERS_ERROR": 'users/user_error'
};

export const getUserRequest = () => {
  return {
    type: Types.GET_USER_REQUEST,
  };
};

export const getUserSuccess = ({ items }) => {
  // console.log('i', items)
  return {
    type: Types.GET_USER_SUCCESS,
    payload: { items },
  };
};

export const createUserrequest = ({ firstName, lastName }) => {
  return {
    type: Types.CREATE_USER_REQUEST,
    payload: {
      firstName,
      lastName,
    },
  };
};

export const deleteUserrequest = (userId) => {
  return {
    type: Types.DELETE_USER_REQUEST,
    payload: {
      userId,
    },
  };
};


export const usersError = ({error}) => ({
  type: Types.USERS_ERROR,
  payload: {
      error
  }
});