import React from 'react'

const LoginForm = ({
    handleLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    }) =>{
    return(
      <div>
       
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type = 'text'
              value={username}
              name="Username"
              onChange={handleUsernameChange}
              />
          </div>
          <div>
            password
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={ handlePasswordChange}
              />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }
export default LoginForm