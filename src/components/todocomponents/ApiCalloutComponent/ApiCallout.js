import { apiClient } from "./ApiClient";

export const callHelloWorldRestApi = () =>  apiClient.get("hello-world")
// /users/{username}/todos
export const listAllTodosForAGivenUsername = (username) => apiClient.get(`/users/${username}/todos`)

export const deleteTodoGivenId = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`);

export const getTodoByGivenId = (username, id) => apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoByGivenId = (username, id, body) => apiClient.put(`/users/${username}/todos/${id}`, body)

export const createTodo = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)


// basic Authentication token
export const executeBasicAuthenticationService = (token) => apiClient.get(`/authenticate`, {
    headers: {
        Authorization: token,
    }
})