import {Types} from  '../actions/users'

const INITIAL_STATE = {
    items: []
}

export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_USER_REQUEST: {
            return {...state}
        }
        case Types.GET_USER_SUCCESS: {
            return {...state, items: action.payload.items}
        }
    
        default:
            return {...state}
    }
}