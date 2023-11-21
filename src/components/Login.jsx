import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import '../App.css';
import { post } from '../service';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);


  const login = async () => {
    // // const userName = 'admin';
    // // const pwd = 'admin@123'
    // if(username === 'user' && password === 'user@123' ){
    // //  alert('login successfull')
    //   window.location = '/userlist';
    // }else if(username === 'admin' && password === 'admin@123' ){
    //   window.location = '/adminlist'
    // } else {
    //   alert('login failed');
    // }
    // const resp = await fetch('http://localhost:3030/api/login',{
    //   method:"POST",
    //   body: JSON.stringify({email: username ,password}),
    //   headers: {"Content-Type":"application/json"}
    // })

    const {data, resp} = await post("/login", { email: username, password});

    // if (resp.status === 200) {

    //   sessionStorage.setItem("token", data.token);

    //   window.location = '/adminlist';
    
    // }

    if (resp.status !== 200) {
      setIsError(true);
      return;
    }
    if (data.message === 'adminsuccess') {

      sessionStorage.setItem("token", data.token);

      window.location = '/adminlist';
    }
    else if (data.message === 'usersuccess') {

      sessionStorage.setItem("token", data.token);

      window.location = '/userlist';
    }

  }

  return (
    <div className='mainDiv'>
      <Grid container spacing={2}>
        {/* <Grid className='image1' item xs={8}>
        
        </Grid> */}
        <Grid item xs={12} >
          <div style={{margin:'16%'}} className='App'>
              <Typography variant='h3' color={'purple'}>Employee-App</Typography>
              <br />
              {isError && <Alert style={{width:'32%', margin:'0 auto'}} severity='error'>Invalid credentials</Alert>}
              <br />
              <TextField 
              variant='outlined' 
              label='Username'
               value={username}
               onChange={(e) => { setUsername(e.target.value); setIsError(false); }}>
              </TextField>
              <br/><br/>
              <TextField 
              variant='outlined' 
              label='Password'
               value={password} 
               onChange={(e) => { setPassword(e.target.value); setIsError(false); }}>
              </TextField>
              <br /><br />
              <Button variant='contained' color="secondary" onClick={login}>
                Submit
               </Button>
              <br /><br />
              
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login
