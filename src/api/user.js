import instance from "../helpers/axios_instance";

export const getUsers = () => {
  return instance.get("/users", {
    params: {
      limit: 1000,
    },
  });
};

export const createUser = (user) => {
  return instance.post("/user", {
    ...user,
  });
};


export const deleteUser = (userId) => {
  return instance.delete(`/user/${userId}`);
}