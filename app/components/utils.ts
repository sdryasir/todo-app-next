export async function getData() {
    return await fetch("/api/todos").then(res=>res.json()).then(data=>data.todos)
  }