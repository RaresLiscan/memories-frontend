import axios from 'axios';
const url = 'https://mern-stack122.herokuapp.com/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost); 
export const updatePost = (id, postBody) => axios.patch(`${url}/${id}`, postBody);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);