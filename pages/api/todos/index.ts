// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {createTodo, getAllTodos} from '../../../config/prisma/todos'
type Todo = {
  id:any
  title: string,
  description:string,
  status:boolean,
  createdAt:any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method === 'POST'){
    try {
      const data = req.body;      
      const todo = await createTodo(data)
      return res.status(200).json(todo)
    } catch (error:any) {
      return res.status(500).json({"error": error.message})
    }
    
  }
  if(req.method === 'GET'){
    try {
      const todos = await getAllTodos()
      return res.status(200).json(todos)
    } catch (error:any) {
      return res.status(500).json({"error": error.message})
    }
  }
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(425).end(`Method ${req.method} is not allowed`)
}
