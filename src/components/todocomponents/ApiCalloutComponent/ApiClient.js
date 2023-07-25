// Contain logic for api callouts
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/'
})



// Interception all request logic 
// This is done in the login component
// after generating the basic auth token
