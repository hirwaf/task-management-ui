import {LOADING, TASK_CREATED, TASK_DELETED, TASK_ERROR, TASK_UPDATED, TASK_VIEWED,} from "../types";

const init = {
    loading: false,
    error: "",
};

export const taskReducer = (state = init, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case TASK_CREATED:
        case TASK_UPDATED:
        case TASK_VIEWED:
        case TASK_DELETED:
            return {
                ...state,
                task: action.payload
            }
        case TASK_ERROR:
            return {
               ...state,
                error: action.payload
            }
        default:
            return state;
    }
}