import { useState , useEffect } from 'react'
import AddPost from "./components/Posts/AddPost"
import  { addTodo, getTodos, updateTodo, deleteTodo } from './api/todo'
import {v4 as uuid4} from "uuid"

import './App.css'
import { Post } from './components/Posts/Post'
import { getNormilizedPosts } from './utils/notmilize-post'

function App() {
  const [todosIds, setTodosIds] = useState(null)
  const [todosById, setTodosById] = useState({})
  const [isTodosLoading, setTodosLoading] = useState(false)
  const [isError , setError] = useState(false)
  const [isErrorTitle , setErrorTitle] = useState(false)
  const [isErrorBody , setErrorBody] = useState(false)
  const [isErrorBodyL , setErrorBodyL] = useState(false)
  const [postTitle , setPostTitle] = useState("")
  const [postBody , setPostBody] = useState("")

  useEffect(() => {
    setError(false)
    setErrorTitle(false)
    setErrorBody(false)
    setTodosLoading(true)

    getTodos()
      .then(todos => {
        const [ids , byIds] = getNormilizedPosts(todos)


        setTodosLoading(false)
        setTodosIds(ids)
        setTodosById(byIds)
      })
    
      .catch(() => {
        setError(true)
        setTodosLoading(false)
      });
    
  },[])
  function onAddPost () {
        const id = uuid4();
        const todo = {
          id,
          title: postTitle,
          body: postBody
        }
        if (todo.title.length >= 100 ) {
          setError(true)
          return
        }
        if (todo.title.length <= 4) {
          return setErrorTitle(true)
        }
        if (todo.body.length >= 200) {
          return setErrorBody(true)
        }
        if (todo.body.length <= 10) {
          return setErrorBodyL(true)
        }
        setTodosById({
          ...todosById,
          [todo.id]: todo
        })
        setTodosIds([todo.id, ...todosIds])
    

        addTodo(todo)
  }
  function onToggleTitle (e) {

    setPostTitle(e.target.value)
  }
  function onToggleBody (e) {
    setPostBody(e.target.value)
  }
  return (
    <main className='main'>
      <div>
        <AddPost 
        title={"Новый пост"}
        onAddPost={onAddPost}
        onToggleTitle={onToggleTitle}
        onToggleBody={onToggleBody}
      />
      <p>{isError && "Заголовок больше 100 символов"}</p>
      <p>{isErrorTitle && "Заголовок меньше 4 символов"}</p>
      <p>{isErrorBody && "Пост больше 200 символов"}</p>
      <p>{isErrorBodyL && "Пост меньше 10 символов"}</p>
      </div>
      <div>
        <h2>Лента</h2>
        <p className='isPostLoading'>{isTodosLoading && "Загрузка"}</p>
        { todosIds &&todosIds.map(id => (
          <Post
          key={id}
          post={todosById[id]}
          />
        ))}
      </div>

    </main>
  )
}

export default App
