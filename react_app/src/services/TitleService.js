import http from "../http-common";

const get = (id) => {
    return http.get(`/titles/${id}`);
};

const getAll = () => {
    return http.get("/titles");
};

const create = (data) => {
    return http.post("/titles", data);
};

const update = (id, data) => {
    return http.put(`/titles/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/titles/${id}`);
};

const removeAll = () => {
    return http.delete("/titles");
};

const findByTitle = (title) => {
    return http.get(`/titles?title=${title}`)
};

const TitleService = {
    get,
    getAll,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
};

export default TitleService;