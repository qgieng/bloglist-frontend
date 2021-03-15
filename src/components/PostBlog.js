import React ,{useState} from 'react';

const PostBlog = ({
    createBlog})=>{
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [url, setUrl] = useState('');

        const handlePostBlog =  (event)=>{
          event.preventDefault();
          createBlog({title, author, url});
          setTitle('');
          setAuthor('');
          setUrl('');
        }

        return(
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
                   onChange={({target})=>{setUrl(target.value)}}
                />
              </div>
              <button>create</button>
            </form>
          </div>
        )

}

export default PostBlog