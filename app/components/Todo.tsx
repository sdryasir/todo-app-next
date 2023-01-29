"use client"
import {Container, Box, Heading, List, Button, Alert, AlertIcon} from '@chakra-ui/react';
import {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { FiPlusSquare } from "react-icons/fi";
import {getData} from './utils'
export interface Todo{
  id:string,
  title:string,
  description:string,
  status:boolean
}

function Todo() {


  const [todos, setTodos] = useState([])

  async function getAllTodos(){
    const data = await getData();
    setTodos(data)  
  }
  
  useEffect(()=>{
    getAllTodos();
  },[])
  
  const [showForm, setShowForm] = useState(false)
  return (
    <Box>
      <Container as='div' maxW='1280px'>
      <Box>

      </Box>
        <Box>
          {!showForm ? <Button colorScheme='teal' onClick={()=>setShowForm(true)} mt={6}>Add New</Button> : null}
          {showForm ? <TodoForm getAllTodos={getAllTodos}/> : null}
          {
              todos && todos.length === 0 ? <Alert mt={6} borderRadius={6} status='info'>
                <AlertIcon /> No Todo Found... </Alert>: <List spacing={2} my='12px'>
              {
                  todos && todos.map((todo:Todo, idx:number)=><TodoItem getAllTodos={getAllTodos} key={idx} todo={todo}/>)
              }    
          </List>
          }
        </Box>
        
      </Container>
    </Box>
  )
}

export default Todo