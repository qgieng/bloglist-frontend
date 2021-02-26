import React from 'react';

const PostBlog = ({
    handlePostBlog,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange})=>{
        return(
            <div>
            <form onSubmit={handlePostBlog}>
              <div>
                title:
                <input
                  type = 'text'
                  value={title}
                  name="title"
                  onChange={handleTitleChange}
                  />
              </div>
              <div>
                author:
                <input
                  type = 'text'
                  value={author}
                  name='author'
                  onChange={handleAuthorChange}
                />
              </div>
              <div>
                url:
                <input
                   type = 'text'
                   value={url}
                   name='url'
                   onChange={handleUrlChange}
                />
              </div>
              <button>create</button>
            </form>
          </div>
        )

}

export default PostBlog