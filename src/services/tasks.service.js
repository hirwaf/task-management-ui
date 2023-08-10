import {httpClient} from "../utils/http";
import {TokenHeader} from "../helpers/users";

export const browseTasks = async (params) => {
    try {
        const {data, status,} = await httpClient.get('/tasks', {
            params: params,
            headers: {...TokenHeader},
        });
        if (status === 200) {
            return data;
        }
    } catch (e) {
        console.error(e);
    }
    return []
}

export const getTask = async (id) => {
    try {
        const {data, status,} = await httpClient.get(`/tasks/${id}`, {
            headers: {...TokenHeader},
        });
        if (status === 200) {
            return data;
        }
    } catch (e) {
        console.error(e);
    }
    return {}
}

export const updateTask = async (id, task) => {
    try {
        const {data, status,} = await httpClient.patch(`/tasks/${id}`, task, {
            headers: {...TokenHeader},
        });
        if (status === 200) {
            return data;
        }
    } catch (e) {
        console.error(e);
    }
    return {}
}

export const createTask = async (task) => {
    try {
        const token = localStorage.getItem("accessToken");
        const {data, status,} = await httpClient.post('/tasks', task, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        if (status === 200 || status === 201) {
            return data;
        }
    } catch (e) {
        console.error(e);
        throw new Error(e.message);
    }
}

export const deleteTask = async (id) => {
    try {
        const {data, status,} = await httpClient.delete(`/tasks/${id}`, {
            headers: {...TokenHeader},
        });
        if (status === 200) {
            return data;
        }
    } catch (e) {
        console.error(e);
    }
    return {}
}

export const projects = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const res = await httpClient.get('/tasks/projects/list', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
    return [];
}

