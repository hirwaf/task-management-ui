import {LOADING, TASK_CREATED, TASK_ERROR, TASK_UPDATED,} from "../types";
import {createTask, updateTask} from "../../services/tasks.service";

export const createTaskAction = (data) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
        const res = await createTask(data);
        dispatch({ type: TASK_CREATED, payload: res });
    } catch (err) {
        dispatch({ type: TASK_ERROR, payload: err.message });
    }
    dispatch({ type: LOADING, payload: false });
}

export const updateTaskAction = (id, data) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    try {
        const res = await updateTask(id, data);
        dispatch({ type: TASK_UPDATED, payload: res });
    } catch (err) {
        dispatch({ type: TASK_ERROR, payload: err.message });
    }
    dispatch({ type: LOADING, payload: false });
}

