import prisma from '.'

export async function getAllTodos(){
    try {
        const todos = await prisma.todo.findMany() 
        return {todos}
    } catch (error:any) {
        return error
    }
}
export async function getTodoById(id:string){
    try {
        const todo = await prisma.todo.findUnique({
            where: {
              id: id,
            },
          }) 
        return {todo}
    } catch (error:any) {
        return error
    }
}

export async function createTodo (todo:any){
    try {
        const newTodo = await prisma.todo.create({data:todo}) 
        return {todo: newTodo}
    } catch (error:any) {
        return error
    }
}
export async function deleteTodo(id:string){
    try {
        const deleteTodo  = await prisma.todo.delete({
            where: {
                id: id,
              }
        }) 
        return {todo: deleteTodo}
    } catch (error:any) {
        return error
    }
}