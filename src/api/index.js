import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

// const url = 'https://mern-stack122.herokuapp.com/posts';

//Here are declared the API Requests for each operation.
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost); 
export const updatePost = (id, postBody) => API.patch(`/posts/${id}`, postBody);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);