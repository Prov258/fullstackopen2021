import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(error => {
          alert("Something went wrong.", error);
        });
}

const create = (newObject) => {
    return axios
        .post(baseUrl, newObject)
        .then(response => response.data)
        .catch(error => {
            alert("Something went wrong.", error);
        });
}

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, newObject) => {
    return axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
        .catch(error => {
            alert("Something went wrong.", error);
        });
}

// eslint-disable-next-line
export default { getAll, create, remove, update }