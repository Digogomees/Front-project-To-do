import React, { Children } from 'react'
import './style.css'

export default function InputUpdate({children}) {
    return (
        <div className="updt_task">
            {children}
        </div>
    )
}