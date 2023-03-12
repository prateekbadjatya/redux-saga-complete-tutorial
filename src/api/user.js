import instance from "../helpers/axios_instance";

export const getUsers = () => {
    return instance.get('/users', {
        params: {
            limit: 1000
        }
    })
}