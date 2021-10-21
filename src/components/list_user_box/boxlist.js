import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function ListUser({username,description,action}){
    return(
        <Fragment>
            <div className="box_list">
                <div className="meta_title">
                    <h3>{username}</h3>
                    <span>{description}</span>
                </div>
                <div className="btn_user">
                    <Link to={action}>ver task</Link>
                </div>
            </div>
        </Fragment>
    )
}