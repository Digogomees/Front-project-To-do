import React, { useEffect, useState } from 'react'
import ListUser from '../../components/list_user_box/boxlist.js';
import api from '../../services/api.js';
import './style.css'

export default function User() {


    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get('users')
            .then(response => {
                setUsers(response.data)
            })
    }, [])
    

    return (
        <div className="container">
            <div className="title">
                <h2>Bem - Vindos | To Do - List</h2>
            </div>

           <div className="content_list">
               <div className="roll">
                {users.map((user)=>{
                        return(
                            <ListUser key={user.id} username={user.name} description={user.email} action={`todo/${user.id}`}/>
                        )
                    })}
               </div>
           </div>
        </div>
    )
}