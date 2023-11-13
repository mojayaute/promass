import http from "../http_common";

const save = (data) => {
  return http.post(`blog/save`, data);
};

const getAll = () => {
  return http.get("/blog");
};

const get = (id) => {
  return http.get(`/blog/${id}`);
};

export default {
  save,
  getAll,
  get,
};
