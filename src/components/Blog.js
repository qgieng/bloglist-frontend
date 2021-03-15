import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () =>{
    setVisible(!visible);
  }

  const handleLikeClick=()=>{
    console.log(blog)
  }

  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 3
  }
  return (
    <div style = {blogStyle}>
        <div style = {hideWhenVisible}>
            {blog.title}
            <button onClick={toggleVisibility}>view</button>
        </div>

        <div style={showWhenVisible}>
          
            {blog.title}
            <button onClick={toggleVisibility}>hide</button>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              <button onClick={handleLikeClick}> like </button>
            </p>
            <p>{blog.author}</p>
        </div>
    </div>
)
  
  
}

export default Blog
