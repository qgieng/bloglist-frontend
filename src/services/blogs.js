import axios from 'axios'
const baseUrl = '/api/blogs'

let token  = null

const setToken = newToken =>{
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const postBlog = async (bodydata) =>{
  const config = {
    headers: {Authorization: token},
  };
  console.log('body data', bodydata);
  const response =await  axios.post(baseUrl, bodydata, config);
  return response.data;
}

export default { getAll , postBlog, setToken}