import { Inter } from '@next/font/google'
import {Container, Box, Heading, List} from '@chakra-ui/react';
import Header from './components/Header';
import Todo from './components/Todo'


const inter = Inter({ subsets: ['latin'] })

// async function getData() {
//   const res = await fetch(process.env.BASE_URL+"/todos");
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res.json();
// }

export default async function Home() {
  // const todos = await getData();
  
  return (
    <>
      <Header/>
      <Todo/>
    </>
  )
}
