import React, { useEffect } from 'react'
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        navigate('/todo')
      }
    })
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/todo')
    }).catch((err) => alert(err.message));
  }

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography variant="h4" sx={{ marginBottom: '16px' }}>Login</Typography>
        <TextField id="filled-basic" label="Email" variant="filled" sx={{ marginBottom: '16px' }} onChange={handleEmailChange} value={email}/>
        <TextField id="filled-basic" label="Password" variant="filled" sx={{ marginBottom: '16px' }} type="password" onChange={handlePasswordChange} value={password} />
        <Button variant="contained" onClick={handleSignIn} sx={{ marginBottom: '16px' }}>Login</Button>
      </div>
    </Container>
  )
}
