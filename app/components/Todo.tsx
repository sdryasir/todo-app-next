"use client"
import {Container, Box, Heading, List} from '@chakra-ui/react';
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
function Todo({todos}) {


  return (
    <Box>
      <Container as='div' maxW='1280px'>
        <TodoForm/>
        {
            todos && todos.todos.length === 0 ? <h1>No todo Found...</h1>:
            <List spacing={2} my='12px'>
            {
                todos && todos.todos.map((todo, idx)=><TodoItem key={idx} todo={todo}/>)
            }    
        </List>
        }
        
      </Container>
    </Box>
  )
}

export default Todo