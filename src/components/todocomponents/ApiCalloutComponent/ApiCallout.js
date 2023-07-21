// Contain logic for api callouts
import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
})

export const callHelloWorldRestApi = () =>  apiClient.get("hello-world")

export const listAllTodosForAGivenUsername = (username) => apiClient.get(`/todo-all/${username}`)