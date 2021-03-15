import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification.js'
import Togglable from './components/Toggleable.js';
import LoginForm from './components/LoginForm.js';
import PostBlog from './components/PostBlog.js'
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotificationMessage] = useState(null);
  const [error, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  //remove after refactoring
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggeduserJson = window.localStorage.getItem('loggedBlogappuser');
    if(loggeduserJson){
      const user = JSON.parse(loggeduserJson);
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) =>{
    event.preventDefault();
    try{

      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappuser', JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');

    }catch(exception){
      setErrorMessage("Invalid username or password");
      setTimeout(()=>{
        setErrorMessage(null
        );
      }, 5000);
    }
  }

  const addBlog =async (BlogObject) =>{
    try{
      console.log(BlogObject)
      const postBlog = await blogService.postBlog({
        BlogObject
      });
      console.log('postblog object', postBlog);
      setNotificationMessage(`${postBlog.title} by ${postBlog.author} has been created`)
      const allblogs = await blogService.getAll();
      setBlogs(allblogs);
      setTimeout(()=>{
        setNotificationMessage(null
        );
      }, 5000);
      
      
  }catch(exception){
    setErrorMessage("Invalid request");
    setTimeout(
        ()=>{setErrorMessage(null);}
        , 5000);
  }}
  
  const loginForm = () =>{
    return(
      <div>
         <h2>log in to application</h2>
        <Togglable buttonLabel=  'login'>
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({target})=>setUsername(target.value)}
            password={password}
            handlePasswordChange={({target})=>setPassword(target.value)}
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () =>{
    return(
      <div>
        <div>
        <h1> Blogs</h1>
        <h2>logged in as: {user.name}</h2>
        <button onClick={(e)=>{
          e.preventDefault();
          window.localStorage.removeItem('loggedBlogappuser'); 
          setUser(null);}}
        >logout</button>
        </div>
        <br></br>
          
        <div> 
          <Togglable buttonLabel='create new blog'>
            <PostBlog 
              createBlog={addBlog}
            />
          </Togglable>
        </div>
      </div>
    )
  }



  return (
    <div>
      <h2><Notification type='Notification' message={notification}/></h2>
      <h2><Notification type='Error' message={error}/></h2>
      <div>
        {user === null?loginForm():blogForm()}
      </div>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App