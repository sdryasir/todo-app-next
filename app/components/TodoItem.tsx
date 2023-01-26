"use client"
import {ListItem, Text, ListIcon, Flex, Spacer} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import BeatLoader from "react-spinners/BeatLoader";

function TodoItem({todo}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const refreshData = () => {
        router.replace('/');
      }
    const notify = (msg) => toast(msg);
    const [isComplete, setIsComplete] = useState(false)
    const handleComplete = ()=>{
        setIsComplete(!isComplete)
    }
    const handleDelete = async (id)=>{
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {method: 'DELETE'})
        setIsLoading(false)
        notify('Todo has been deleted');
      } catch (error) {
        setIsLoading(false)
        notify(error.message)
      }
      refreshData();
    }
  return (
    <ListItem bg="todo.700" p='12px' borderRadius='8px' color='#fff'>
        <Flex align='center'>
            <Text textDecoration={isComplete ? '':'line-through'}>{todo.title}</Text>
            <Spacer/>
            <ListIcon color='#fff' as={FiEdit} />
            {isLoading ? <BeatLoader size={8} color="#36d7b7" /> : <ListIcon color='#fff' onClick={()=>handleDelete(todo.id)} as={FiTrash2} />}
            <ListIcon color='#fff' onClick={handleComplete} as={isComplete ? FiEye : FiEyeOff} />
        </Flex>
    </ListItem>
  )
}

export default TodoItem