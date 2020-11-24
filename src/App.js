import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification'
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

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
      setErrorMessage(exception.error);
      setTimeout(()=>{
        setErrorMessage(null
        );
      }, 5000);
    }
  }

  const handlePostBlog = async event =>{
    event.preventDefault();
    try{
        const blogpost = await blogService.postBlog({
          title, author,url 
        });
        setAuthor('');
        setTitle('');
        setUrl('');
    }catch(exception){
      setErrorMessage(exception.error);
      setTimeout(()=>{
        setErrorMessage(null
        );
      }, 5000);
    }
  }
  const loginForm = () =>{
    return(
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type = 'text'
              value={username}
              name="Username"
              onChange={({target})=>setUsername(target.value)}
              />
          </div>
          <div>
            password
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={ ({target}) =>{
                setPassword(target.value)}}
              />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }



  const blogForm = () =>{
    return(<div>
      <h1> Blogs</h1>
      <h2>logged in as: {user.name}</h2>
      <button onClick={(e)=>{
        e.preventDefault();
        window.localStorage.removeItem('loggedBlogappuser'); 
        setUser(null);}}
      >logout</button>
      {postBlog()}
    </div>)
  }

  const postBlog = () =>{
    return (
      <div>
        <form onSubmit={handlePostBlog}>
          <div>
            title:
            <input
              type = 'text'
              value={title}
              name="title"
              onChange={({target})=>setTitle(target.value)}
              />
          </div>
          <div>
            author:
            <input
              type = 'text'
              value={author}
              name='author'
              onChange={({target})=>setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
               type = 'text'
               value={url}
               name='url'
               onChange={({target})=>setUrl(target.value)}
            />
          </div>
          <button>submit</button>
        </form>
      </div>
    )

  }

  return (
    
     
    <div>

      <h2><Notification message={error}/></h2>

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