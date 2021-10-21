import React, { Fragment, useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import InputUpdate from '../../components/input_task_new'

export default function Todo(props) {

    const initialState = {
        task: "",
      };

    const clearTodo = () => {
        setNewtodo({ ...initialState });
    };

    const onChange = e => {
        const { name, value } = e.target;
        setNewtodo(prevState => ({ ...prevState, [name]: value }));
      };

    const [{task}, setNewtodo] = useState(initialState)

    let [user, setUser] = useState([])
    // const [newtodo, setNewtodo] = useState('')
    const [clickUpdate, setClickUpdate] = useState('')
    const [updateValue, setUpdateValue] = useState('')


    useEffect(() => {
        api.get(`user/${props.match.params.id}/todos`)
            .then(response => {
                setUser(response.data)
                console.log(response.data)
            })
    }, [])

    const dateObj = new Date()
    const monthName = dateObj.toLocaleString("default", { month: "long" })
    const dayDate = dateObj.toLocaleString('pt-br', { weekday: 'long' })
    const numberDate = dateObj.getDate()

    async function removerTodo(id) {
        try {
            await api.delete(`todos/${id}`)
            setUser(user.filter(todo => todo.id != id))
        } catch {
            alert('não foi possível deletar a task, tente novamente!')
        }
    }

    function checkTodo(id) {
        const updatedTodos = user.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setUser(updatedTodos);
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const dados = {
            id: Math.floor(Math.random() * 10000),
            userId: props.match.params.id,
            title: task,
            completed: ''
        }

        console.log(dados)

        const response = await api.post('todos/', dados)
            .then(response => {
                if (response.status === 201) {
                    console.log('sua task foi criada!')
                }
            })

        const newTodos = [dados, ...user];
        setUser(newTodos);
        clearTodo(initialState)

    }

    async function Update(id) {

        const dados = {
            title: updateValue
        }

        console.log(dados)

        const response = await api.patch(`todos/${id}`, dados)
            .then(response => {
                setUser(user.map(item => (item.id === response.data.id ? { ...response.data } : item)));
            })
        setClickUpdate('')
    }

    function changeClick(value) {
        setClickUpdate(value)
        console.log(value)
    }


    return (

        <Fragment>
            <div className="container top">
                <div className="title_task">
                    <div>
                        <h2>{dayDate}, {numberDate}</h2>
                        <p>{monthName}</p>
                    </div>
                    <span><strong>{user.length}</strong> task</span>
                </div>

                <div className="content_list">

                    <form onSubmit={handleSubmit}>
                        <div className="add_task">
                            <input value={task} name="task" onChange={onChange} type="text" placeholder="Adicione uma nova task" />
                            <button>+</button>
                        </div>
                    </form>

                    <div className="roll task_list">
                        {user.map(todo => {
                            return (
                                <div key={todo.id} className={!todo.completed ? "box_list" : "box_list check"}>
                                    <div className="meta_title task">
                                        {todo.completed ? <i class='bx bxs-check-circle'></i> : <i onClick={() => checkTodo(todo.id)} class='bx bx-circle'></i>}
                                        {clickUpdate !== todo.id ? <h3 onClick={() => changeClick(todo.id)}>{todo.title}</h3> :
                                            <InputUpdate>
                                                <input onChange={(e) => setUpdateValue(e.target.value)} type="text" placeholder="Adicione uma nova task" />
                                                <button onClick={() => Update(todo.id)}>Atualizar</button>
                                            </InputUpdate>}
                                    </div>
                                    <div className="remove_btn">
                                        <button onClick={() => removerTodo(todo.id)}><i class='bx bxs-trash'></i></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="backtohome">
                    <Link to="/">
                        <i class='bx bx-left-arrow-alt'></i>
                        <span>Voltar para a Home </span>
                    </Link>
                </div>

            </div>
        </Fragment>
    )
}