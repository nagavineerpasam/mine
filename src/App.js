import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import {db} from './firebase/firebaseconfig'
import firebase from 'firebase';
import {TodoList} from './containers/Todo';

function App() {

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    getTodos()
  },[])

  const getTodos = () =>{
    db.collection('mine').onSnapshot((querySnapShot)=>{
      setTodos(
        querySnapShot.docs.map((doc)=>({
          id : doc.id,
          todo : doc.data().todo,
          inprogress : doc.data().inprogress,
          date : doc.data().date
        }))
      )
     })
  }

  const addTodo = (e)=>{
    e.preventDefault();
    db.collection('mine').add({
      inprogress : true,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      todo : todoInput,
      date : new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
    });
    setTodoInput("");
  }

  return (
    <div className="App">
      <h1 className='title'>My Content</h1>
      <form>
        <TextField 
         id="outlined-basic" 
         label="Add here" 
         variant="outlined"
         value={todoInput} 
         onChange = {(e)=>setTodoInput(e.target.value)}
        />
        <Button type="submit" style={{display:'none'}}
         onClick={addTodo} variant="contained" color="primary">
         ADD
        </Button>
      </form>
      {todos.length ? <TodoList todos={todos} /> : <h1>No items...</h1>} 
    </div>
  );
}

export default App;
