import prisma from '.'

export async function getAllTodos(){
    try {
        const todos = await prisma.todo.findMany() 
        return {todos}
    } catch (error) {
        return error
    }
}
export async function getTodoById(id){
    try {
        const todo = await prisma.todo.findUnique({
            where: {
              id: id,
            },
          }) 
        return {todo}
    } catch (error) {
        return error
    }
}

export async function createTodo (todo){
    try {
        const newTodo = await prisma.todo.create({data:todo}) 
        return {todo: newTodo}
    } catch (error) {
        return error
    }
}
export async function deleteTodo(id){
    try {
        const deleteTodo  = await prisma.todo.delete({
            where: {
                id: id,
              }
        }) 
        return {todo: deleteTodo}
    } catch (error) {
        return error
    }
}