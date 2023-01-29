"use client"
import {Container, Box, Heading, List, Button} from '@chakra-ui/react';
import {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { FiPlusSquare } from "react-icons/fi";

export interface Todo{
  id:string,
  title:string,
  description:string,
  status:boolean
}

function Todo() {


  const [todos, setTodos] = useState([])
  async function getData() {
    await fetch("/api/todos").then(res=>res.json()).then(data=>setTodos(data.todos))
  }
  useEffect(()=>{
    getData();    
  },[])
  
  const [showForm, setShowForm] = useState(false)
  return (
    <Box>
      <Container as='div' maxW='1280px'>
        {!showForm ? <Button colorScheme='teal' onClick={()=>setShowForm(true)} mt={6}>Add Todo</Button> : null}
        {showForm ? <TodoForm/> : null}
        {
            todos && todos.length === 0 ? <h1>No todo Found...</h1>:
            <List spacing={2} my='12px'>
            {
                todos && todos.map((todo:Todo, idx:number)=><TodoItem key={idx} todo={todo}/>)
            }    
        </List>
        }
        
      </Container>
    </Box>
  )
}

export default Todo