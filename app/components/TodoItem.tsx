"use client"
import {ListItem, Text, ListIcon, Flex, Spacer} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import BeatLoader from "react-spinners/BeatLoader";
import Link from 'next/link';

function TodoItem({todo, getAllTodos}:any) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const refreshData = () => {
        router.replace('/');
      }
    const notify = (msg:string) => toast(msg);
    const [isComplete, setIsComplete] = useState(false)
    const handleComplete = ()=>{
        setIsComplete(!isComplete)
    }
    const handleDelete = async (id:string)=>{
      try {
        setIsLoading(true);
        const res = await fetch(`/api/todos/${id}`, {method: 'DELETE'})
        getAllTodos();
        notify('Todo has been deleted');
        setIsLoading(false)
        
      } catch (error:any) {
        setIsLoading(false)
        notify(error.message)
      }
      refreshData();
    }

    const handleEdit = async (id:string)=>{
      const resonse = await fetch(`/api/todos/${id}`)
      return resonse.json();
    }

    
  return (
    <ListItem bg="todo.700" p='12px' borderRadius='8px' color='#fff'>
        <Flex align='center'>
            <Text>{todo.title}</Text>
            {/* <Text textDecoration={isComplete ? '':'line-through'}>{todo.title}</Text> */}
            <Spacer/>
            {/* <Link href={`/edit/${todo.id}`}><ListIcon color='#fff' as={FiEdit} /></Link>  */}
            {isLoading ? <BeatLoader size={8} color="#36d7b7" /> : <ListIcon color='#fff' onClick={()=>handleDelete(todo.id)} as={FiTrash2} />}
            {/* <ListIcon color='#fff' onClick={handleComplete} as={isComplete ? FiEye : FiEyeOff} /> */}
        </Flex>
    </ListItem>
  )
}

export default TodoItem