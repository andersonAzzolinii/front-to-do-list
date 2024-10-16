import api from '../api';

export const getTasksPerIdUser = async (offset: number, limit: number, id_user: string): Promise<any> => {
  try {
    return (await api()).get(`/activities`, { params: { offset, limit, id_user } });
  } catch (error: any) {
    return error.response
  }
};

export const createTask = async (title: string, id_user: string): Promise<any> => {
  try {
    const body = { title, id_user }
    return (await api()).post(`/activity`, body);
  } catch (error: any) {
    return error.response
  }
};

export const updateTask = async (id: string, completed: boolean, title: string): Promise<any> => {
  try {
    const body = { id, completed, title }
    return (await api()).put(`/activity`, body);
  } catch (error: any) {
    return error.response
  }
};

export const deleteTask = async (id: string,): Promise<any> => {
  try {
    return (await api()).delete(`/activity/${id}`);
  } catch (error: any) {
    return error.response
  }
};
