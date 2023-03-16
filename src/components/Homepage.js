import React, { useEffect, useState } from 'react'
import { Button, Container, Typography, TextField, CardContent, Card, CardActions } from '@mui/material'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { set, ref, onValue, remove } from 'firebase/database'

export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if(data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }  
        });
      } else if (!user) {
        navigate("/cs378-p4")
      }
    }); 
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/cs378-p4")
    }).catch((err) => {
      alert(err.message);
    })
  }

  const handleWrite = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    })

    setTodo("")
  }

  const handleDone = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  }
  
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography variant="h4" sx={{ marginBottom: '16px' }}>To-Do List</Typography>
        <TextField id="filled-basic" label="Add a todo" variant="filled" sx={{ marginBottom: '16px' }} onChange={(e) => setTodo(e.target.value)} value={todo} />
        <Button variant="contained" onClick={handleWrite} sx={{ marginBottom: '16px' }}>Add Todo</Button>
        {
          todos.map((todo) => {
            return(
              <div>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body">{todo.todo}</Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleDone(todo.uidd)} sx={{ marginBottom: '16px' }}>Done</Button>
                </CardActions>
              </Card>
              </div>
            )
          })
        }
        <Button variant="contained" onClick={handleSignOut} sx={{ marginBottom: '16px' }}>Sign Out</Button>
      </div>
    </Container>
  )
}
