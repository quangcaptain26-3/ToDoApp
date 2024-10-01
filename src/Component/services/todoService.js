import api from "./axiosClient";

const ENDPOINT = "todoList/";

const todoService = {
  getAll() {
    return api.get(ENDPOINT);
  },
  create(data) {
    return api.post(ENDPOINT, data);
  },
  update(id, data) {
    return api.put(ENDPOINT + id, data);
  },
  delete(id) {
    return api.delete(ENDPOINT + id);
  },
};

export default todoService;
